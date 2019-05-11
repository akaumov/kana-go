import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';

import Row from "./row";
import style from './style.module.scss';

class Table extends React.Component {
    render() {
        const {tableData, onClickItem, characterType} = this.props;
        return tableData.map((section, sectionIndex) => {
            const {name: sectionName, items} = section;
            return (
                [
                    sectionIndex > 0 &&
                    <div
                        key={`section_${sectionIndex}_separator`}
                        className={style.sectionSeparator}
                    />,
                    <Sticky
                       key={`section_${sectionIndex}`}
                       enabled={true}
                       top={65}
                       activeClass={style.stickySectionHeader}
                       className={style.sectionHeader}
                      releasedClass={style.sectionHeader}
                    >
                       <div className={style.container}>
                           <div
                               className={style.sectionHeaderData}
                           >
                               {sectionName}
                           </div>
                       </div>
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
    onClickItem: PropTypes.func.isRequired
};

Table.defaultProps = {};

export default Table;