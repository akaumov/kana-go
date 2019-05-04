import React from 'react';
import {withRouter} from "react-router-dom";

import kana from 'japanese-json';

import Header from './header';
import Table from "./table";
import CharacterCard from "./character-card";
import CharacterTypeSwitcher from "./character-type-switcher";

import style from './style.module.scss';

const KANA_TABLE = ['-', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'].map(firstSymbol => {
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

    _handleClickItem = (itemId) => {
        const {history, characterType} = this.props;
        history.push(`/kana-table/${characterType}/${itemId}`);
    };

    _handleCharacterCardClosed = () => {
        const {characterType, history} = this.props;
        history.replace(`/kana-table/${characterType}`);
    };

    _handleChangeCharacterType = (characterType) => {
        const {history} = this.props;
        history.replace(`/kana-table/${characterType}`);
    };

    render() {
        const {openedCharacter, characterType} = this.props;
        return (
            <div className={style.kanaTablePage}>
                <Header
                    title={'Kana table'}
                />
                <div className={style.content}>
                    <div className={style.tableHeader}>
                        <CharacterTypeSwitcher
                            activeTypeId={characterType}
                            onSelect={this._handleChangeCharacterType}
                        />
                    </div>
                    <Table
                        characterType={characterType}
                        items={KANA_TABLE}
                        onClickItem={this._handleClickItem}
                    />
                    {
                        openedCharacter &&
                        <CharacterCard
                            characterType={characterType}
                            character={openedCharacter}
                            onClosed={this._handleCharacterCardClosed}
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapRouterToProps = (KanaTablePage) => (props) => {
    const {match} = props;
    const characterType = match && match.params && match.params.characterType;
    const openedCharacterId = match && match.params && match.params.characterId;
    let openedCharacter = null;

    if (openedCharacterId) {
        KANA_TABLE.some(rowItems => {
            return rowItems.some(item => {
                if (item.id !== openedCharacterId) {
                    return false;
                }

                openedCharacter = item;
                return true;
            });
        });
    }

    return (
        <KanaTablePage
            {...props}
            characterType={characterType}
            openedCharacterId={openedCharacterId}
            openedCharacter={openedCharacter}
        />
    );
};

export default withRouter(mapRouterToProps(KanaTablePage));