import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

class PracticePage extends React.Component {
    render() {
        return (
            <div className={style.practicePage}>
                Practice page
            </div>
        );
    }
}

PracticePage.propTypes = {};

PracticePage.defaultProps = {};

export default PracticePage;