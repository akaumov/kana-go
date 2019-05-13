import React from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';

import Modal from "../../../components/modal";

import style from './style.module.scss';

class CharacterCard extends React.Component {
    render() {
        const {characterType, character, onClosed} = this.props;
        const {hiragana, katakana, romaji} = character;

        let mainSymbol = characterType === 'hiragana' ? hiragana : katakana;
        let secondarySymbol = characterType === 'hiragana' ? katakana : hiragana;

        const characterTypeText = characterType === 'hiragana' ? 'Hiragana' : 'Katakana';
        const secondaryCharacterTypeText = characterType === 'hiragana' ? 'Katakana' : 'Hiragana';

        return (
            <Modal>
                <ScrollLock>
                    <div className={style.dialog}>
                        <button
                            className={style.closeButton}
                            onClick={onClosed}
                        >
                            <i className="ion ion-ios-close"/>
                        </button>
                        <div className={style.content}>
                            <div className={style.mainInfo}>
                                <div className={mainSymbol.length === 1 ? style.mainSymbol : style.mainSymbolYoon}>
                                    {mainSymbol}
                                </div>
                                <div className={style.romaji}>
                                    {character.romaji}
                                </div>
                                <div className={style.characterType}>
                                    {characterTypeText}
                                </div>
                            </div>
                            <div className={style.bottomInfo}>
                                <div className={style.oneToOne}>
                                    <span>{secondaryCharacterTypeText}</span>
                                    <i className="ion ion-ios-arrow-round-forward"/>
                                    {secondarySymbol}
                                </div>

                                <button className={style.playSoundButton}>
                                    <i className="ion ion-ios-volume-high"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollLock>
            </Modal>
        );
    }
}

CharacterCard.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    character: PropTypes.any,
    onClosed: PropTypes.func.isRequired
};

export default CharacterCard;