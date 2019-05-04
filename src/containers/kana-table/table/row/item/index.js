import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

class Item extends React.Component {
    render() {
        const {romaji, katakana, hiragana, onClick} = this.props;
        let mainSymbol = hiragana;
        let secondarySymbol = katakana;

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
                        {romaji}
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
    romaji: PropTypes.string,
    katakana: PropTypes.string,
    hiragana: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

Item.defaultProps = {};

export default Item;