import React, {useState} from 'react';
import {withRouter} from "react-router-dom";

import kanaData from '../../kana_data';

import Header from './header';
import TableHeader from "./table-header";
import Table, {SectionStates} from "./table";
import CharacterCard from "./character-card";

import style from './style.module.scss';
import {trace} from "../../utils";


const KanaTablePage = (props) => {

    const {
        isOpenedFromHomePage,
        characterType,
        openedCharacter,
        openedCharacterId,
        history
    } = props;

    const [currentSection, setCurrentSection] = useState(null);

    const _handleClickItem = (itemId) => {
        history.push(`/kana-table/${characterType}/${itemId}`);
    };

    const _handleCharacterCardClosed = () => {
        history.replace(`/kana-table/${characterType}`);
    };

    const _handleChangeCharacterType = (newCharacterType) => {
        history.replace(`/kana-table/${newCharacterType}`);
    };

    const _handleChangeSectionState = (sectionIndex, state) => {
        if (state === SectionStates.FIXED || state === SectionStates.ORIGINAL) {
            setCurrentSection(kanaData[sectionIndex]);
        }
    };

    return (
        <div className={style.backdrop}>
            <div className={isOpenedFromHomePage ? style.kanaTablePageAnimated : style.kanaTablePage}>
                <Header
                    title={'Kana table'}
                />
                <div className={style.content}>
                    <TableHeader
                        key='table-header'
                        characterType={characterType}
                        onChangeCharacterType={_handleChangeCharacterType}
                        currentSectionName={currentSection && currentSection.name}
                    />
                    <Table
                        characterType={characterType}
                        openedCharacterId={openedCharacterId}
                        tableData={kanaData}
                        onClickItem={_handleClickItem}
                        onChangeSectionState={_handleChangeSectionState}
                    />
                    {
                        openedCharacter &&
                        <CharacterCard
                            isOpened={!!openedCharacterId}
                            key={'character-card'}
                            characterType={characterType}
                            character={openedCharacter}
                            onClosed={_handleCharacterCardClosed}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

const mapRouterToProps = (KanaTablePage) => (props) => {
    const {match} = props;
    const characterType = match && match.params && match.params.characterType;
    const openedCharacterId = match && match.params && match.params.characterId;
    let openedCharacter = null;

    if (openedCharacterId) {
        kanaData.some(section => {
            const {items} = section;

            items.some(rowItems => {
                return rowItems.some(item => {
                    if (item.id !== openedCharacterId) {
                        return false;
                    }

                    openedCharacter = item;
                    return true;
                });
            });
        })
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