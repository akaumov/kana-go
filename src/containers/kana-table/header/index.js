import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

class Header extends React.Component {
    render() {
        const {title} = this.props;

        return (
            <header className={style.header}>
                <h1>{title}</h1>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

Header.defaultProps = {};

export default Header;