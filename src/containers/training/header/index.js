import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {ReactComponent as BackButton } from '../../../assets/icons/_ionicons_svg_ios-arrow-back.svg';
import style from './style.module.scss';

class Header extends React.Component {
    _handleGoToHome = () => {
        this.props.history.push('/');
    };

    render() {
        return (
            <nav className={style.header}>
                <button
                    className={style.backButton}
                    onClick={this._handleGoToHome}
                >
                    <BackButton />
                    <span>Home</span>
                </button>
                <h1 className={style.title}>
                    Practice
                </h1>
            </nav>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string
};

Header.defaultProps = {};

export default withRouter(Header);