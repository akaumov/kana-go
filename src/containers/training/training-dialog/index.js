import React from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';

import kanaData from '../../../kana_data';
import Modal from "../../../components/modal";

import style from './style.module.scss';

const QuestionsDirection = Object.freeze({
    FROM_ROMAJI: 'FROM_ROMAJI',
    TO_ROMAJI: 'TO_ROMAJI',
    BOTH: 'BOTH'
});

const TestStates = Object.freeze({

});

class TrainingDialog extends React.Component {

    constructor(props) {
        super(props);

        const selectedSectionIds = ['basic'];
        this.state = {
            tests: this._generateTests(selectedSectionIds, 5),
            answers: [],
            currentTestIndex: 0,
            currentTestState: 'select'
        };
    }


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

    _showWrongSelection = (rightVariantId, wrongVariantId) => {
        // alert('Wrong');
        // this._moveToNextTest();
    };

    _showRightSelection = () => {
        // alert('Right');
        // this._moveToNextTest();
    };

    _moveToNextTest = () => {
        const {tests} = this.state;
        const nextQuestionIndex = this.state.currentTestIndex + 1;

        if (nextQuestionIndex >= tests.length) {
            alert('Complete');
            return;
        }

        this.setState({
            currentTestIndex: nextQuestionIndex
        })
    };

    _handleSelectVariant = (selectedVariant) => (e) => {
        e.stopPropagation();

        const {currentTestIndex, tests} = this.state;
        const test = tests[currentTestIndex];

        const newAnswers = this.state.answers.slice();

        const isAnswerRight = test.answer === selectedVariant;

        newAnswers.push({
            isRight: isAnswerRight,
            rightAnswer: test.answer,
            selectedVariant
        });

        this.setState({
            answers: newAnswers,
            currentTestState: 'showResult'
        });

        if (isAnswerRight) {

            setTimeout(this._moveToNextTest, 1000);

        }
    };

    render() {
        const {onClosed} = this.props;
        const {currentTestIndex, currentTestState, tests, answers} = this.state;

        const currentTest = tests[currentTestIndex];
        const question = currentTest.question;
        const currentAnswer = answers[currentTestIndex];

        const variants = currentTest.variants.map(variant => {

            let variantState = 'selection';
            if (currentAnswer) {
                variantState = 'disabled';
                if (variant === currentAnswer.rightAnswer) {
                    variantState = 'right';
                } else if (variant === currentAnswer.selectedVariant) {
                    variantState = 'wrong';
                }
            }

            return {
                value: variant,
                state: variantState
            }

        });

        const items = [
            [
                variants[0],
                variants[1],
            ],
            [
                variants[2],
                variants[3],
            ],
        ];

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
                            <div className={style.variants}>
                                {
                                    items.map((rowItems, rowIndex) => (
                                        <div
                                            key={'row' + rowIndex}
                                            className={style.row}
                                        >
                                            {
                                                rowItems.map(({value, state}, variantIndex) => (
                                                        <button
                                                            key={'variant' + variantIndex}
                                                            className={style.variant}
                                                            onClick={this._handleSelectVariant(value)}
                                                            data-selection-state={state}
                                                        >
                                                            {value}
                                                        </button>
                                                    )
                                                )
                                            }
                                        </div>
                                    ))
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