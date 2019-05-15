import React from 'react';

import Header from "./header";
import KanaSelector from "./kana-selector";

import style from './style.module.scss';
import TrainingDialog from "./training-dialog";

class TrainingPage extends React.Component {
    render() {
        return (
            <div className={style.trainingPage}>
                <Header/>
                <div className={style.content}>
                    <h1 className={style.title}>Select training options</h1>
                    <div className={style.optionsGroup}>
                        <KanaSelector/>
                        <button className={style.startButton}>
                            Start
                        </button>
                    </div>
                    <TrainingDialog
                        values={{}}
                        onClosed={() => {}}
                    />
                </div>
            </div>
        );
    }
}

export default TrainingPage;