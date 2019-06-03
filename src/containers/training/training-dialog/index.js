import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';

import Modal from "../../../components/modal";

import {generateTests} from './testGenerator';
import {TestState, VariantState} from './enums';

import Variants from "./variants";

import style from './style.module.scss';


const selectedSectionIds = ['basic'];
const tests = generateTests(selectedSectionIds, 20);
const _mapTestToDisplayData = (test, currentAnswer) => {

    const variants = test.variants.map(variant => {

        let variantState = VariantState.SELECT;
        if (currentAnswer) {
            variantState = VariantState.DISABLED;
            if (variant === currentAnswer.rightAnswer) {
                variantState = VariantState.RIGHT;
            } else if (variant === currentAnswer.selectedVariant) {
                variantState = VariantState.WRONG;
            }
        }

        return {
            value: variant,
            state: variantState
        }
    });

    return {
        ...test,
        variants
    }
};

function TrainingDialog(props) {

    const {onClosed} = props;

    const [answers, setAnswers] = useState([]);
    const [currentTestIndex, setCurrentTestIndex] = useState(0);
    const [currentTestState, setCurrentTestState] = useState(TestState.SELECT);
    const [currentTestDisplayData, setCurrentTestDisplayData] = useState(_mapTestToDisplayData(tests[0]));


    const _moveToNextTest = () => {
        const nextTestIndex = currentTestIndex + 1;

        if (nextTestIndex >= tests.length) {
            alert('Complete');
            return;
        }

        const nextTest = tests[nextTestIndex];
        setCurrentTestIndex(nextTestIndex);
        setCurrentTestState(TestState.SELECT);
        setCurrentTestDisplayData(_mapTestToDisplayData(nextTest));
    };

    const _handleSelectVariant = (selectedVariant) => {

        const test = tests[currentTestIndex];

        const newAnswers = answers.slice();

        const isAnswerRight = test.answer === selectedVariant;

        const answer = {
            isRight: isAnswerRight,
            rightAnswer: test.answer,
            selectedVariant
        };
        newAnswers.push(answer);

        setCurrentTestState(TestState.SHOW_RESULT);
        setCurrentTestDisplayData(_mapTestToDisplayData(test, answer));
        setAnswers(newAnswers);

        if (isAnswerRight) {
            // setTimeout(this._moveToNextTest, 1000);
        }
    };

    const {question, variants} = currentTestDisplayData;

    return (
        <Modal showBackground={false}>
            <ScrollLock>
                <div className={style.background}>
                    <div className={style.dialog}>
                        <button
                            className={style.closeButton}
                            onClick={onClosed}
                        >
                            <i className="ion ion-ios-close"/>
                        </button>
                        <div className={style.mainInfo}>
                            <div
                                className={question.length === 1 ? style.mainSymbol : style.mainSymbolYoon}
                                style={props}
                            >
                                {
                                    question
                                }
                            </div>
                        </div>
                        <div className={style.skipContainer}>
                            <button>I don't know</button>

                        </div>
                        <div className={style.bottomInfo}>
                            <Variants
                                testState={currentTestState}
                                testId={currentTestIndex}
                                items={variants}
                                onSelect={_handleSelectVariant}
                                onMoveToNextTest={_moveToNextTest}
                            />
                            {
                                false &&
                                // currentAnswer &&
                                // !currentAnswer.isRight &&
                                <button
                                    className={style.continueButton}
                                    onClick={_moveToNextTest}
                                >
                                    Continue
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </ScrollLock>
        </Modal>
    );
}

TrainingDialog.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    character: PropTypes.any,
    onClosed: PropTypes.func.isRequired
};

export default TrainingDialog;