import React from 'react';
import PropTypes from 'prop-types';

import Row from "./row";
import style from './style.module.scss';

class Table extends React.Component {
    render() {
        const {items, onClickItem, characterType} = this.props;
        return (
            <table className={style.table}>
                <tbody>
                {
                    items.map((row, index) => (
                        <Row
                            key={index}
                            characterType={characterType}
                            items={row}
                            onClickItem={onClickItem}
                        />
                    ))
                }
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    items: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired
};

Table.defaultProps = {};

export default Table;