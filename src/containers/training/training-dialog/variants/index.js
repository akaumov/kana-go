import React from 'react';
import PropTypes from 'prop-types';
import {Spring, config} from 'react-spring/renderprops';
import delay from 'delay';
import {TestState} from '../enums';

import Variant from "./variant";

import style from './style.module.scss';

const AnimationState = Object.freeze({
    ENTER: 'enter',
    LEAVE: 'leave',
    SHOW_RESULT: 'showResult',
    HIDE_OLD_VARIANTS: 'hideOldVariants',
    SHOW_NEW_VARIANTS: 'showNewVariants'
});

const AnimationProperties = Object.freeze({
    [AnimationState.ENTER]: {opacity: 1},
    [AnimationState.LEAVE]: {opacity: 0},
    [AnimationState.SHOW_RESULT]: {opacity: 0, config: {delay: 300}},
    [AnimationState.HIDE_OLD_VARIANTS]: {opacity: 0},
    [AnimationState.SHOW_NEW_VARIANTS]: {opacity: 1},
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


    _handleStopAnimation = () => {
        const {onMoveToNextTest} = this.props;
        const {animationState} = this.state;

        if (animationState === AnimationState.SHOW_RESULT) {
            this.setState({
                animationState: AnimationState.HIDE_OLD_VARIANTS
            })
        } else if (animationState === AnimationState.HIDE_OLD_VARIANTS) {
            onMoveToNextTest();
        }
    };

    render() {
        const {testId, onSelect, onMoveToNextTest} = this.props;
        const {animationState, rows} = this.state;

        const currentAnimation = AnimationProperties[animationState];
        console.log('STATE', {an: currentAnimation, animationState});

        return (
            <Spring
                from={{opacity: 0}}
                to={currentAnimation}
                config={{
                    // ...config.slow,
                    ...(currentAnimation.config || {})
                }}
                onRest={this._handleStopAnimation}
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
            </Spring>
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