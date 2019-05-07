import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

class NotFoundPage extends React.Component {
    render() {
        return (
            <div className={style.notFoundPage}>
                <div className={style.content}>
                    <h1>Page not found.</h1>
                    <h2>Go to <Link to="/">home page</Link></h2>
                </div>
            </div>
        );
    }
}

NotFoundPage.propTypes = {};

NotFoundPage.defaultProps = {};

export default NotFoundPage;