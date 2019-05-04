import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

class Item extends React.Component {
    render() {
        const {
            characterType,
            romaji,
            katakana,
            hiragana,
            onClick
        } = this.props;
        let mainSymbol = characterType === 'hiragana' ? hiragana : katakana;
        let secondarySymbol = characterType === 'hiragana' ? katakana : hiragana;

        if (!romaji) {
            return (
                <div className={style.placeholder}/>
            );
        }

        const romajiText = (characterType === 'hiragana') ? romaji.toLowerCase() : romaji.toUpperCase();

        return (
            <div
                className={style.item}
                onClick={onClick}
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