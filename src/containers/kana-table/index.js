import React from 'react';
import {withRouter} from "react-router-dom";

import kanaData from '../../kana_data';

import Header from './header';
import TableHeader from "./table-header";
import Table, {SectionStates} from "./table";
import CharacterCard from "./character-card";

import style from './style.module.scss';


class KanaTablePage extends React.Component {

    state = {
        currentSection: null
    };

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

    _handleChangeSectionState = (sectionIndex, state) => {
        console.log('CHANGE', {sectionIndex, status: state});
        if (state === SectionStates.FIXED || state === SectionStates.ORIGINAL) {
            this.setState({
                currentSection: kanaData[sectionIndex]
            });
        }
    };

    render() {
        const {openedCharacter, characterType} = this.props;
        const {currentSection} = this.state;

        return (
            <div className={style.kanaTablePage}>
                <Header
                    title={'Kana table'}
                />
                <div className={style.content}>
                    <TableHeader
                        key='table-header'
                        characterType={characterType}
                        onChangeCharacterType={this._handleChangeCharacterType}
                        currentSectionName={currentSection && currentSection.name}
                    />
                    <Table
                        characterType={characterType}
                        tableData={kanaData}
                        onClickItem={this._handleClickItem}
                        onChangeSectionState={this._handleChangeSectionState}
                    />
                    {
                        openedCharacter &&
                        <CharacterCard
                            key={'character-card'}
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