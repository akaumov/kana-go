import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';
import { useTransition, useSpring, animated } from 'react-spring';
import { useWindowSize } from 'use-hooks';

import Modal from "../../../components/modal";

import style from './style.module.scss';

const DIALOG_HEIGHT = 480;
const DIALOG_WIDTH = 350;


const _getStartPosition = (windowSize, openedItem) => {
    if (!openedItem) {
        return null;
    }
    const rect = openedItem.getBoundingClientRect();

    return {
        x: rect.left,
        y: rect.top
    }
};

const _getTargetPosition = (windowSize) => {
    return {
        x: windowSize.width/2 - DIALOG_WIDTH/2,
        y: windowSize.height/2 - DIALOG_HEIGHT/2,
    }
};

function CharacterCard(props) {
    const {isOpened, characterType, character, onClosed, openedItem} = props;
    const {hiragana, katakana, romaji} = character;

    // const [startPosition, setStartPosition] = useState(_getStartPosition(openedItem));
    // const [targetPosition, setTargetPosition] = useState(_getTargetPosition(openedItem));


    let mainSymbol = characterType === 'hiragana' ? hiragana : katakana;
    let secondarySymbol = characterType === 'hiragana' ? katakana : hiragana;

    const characterTypeText = characterType === 'hiragana' ? 'Hiragana' : 'Katakana';
    const secondaryCharacterTypeText = characterType === 'hiragana' ? 'Katakana' : 'Hiragana';

    let customStyle = {};
    // if (startPosition) {
        customStyle = {
            position: 'fixed',
            width: 65,
            height: 65,
            // left: startPosition.x,
            // top: startPosition.y,
        }
    // }

    const windowSize = useWindowSize();

        console.log('windowSize', windowSize)

    const transitions = useTransition(isOpened, null, {
        from: {..._getStartPosition(windowSize, openedItem), width: 65, height: 65},
        enter: {..._getTargetPosition(windowSize, openedItem), height: DIALOG_HEIGHT, width: DIALOG_WIDTH},
        leave: {..._getStartPosition(windowSize, openedItem)}
    });

    return (
        <Modal>
            <ScrollLock>
                {
                    transitions.map(({ item, props, key }) => (
                        <animated.div
                            className={style.dialogTransforming}
                            style={{
                                ...customStyle,
                                top: props.y,
                                left: props.x,
                                width: props.width,
                                height: props.height
                            }}
                        >
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
                        </animated.div>
                    ))
                }

            </ScrollLock>
        </Modal>
    );
}

CharacterCard.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    character: PropTypes.any,
    onClosed: PropTypes.func.isRequired
};

export default CharacterCard;