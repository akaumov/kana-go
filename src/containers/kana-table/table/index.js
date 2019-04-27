import React from 'react';
import PropTypes from 'prop-types';

import Row from "./row";
import style from './style.module.scss';

class Table extends React.Component {
    render() {
        const {items} = this.props;
        return (
            <table className={style.table}>
                <tbody>
                {
                    items.map((row, index) => (
                        <Row
                            key={index}
                            items={row}
                        />
                    ))
                }
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {};

Table.defaultProps = {};

export default Table;