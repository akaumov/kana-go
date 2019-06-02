import React from 'react';
import {withRouter} from "react-router-dom";

import Header from "./header";
import KanaSelector from "./kana-selector";
import TrainingDialog from "./training-dialog";

import style from './style.module.scss';

const TrainingPage = (props) => {
    const {dialogId, history} = props;

    const _handleStartTraining = () => history.push('/training/start');
    const _handleTrainingDialogClosed = () => history.replace('/training');

    return (
        <div className={style.trainingPage}>
            <Header/>
            <div className={style.content}>
                <h1 className={style.title}>Select training options</h1>
                <div className={style.optionsGroup}>
                    <KanaSelector/>
                    <button
                        className={style.startButton}
                        onClick={_handleStartTraining}
                    >
                        Start
                    </button>
                </div>
                {
                    dialogId === 'start' &&
                    <TrainingDialog
                        values={{}}
                        onClosed={_handleTrainingDialogClosed}
                    />
                }
            </div>
        </div>
    );
};

const mapRouterToProps = (TrainingPage) => (props) => {
    const {match} = props;
    const dialogId = match && match.params && match.params.dialogId;


    return (
        <TrainingPage
            {...props}
            dialogId={dialogId}
        />
    );
};

export default withRouter(mapRouterToProps(TrainingPage));