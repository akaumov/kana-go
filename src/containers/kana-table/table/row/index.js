import React from 'react';
import PropTypes from 'prop-types';

import Item from "./item";

class Row extends React.Component {
    _handleClickItem = (itemId) => (e) => {
        e.stopPropagation();
        this.props.onClickItem(itemId);
    };

    render() {
        const {characterType, items} = this.props;
        return (
            <tr>
                {
                    items.map((item, index) => (
                        <td key={index}>
                            <Item
                                characterType={characterType}
                                romaji={item.romaji}
                                katakana={item.katakana}
                                hiragana={item.hiragana}
                                onClick={this._handleClickItem(item.id)}
                            />
                        </td>
                    ))
                }
            </tr>
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