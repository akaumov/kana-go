import React from 'react';
import PropTypes from 'prop-types';
import Sticky from "react-stickynode";
import CharacterTypeSwitcher from "../character-type-switcher";

import style from './style.module.scss';

class TableHeader extends React.Component {
    render() {
        const DESKTOP_HEADER_HEIGHT = 45;
        const {characterType, onChangeCharacterType} = this.props;
        return (
            <Sticky
                enabled={true}
                top={DESKTOP_HEADER_HEIGHT}
                activeClass={style.stickyTableHeader}
                className={style.tableHeader}
                releasedClass={style.tableHeader}
            >
                <div className={style.container}>
                    <CharacterTypeSwitcher
                        activeTypeId={characterType}
                        onSelect={onChangeCharacterType}
                    />
                </div>
            </Sticky>
        );
    }
}

TableHeader.propTypes = {};

TableHeader.defaultProps = {};

export default TableHeader;