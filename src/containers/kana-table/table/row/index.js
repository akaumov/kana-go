import React from 'react';
import PropTypes from 'prop-types';

import Item from "./item";

import style from './style.module.scss';

class Row extends React.Component {
    _handleClickItem = (itemId) => (e) => {
        this.props.onClickItem(itemId);
    };

    render() {
        const {characterType, items, openedCharacterId} = this.props;
        return (
            <div className={style.row}>
                {
                    items.map((item, index) => (
                        <Item
                            key={index}
                            isOpened={item.id === openedCharacterId}
                            characterType={characterType}
                            id={item.id}
                            romaji={item.romaji}
                            katakana={item.katakana}
                            hiragana={item.hiragana}
                            onClick={this._handleClickItem(item.id)}
                        />
                    ))
                }
            </div>
        );
    }
}

Row.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    items: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired,
};

Row.defaultProps = {};

export default Row;