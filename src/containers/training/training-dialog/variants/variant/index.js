import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

class Variant extends React.PureComponent {
    _handleSelect = (e) => {
        const {value, onSelect} = this.props;
        e.stopPropagation();
        onSelect(value);
    };

    render() {
        const {isDisabled, value, state, style: containerStyle, valueStyle} = this.props;
        return (
            <button
                key={'variant' + value}
                className={style.variant}
                onClick={isDisabled ? () => {} : this._handleSelect}
                data-selection-state={state}
                data-disabled={!!isDisabled}
                style={containerStyle}
            >
                <span style={valueStyle}>
                    {value}
                </span>
            </button>

        );
    }
}

Variant.propTypes = {
    isDisabled: PropTypes.bool,
    value: PropTypes.string,
    state: PropTypes.oneOf(['select', 'disabled', 'right', 'wrong']),
    style: PropTypes.any,
    onSelect: PropTypes.func.isRequired,
};

Variant.defaultProps = {};

export default Variant;