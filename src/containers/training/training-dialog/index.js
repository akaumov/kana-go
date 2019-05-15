import React from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';

import Modal from "../../../components/modal";

import style from './style.module.scss';

class TrainingDialog extends React.Component {
    render() {
        let {characterType, character, onClosed} = this.props;
        characterType = 'hiragana'
        character = {hiragana: 'ka', romaji: 'b', katakana: 'c'}
        const {hiragana, katakana, romaji} = character;

        let mainSymbol = characterType === 'hiragana' ? hiragana : katakana;
        let secondarySymbol = characterType === 'hiragana' ? katakana : hiragana;

        const characterTypeText = characterType === 'hiragana' ? 'Hiragana' : 'Katakana';
        const secondaryCharacterTypeText = characterType === 'hiragana' ? 'Katakana' : 'Hiragana';

        const variants = [[1, 2], [3, 4]];

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
                                    {mainSymbol}
                                </div>
                            </div>
                            <div className={style.variants}>
                                {
                                    variants.map(rowItems => (
                                        <div className={style.row}>
                                            {
                                                rowItems.map(variant => (
                                                    <button className={style.variant}>
                                                        {variant}
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