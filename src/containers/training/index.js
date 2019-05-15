import React from 'react';

import Header from "./header";
import KanaSelector from "./kana-selector";

import style from './style.module.scss';

class TrainingPage extends React.Component {
    render() {
        return (
            <div className={style.trainingPage}>
                <Header/>
                <h1>Select training options</h1>
                <KanaSelector/>
            </div>
        );
    }
}

export default TrainingPage;