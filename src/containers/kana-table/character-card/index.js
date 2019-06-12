import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';
import {useTransition, useSpring, animated, config} from 'react-spring';
import {useWindowSize} from 'use-hooks';

import Modal from "../../../components/modal";

import style from './style.module.scss';
import useAnimation from "./animation";


function CharacterCard(props) {

    const {characterType, character, onClosed} = props;
    const {hiragana, katakana, romaji} = character;

    const [isOpened, setIsOpened] = useState(!!props.isOpened);

    let mainSymbol = characterType === 'hiragana' ? hiragana : katakana;
    let secondarySymbol = characterType === 'hiragana' ? katakana : hiragana;

    const characterTypeText = characterType === 'hiragana' ? 'Hiragana' : 'Katakana';
    const secondaryCharacterTypeText = characterType === 'hiragana' ? 'Katakana' : 'Hiragana';

    const _handleClose = () => setIsOpened(false);

    const customStyle = {
        position: 'fixed',
        transformOrigin: '0 0'
    };

    const [containerTransitions, extraInfoTransitions] = useAnimation(isOpened, character.id, onClosed);

    return containerTransitions.map(({item: isOpened, props, key, state}) => (
            isOpened &&
            (console.log('STATE', {isOpened, props, key, state}) || true) &&
            <Modal
                key={key}
                onClickBackdrop={_handleClose}
                backdropClass={style.defaultBackdrop}
            >
                <animated.div
                    className={style.backdrop}
                    style={{
                        background: props.backdropBackground
                    }}
                >
                    <animated.div
                        className={style.dialogTransforming}
                        style={{
                            ...customStyle,
                            top: props.y,
                            left: props.x,
                            transform: props.transform
                        }}
                    >
                        <button
                            className={style.closeButton}
                            onClick={_handleClose}
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
                            {
                                extraInfoTransitions.map(({item: showExtraInfo, props, key, state}) => (
                                    showExtraInfo &&
                                    (console.log('STATE2', {showExtraInfo, props, key, state}) || true) &&
                                    <animated.div
                                        key={key}
                                        className={style.bottomInfo}
                                        style={props}
                                    >
                                        <div className={style.oneToOne}>
                                            <span>{secondaryCharacterTypeText}</span>
                                            <i className="ion ion-ios-arrow-round-forward"/>
                                            {secondarySymbol}
                                        </div>

                                        <button className={style.playSoundButton}>
                                            <i className="ion ion-ios-volume-high"/>
                                        </button>
                                    </animated.div>
                                ))
                            }
                        </div>
                    </animated.div>
                </animated.div>
            </Modal>
        )
    );
}

CharacterCard.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    character: PropTypes.any,
    onClosed: PropTypes.func.isRequired,
};

export default CharacterCard;