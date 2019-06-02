import React from 'react';
import {withRouter} from "react-router-dom";

import AnimatedBackground from "./animated-background";

import style from "./style.module.scss";

const HomePage = (props) => {
    const {history} = props;

    const _handleOpenKanaTable = () => history.push('/kana-table/hiragana');
    const _handleOpenTraining = () => history.push('/training');

    return (
        <div className={style.homePage}>
            <div className={style.content}>
                <div className={style.menu}>
                    <h1 className={style.title}>Kana-Go (仮名)</h1>
                    <button
                        className={style.kanaTableButton}
                        onClick={_handleOpenKanaTable}
                    >
                        Alphabet
                    </button>
                    <button
                        className={style.trainingButton}
                        onClick={_handleOpenTraining}
                    >
                        Training
                    </button>
                    <button className={style.helpButton}>
                        Help
                    </button>
                </div>
            </div>
            <AnimatedBackground/>
        </div>
    );
};

export default withRouter(HomePage);
