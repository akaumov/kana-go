import React from 'react';
import PropTypes from 'prop-types';

import kanaData from '../../../kana_data';
import Checkbox from "./checkbox";

import style from './style.module.scss';

class KanaSelector extends React.Component {
    constructor(props) {
        super(props);

        const values = {
            hiragana: {},
            katakana: {}
        };

        kanaData.forEach(section => {
            values.hiragana[section.id] = false;
            values.katakana[section.id] = false;
        });

        this.state = {
            values
        };
    }

    _handleToggleItem = (sectionId, characterType) => () => {

        const values = this.state.values;
        const newValues = {
            ...values,
            [characterType]: {
                ...values[characterType],
                [sectionId]: !values[characterType][sectionId]
            }
        };

        this.setState({
            values: newValues
        })
    };

    render() {
        const {values} = this.state;
        return (
            <table className={style.table}>
                <tbody>
                <tr>
                    <td key='corner-placeholder'/>
                    {
                        kanaData.map(({id: sectionId, name: sectionName}) => (
                            <th
                                scope="col"
                                key={sectionId}
                            >
                                {sectionName}
                            </th>
                        ))
                    }
                </tr>
                {
                    ['hiragana', 'katakana'].map(characterType => (
                        <tr key={characterType}>
                            <th scope="row">
                                {characterType === 'hiragana' ? 'Hiragana' : 'Katakana'}
                            </th>
                            {
                                kanaData.map(({id: sectionId}) => (
                                    <td
                                        key={sectionId}
                                    >
                                        <Checkbox
                                            isChecked={values[characterType][sectionId]}
                                            onToggle={this._handleToggleItem(sectionId, characterType)}
                                        />
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        );
    }
}

KanaSelector.propTypes = {};

KanaSelector.defaultProps = {};

export default KanaSelector;