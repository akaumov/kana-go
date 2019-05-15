import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

class Checkbox extends React.Component {
    render() {
        const {isChecked, onToggle} = this.props;
        if (isChecked) {
            return (
                <div
                    className={style.checkboxChecked}
                    onClick={onToggle}
                >
                    <i className="ion ion-ios-checkmark" />
                </div>
            )
        }

        return (
            <div
                className={style.checkbox}
                onClick={onToggle}
            >
                <i className="ion ion-ios-close" />
            </div>
        );
    }
}

Checkbox.propTypes = {};

Checkbox.defaultProps = {};

export default Checkbox;