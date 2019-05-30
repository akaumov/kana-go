import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

function Variant(props) {
    const {
        isDisabled,
        value,
        state,
        style: containerStyle,
        valueStyle,
        onSelect
    } = props;

    const _handleSelect = (e) => {
        if (isDisabled) {
            return;
        }

        e.stopPropagation();
        onSelect(value);
    };


    return (
        <button
            className={style.variant}
            onClick={_handleSelect}
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

Variant.propTypes = {
    isDisabled: PropTypes.bool,
    value: PropTypes.string,
    state: PropTypes.oneOf(['select', 'disabled', 'right', 'wrong']),
    style: PropTypes.any,
    onSelect: PropTypes.func.isRequired,
};

Variant.defaultProps = {};

export default Variant;