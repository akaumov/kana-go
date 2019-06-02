import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import style from './style.module.scss';

import {ReactComponent as BackButton} from '../../../assets/icons/_ionicons_svg_ios-arrow-back.svg';


const Header = (props) => {
    const {history} = props;

    const _handleGoToHome = () => history.replace('/');

    return (
        <nav className={style.header}>
            <button
                className={style.backButton}
                onClick={_handleGoToHome}
            >
                <BackButton/>
                <span>Home</span>
            </button>
            <h1 className={style.title}>
                Training
            </h1>
        </nav>
    );
};

Header.propTypes = {
    title: PropTypes.string
};

Header.defaultProps = {};

export default withRouter(Header);