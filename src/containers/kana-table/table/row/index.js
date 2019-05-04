import React from 'react';
import PropTypes from 'prop-types';

import Item from "./item";

class Row extends React.Component {
    _handleClickItem = (itemId) => (e) => {
        e.stopPropagation();
        this.props.onClickItem(itemId);
    };

    render() {
        const {items} = this.props;
        return (
            <tr>
                {
                    items.map((item, index) => (
                        <td key={index}>
                            <Item
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
    items: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired
};

Row.defaultProps = {};

export default Row;