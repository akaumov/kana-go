import React, {useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Spring, config} from 'react-spring/renderprops';
import {usePrevious} from 'use-hooks';
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

function Variants(props) {
    const {
        testState,
        testId,
        items,
        onSelect,
        onMoveToNextTest
    } = props;

    const mapItemsToRows = (items) => ([
        [
            items[0],
            items[1],
        ],
        [
            items[2],
            items[3],
        ],
    ]);

    const [animationState, setAnimationState] = useState(AnimationState.ENTER);
    const prevItems = usePrevious(items);
    const prevTestState = usePrevious(testState);
    const [rows, setRows] = useState([]);


    useEffect(() => {
        if (prevItems !== items) {
            setAnimationState(AnimationState.SHOW_RESULT);
            setRows(mapItemsToRows(items));
        }

        if (testState !== prevTestState) {
            if (testState === TestState.SELECT) {
                setAnimationState(AnimationState.SHOW_NEW_VARIANTS);
            } else {
                setAnimationState(AnimationState.SHOW_RESULT);
            }
        }

    }, [items]);

    const _handleStopAnimation = () => {
        if (animationState === AnimationState.SHOW_RESULT) {
            setAnimationState(AnimationState.HIDE_OLD_VARIANTS);
        } else if (animationState === AnimationState.HIDE_OLD_VARIANTS) {
            onMoveToNextTest();
        }
    };


    const currentAnimation = AnimationProperties[animationState];

    return (
        <Spring
            from={{opacity: 0}}
            to={currentAnimation}
            config={{
                // ...config.slow,
                ...(currentAnimation.config || {})
            }}
            onRest={_handleStopAnimation}
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

// Variants.propTypes = {
//     // state: PropTypes.oneOf(['enter', 'leave', 'showResult']),
//     items: PropTypes.array.isRequired,
//     onSelect: PropTypes.func.isRequired,
// };
//
// Variants.defaultProps = {};

export default Variants;