import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';

import Row from "./row";
import style from './style.module.scss';

export const SectionStates = {
    ORIGINAL: 0,
    RELEASED: 1,
    FIXED: 2
};

class Table extends React.Component {
    _handleChangeSectionState = (sectionIndex) => ({status: stickyStatus}) => {
        const status = Object.keys(SectionStates).find(key => SectionStates[key] === stickyStatus);
        this.props.onChangeSectionState(sectionIndex, SectionStates[status]);
    };

    render() {
        const {tableData, onClickItem, characterType} = this.props;
        return tableData.map((section, sectionIndex) => {
            const {name: sectionName, items} = section;
            return (
                [
                    <Sticky
                        key={`section_${sectionIndex}`}
                        enabled={true}
                        top={65}
                        onStateChange={this._handleChangeSectionState(sectionIndex)}
                    >
                        <div
                            key={`section_${sectionIndex}_separator`}
                            className={style.sectionSeparator}
                        />
                    </Sticky>,
                    ...items.map((row, index) => (
                        <Row
                            key={`section_${sectionIndex}_${index}`}
                            characterType={characterType}
                            items={row}
                            onClickItem={onClickItem}
                        />
                    ))
                ]
            )
        })
    }
}

Table.propTypes = {
    characterType: PropTypes.oneOf(['hiragana', 'katakana']),
    tableData: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired,
    onChangeSectionState: PropTypes.func.isRequired
};

Table.defaultProps = {};

export default Table;