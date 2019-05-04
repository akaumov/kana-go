import React from 'react';
import {withRouter} from "react-router-dom";

import Header from './header';

import kana from 'japanese-json';

import Table from "./table";
import CharacterCard from "./character-card";

import style from './style.module.scss';

const HIRAGANA_TABLE = ['-', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'].map(firstSymbol => {
    const setOfSymbols = kana[firstSymbol];

    return ['a', 'i', 'u', 'e', 'o'].map(secondSymbol => {

        const symbolData = setOfSymbols[secondSymbol];
        if (!symbolData || !symbolData.Seion) {
            return {}
        }


        return {
            id: symbolData.Seion.Romaji,
            hiragana: symbolData.Seion.Hiragana,
            katakana: symbolData.Seion.Katakana,
            romaji: symbolData.Seion.Romaji,
        }
    })
});

class KanaTablePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openedCharacter: this._getOpenedCharacter(props)
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.match !== this.props.match) {
            this.setState({
                openedCharacter: this._getOpenedCharacter(nextProps)
            });
        }
    }

    _getOpenedCharacter = (props) => {
        const {match} = props;
        const openedCharacterId = match && match.params && match.params.characterId;

        console.log('match', match)
        console.log('openedCharacterId', openedCharacterId)
        if (!openedCharacterId) {
            return null;
        }

        console.log('bbb')

        let openedCharacter;
        HIRAGANA_TABLE.some(row => {
            return row.some(item => {
                if (item => item.id === openedCharacterId) {
                    openedCharacter = item;
                }

                return openedCharacter;
            });

            return openedCharacter;
        });

        return openedCharacter;
    };

    _handleClickItem = (itemId) => {
        this.props.history.push('/kana-table/' + itemId);
    };

    _handleCharacterCardClosed = () => {
        this.props.history.replace('/kana-table');
    };

    render() {
        const {openedCharacter} = this.state;
        return (
            <div className={style.kanaTablePage}>
                <Header
                    title={'Kana table'}
                />
                <div className={style.content}>
                    <ol className={style.tableHeader}>
                        <li>
                            1.Hiragana table
                        </li>
                        <li>
                            2.Katakana table
                        </li>
                    </ol>
                    <Table
                        items={HIRAGANA_TABLE}
                        onClickItem={this._handleClickItem}
                    />
                    {
                        openedCharacter &&
                        <CharacterCard
                            character={openedCharacter}
                            onClosed={this._handleCharacterCardClosed}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(KanaTablePage);