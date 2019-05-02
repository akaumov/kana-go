import React from 'react';

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
            hiragana: symbolData.Seion.Hiragana,
            katakana: symbolData.Seion.Katakana,
            romaji: symbolData.Seion.Romaji
        }
    })
});

class KanaTablePage extends React.Component {

    _handleClickItem = (itemId) => {
        this.props.history.push('/kana-table/' + itemId);
    };

    render() {
        console.log('KANA', kana)
        console.log('KANA', HIRAGANA_TABLE)
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
                    <CharacterCard />
                </div>
            </div>
        );
    }
}

export default KanaTablePage;