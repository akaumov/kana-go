import React from 'react';
import PropTypes from 'prop-types';
import {Transition, config, Keyframes} from 'react-spring/renderprops';
import delay from 'delay';
import {TestState, VariantState} from '../enums';

import Variant from "./variant";

import style from './style.module.scss';

const AnimationState = Object.freeze({
    ENTER: 'enter',
    LEAVE: 'leave',
    SHOW_RESULT: 'showResult',
    HIDE_OLD_VARIANTS: 'hideOldVariants',
    SHOW_NEW_VARIANTS: 'showNewVariants'
});

const Container = Keyframes.Spring({
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    showResult: async (next, cancel, ownProps) => {
        console.log('SHOW_RESULT', {next, cancel, ownProps});
        console.log('setOpacity', {next, cancel, ownProps, X: this});
        next({opacity: 1});
        console.log('delay', {next, cancel, ownProps});
        await delay(800);
        // await delay(5000);
        console.log('hideOldVariants', {next, cancel, ownProps});
        // await ownProps.hideOldVariants();
        await next({}, true)
    },
    hideOldVariants: async (next, cancel, ownProps) => {
        console.log('HIDE_OLD_VARIANTS', {next, cancel, ownProps});
        await next({opacity: 0});
        // await delay(3000);
        console.log('before showNewVariants', {next, cancel, ownProps});
        // await delay(5000);
        await next({}, true)
    },
    showNewVariants: {opacity: 1},
    onRest: () => alert('CCCCCCCCC')
});

class Variants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animationState: AnimationState.ENTER,
            rows: this._mapItemsToRows(props.items)
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const newState = {};

        if (nextProps.items !== this.props.items) {
            newState.animationState = AnimationState.SHOW_RESULT;
            newState.rows = this._mapItemsToRows(nextProps.items);
        }

        if (nextProps.testState !== this.props.testState) {
            if (nextProps.testState === TestState.SELECT) {
                newState.animationState = AnimationState.SHOW_NEW_VARIANTS;
            } else {
                newState.animationState = AnimationState.SHOW_RESULT;
            }
        }

        if (Object.keys(newState).length > 0) {
            this.setState(newState);
        }
    }

    _mapItemsToRows = (items) => {
        return [
            [
                items[0],
                items[1],
            ],
            [
                items[2],
                items[3],
            ],
        ];

    };


    render() {
        const {testId, onSelect, onMoveToNextTest} = this.props;
        const {animationState, rows} = this.state;

        console.log('STATE', animationState);
        return (
            <Container
                config={{mass: 5, tension: 500, friction: 80}}
                state={animationState}
                // showNewVariants={() => this.setState({animationState: 'showNewVariants'})}
                hideOldVariants={() => this.setState({animationState: AnimationState.HIDE_OLD_VARIANTS})}
                onRest={() => {
                    console.log('ON_RESTs2', this.state.animationState)
                    if (this.state.animationState === AnimationState.HIDE_OLD_VARIANTS) {
                        console.log('ON_RESTs')
                        this.props.onMoveToNextTest();
                    } else if(this.state.animationState === AnimationState.SHOW_RESULT) {
                        this.setState({animationState: AnimationState.HIDE_OLD_VARIANTS})
                    }
                }}
                // onRest={() => alert('CCCCCCCCC')}
            >
                {
                    (props) => (
                        <div
                            className={style.variants}
                        >
                            {
                                rows.map((row, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className={style.row}
                                        data-row={rowIndex}
                                    >
                                        {
                                            row.map(({value, state}, variantIndex) => (
                                                    <Variant
                                                        key={variantIndex}
                                                        isDisabled={animationState === 'hideOldVariants'}
                                                        value={value}
                                                        state={state}
                                                        onSelect={onSelect}
                                                        valueStyle={props}
                                                    />
                                                )
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </Container>
        );
    }
}

Variants.propTypes = {
    // state: PropTypes.oneOf(['enter', 'leave', 'showResult']),
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

Variants.defaultProps = {};

export default Variants;