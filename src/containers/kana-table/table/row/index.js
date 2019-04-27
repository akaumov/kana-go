import React from 'react';
import PropTypes from 'prop-types';

import Item from "./item";

import style from './style.module.scss';

class Row extends React.Component {
    render() {
        const {items} = this.props;
        return (
            <tr>
                {
                    items.map((item, index) => (
                        <Item
                            key={index}
                            romaji={item.romaji}
                            katakana={item.katakana}
                            hiragana={item.hiragana}
                        />
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