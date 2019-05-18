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

class TrainingDialog extends React.Component {

    constructor(props) {
        super(props);

        const selectedSectionIds = ['basic'];
        this.state = {
            questions: this._generateQuestions(selectedSectionIds, 5),
            answers: [],
            currentQuestionIndex: 0
        };

        // global._getCharactersSet = this._getCharactersSet;
        // global._getRandomCharacter = this._getRandomCharacter;
        // global._getVariants = this._getVariants;
    }


    _generateQuestions = (selectedSectionIds, limit, questionsDirections) => {

        const characters = this._getCharactersSet(selectedSectionIds);
        const questions = [];

        let questionIndex = 0;
        while (questions.length < limit) {
            const randomIndex = Math.round(Math.random() * (characters.length - 1));

            const questionCharacter = characters[randomIndex];
            const isQuestionExist = questions.find(question => question.answerCharacterId === questionCharacter.id);

            if (isQuestionExist) {
                continue;
            }

            const answerCharacterType = 'romaji';
            const variantCharacterType = 'katakana';
            //
            // let variantCharacterType;
            // let questionCharacterType;

            // switch (questionsDirections) {
            //     case QuestionsDirection.BOTH:
            //         questionCharacterType = questionIndex % 2 === 0 ? 'katakana' : 'hiragana';
            //         variantCharacterType = questionCharacterType === 'hiragana' ? 'katakana' : 'hiragana';
            //         break;
            //     case QuestionsDirection.FROM_ROMAJI:
            //         questionCharacterType = questionIndex % 2 === 0 ? 'katakana' : 'hiragana';
            //         variantCharacterType = questionCharacterType === 'hiragana' ? 'katakana' : 'hiragana';
            //         break;
            // }

            const question = {
                answerCharacterType,
                answer: questionCharacter,
                variants: this._getVariants(selectedSectionIds, questionCharacter, variantCharacterType)
            };

            questions.push(question);
            questionIndex++;
        }

        return questions;
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

    _getVariants = (sectionsIds, currentCharacter, variantCharacterType) => {

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
        return randomCharacters.map(character => ({
            id: character.id,
            value: character[variantCharacterType]
        }))
    };


    _getRandomCharacter = (charactersSet) => {
        const randomIndex = Math.round(Math.random() * (charactersSet.length - 1));
        return charactersSet[randomIndex];
    };

    render() {
        let {characterType, character, onClosed} = this.props;
        const {currentQuestionIndex, questions} = this.state;

        characterType = 'hiragana';
        character = {hiragana: 'ka', romaji: 'b', katakana: 'c'}
        const {hiragana, katakana, romaji} = character;

        let mainSymbol = characterType === 'hiragana' ? hiragana : katakana;
        let secondarySymbol = characterType === 'hiragana' ? katakana : hiragana;

        const characterTypeText = characterType === 'hiragana' ? 'Hiragana' : 'Katakana';
        const secondaryCharacterTypeText = characterType === 'hiragana' ? 'Katakana' : 'Hiragana';

        const currentQuestion = questions[currentQuestionIndex];
        const variants = [
            [
                currentQuestion.variants[0],
                currentQuestion.variants[1],
            ],
            [
                currentQuestion.variants[2],
                currentQuestion.variants[3],
            ],
        ];


        return (
            <Modal showBackground={false}>
                <ScrollLock>
                    <div className={style.background}>
                        <button
                            className={style.closeButton}
                            onClick={onClosed}
                        >
                            <i className="ion ion-ios-close"/>
                        </button>
                        <div className={style.dialog}>
                            <div className={style.mainInfo}>
                                <div className={mainSymbol.length === 1 ? style.mainSymbol : style.mainSymbolYoon}>
                                    {
                                        currentQuestion.answer[currentQuestion.answerCharacterType]
                                    }
                                </div>
                            </div>
                            <div className={style.variants}>
                                {
                                    variants.map((rowItems, rowIndex) => (
                                        <div
                                            key={'row' + rowIndex}
                                            className={style.row}
                                        >
                                            {
                                                rowItems.map((variant, variantIndex) => (
                                                    <button
                                                        key={variant.id}
                                                        className={style.variant}
                                                    >
                                                        {variant.value}
                                                    </button>
                                                ))
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