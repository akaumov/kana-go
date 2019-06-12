import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

function Item(props) {
    const {
        isOpened,
        characterType,
        id,
        romaji,
        katakana,
        hiragana,
        onClick
    } = props;

    const handleClick = (e) => {
        e.stopPropagation();
        onClick(e);
    };

    const mainSymbol = characterType === 'hiragana' ? hiragana : katakana;
    const secondarySymbol = characterType === 'hiragana' ? katakana : hiragana;

    if (!romaji) {
        return (
            <div className={style.placeholder}/>
        );
    }

    const romajiText = (characterType === 'hiragana') ? romaji.toLowerCase() : romaji.toUpperCase();

    return (
        <div
            id={`table-item-${id}`}
            className={isOpened ? style.itemOpened : style.item}
            onClick={handleClick}
        >
            <div className={style.mainSymbol}>
                {mainSymbol}
            </div>
            <div className={style.info}>
                <div className={style.romaji}>
                    {romajiText}
                </div>
                <div className={style.secondarySymbol}>
                    {secondarySymbol}
                </div>
            </div>
        </div>
    );
}

Item.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    romaji: PropTypes.string,
    katakana: PropTypes.string,
    hiragana: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

Item.defaultProps = {};

export default Item;