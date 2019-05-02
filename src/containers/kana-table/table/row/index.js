import React from 'react';
import PropTypes from 'prop-types';

import Item from "./item";

class Row extends React.Component {
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
                            />
                        </td>
                    ))
                }
            </tr>
        );
    }
}

Row.propTypes = {
    items: PropTypes.array.isRequired
};

Row.defaultProps = {};

export default Row;