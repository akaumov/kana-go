import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const TYPES = [
    {
        id: 'hiragana',
        label: 'Hiragana'
    },
    {
        id: 'katakana',
        label: 'Katakana'
    },
];

class CharacterTypeSwitcher extends React.Component {
    _handleToggleItem = (itemId) => (e) => {
        this.props.onSelect(itemId);
    };

    render() {
        const {activeTypeId} = this.props;
        return (
            <ul className={style.characterTypeSwitcher}>
                {
                    TYPES.map(item => (
                        <li
                            key={item.id}
                            className={activeTypeId === item.id ? style.activeItem : style.item}
                            onClick={this._handleToggleItem(item.id)}
                        >
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        );
    }
}

CharacterTypeSwitcher.propTypes = {
    activeTypeId: PropTypes.oneOf(['hiragana', 'katakana']),
    onSelect: PropTypes.func.isRequired
};

CharacterTypeSwitcher.defaultProps = {};

export default CharacterTypeSwitcher;