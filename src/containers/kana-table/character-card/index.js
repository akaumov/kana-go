import React from 'react';

import Modal from "../../../components/modal";

import style from './style.module.scss';

import closeIcon from '../../../assets/icons/_ionicons_svg_md-close.svg';
import arrowIcon from '../../../assets/icons/_ionicons_svg_ios-arrow-round-forward.svg';

class CharacterCard extends React.Component {
    render() {
        const {character, onClosed} = this.props;
        const mainSymbol = character.katakana;
        const secondSymbol = character.hiragana;

        return (
            <Modal>
                <div className={style.dialog}>
                    <button
                        className={style.closeButton}
                        onClick={onClosed}
                    >
                        <img src={closeIcon}/>
                    </button>
                    <div className={style.content}>
                        <div className={style.mainSymbol}>
                            {mainSymbol}
                        </div>
                        <div className={style.romaji}>
                            {character.romaji}
                        </div>
                        <div className={style.characterType}>
                            KATAKANA
                        </div>
                        <div className={style.bottomInfo}>
                            <div className={style.oneToOne}>
                                <span>Katakana</span>
                                <i className="ion ion-ios-arrow-round-forward"/>
                                {secondSymbol}
                            </div>

                            <button className={style.playSoundButton}>
                                <i className="ion ion-ios-volume-high"/>
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CharacterCard;