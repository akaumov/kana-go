import React from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';

import kanaData from '../../../kana_data';
import Modal from "../../../components/modal";

import style from './style.module.scss';
import Variants from "./variants";

import {TestState, VariantState} from './enums';

const QuestionsDirection = Object.freeze({
    FROM_ROMAJI: 'FROM_ROMAJI',
    TO_ROMAJI: 'TO_ROMAJI',
    BOTH: 'BOTH'
});


class TrainingDialog extends React.Component {

    constructor(props) {
        super(props);

        const selectedSectionIds = ['basic'];
        const tests = this._generateTests(selectedSectionIds, 20);

        this.state = {
            tests,
            answers: [],
            currentTestIndex: 0,
            currentTestState: TestState.SELECT,
            currentTestDisplayData: this._mapTestToDisplayData(tests[0]),
        };
    }

    _mapTestToDisplayData = (test, currentAnswer) => {

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

    _generateTests = (selectedSectionIds, limit, questionsDirections) => {

        const characters = this._getCharactersSet(selectedSectionIds);
        const tests = [];
        const questionCharacterType = 'romaji';
        const variantCharacterType = 'katakana';

        while (tests.length < limit) {
            const randomIndex = Math.round(Math.random() * (characters.length - 1));

            const questionCharacter = characters[randomIndex];
            const isQuestionExist = tests.find(test => test.question === questionCharacter[questionCharacterType]);

            if (isQuestionExist) {
                continue;
            }

            const test = {
                question: questionCharacter[questionCharacterType],
                answer: questionCharacter[variantCharacterType],
                variants: this._generateVariants(selectedSectionIds, questionCharacter, variantCharacterType)
            };

            tests.push(test);
        }

        return tests;
    };


    _getCharactersSet = (selectedSectionsIds) => {
        const characters = [];

        selectedSectionsIds.forEach(sectionId => {
            const section = kanaData.find(section => section.id === sectionId);
            section.items.forEach(rowItems => {
                rowItems.forEach(character => character.id && characters.push(character));
            });
        });

        return characters;
    };

    _generateVariants = (sectionsIds, currentCharacter, variantCharacterType) => {

        const NUMBER_OF_VARIANTS = 4;

        const randomCharactersSet = this._getCharactersSet(['basic', 'handakuon_dakuon', 'yoon']);
        const randomCharacters = [];

        while (randomCharacters.length < 3) {
            const randomCharacter = this._getRandomCharacter(randomCharactersSet);

            if (randomCharacter.id === currentCharacter.id) {
                continue;
            }

            const isCharacterAlreadyExist = randomCharacters.find(character => character.id === randomCharacter.id);
            if (isCharacterAlreadyExist) {
                continue;
            }

            randomCharacters.push(randomCharacter);
        }

        const randomIndex = Math.round(Math.random() * (NUMBER_OF_VARIANTS - 1));

        randomCharacters.splice(randomIndex, 0, currentCharacter);
        return randomCharacters.map(character => character[variantCharacterType])
    };


    _getRandomCharacter = (charactersSet) => {
        const randomIndex = Math.round(Math.random() * (charactersSet.length - 1));
        return charactersSet[randomIndex];
    };

    _moveToNextTest = () => {
        const {tests} = this.state;
        const nextTestIndex = this.state.currentTestIndex + 1;

        if (nextTestIndex >= tests.length) {
            alert('Complete');
            return;
        }

        const nextTest = tests[nextTestIndex];
        this.setState({
            currentTestState: TestState.SELECT,
            currentTestIndex: nextTestIndex,
            currentTestDisplayData: this._mapTestToDisplayData(nextTest)
        })
    };

    _handleSelectVariant = (selectedVariant) => {

        const {currentTestIndex, tests} = this.state;
        const test = tests[currentTestIndex];

        const newAnswers = this.state.answers.slice();

        const isAnswerRight = test.answer === selectedVariant;

        const answer = {
            isRight: isAnswerRight,
            rightAnswer: test.answer,
            selectedVariant
        };
        newAnswers.push(answer);

        this.setState({
            currentTestState: TestState.SHOW_RESULT,
            answers: newAnswers,
            currentTestDisplayData: this._mapTestToDisplayData(test, answer)
        });

        if (isAnswerRight) {
            // setTimeout(this._moveToNextTest, 1000);
        }
    };

    render() {
        const {onClosed} = this.props;
        const {currentTestState, currentTestDisplayData, currentTestIndex} = this.state;

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
                                <div className={question.length === 1 ? style.mainSymbol : style.mainSymbolYoon}>
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
                                    onSelect={this._handleSelectVariant}
                                    onMoveToNextTest={this._moveToNextTest}
                                />
                                {
                                    true &&
                                    // currentAnswer &&
                                    // !currentAnswer.isRight &&
                                    <button
                                        className={style.continueButton}
                                        onClick={this._moveToNextTest}
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
}

TrainingDialog.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    character: PropTypes.any,
    onClosed: PropTypes.func.isRequired
};

export default TrainingDialog;