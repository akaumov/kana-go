import React from 'react';
import {withRouter} from "react-router-dom";

import style from './style.module.scss';
import AnimatedBackground from "./animated-background";

class HomePage extends React.Component {
    _handleOpenKanaTable = () => {
        this.props.history.push('/kana-table/hiragana');
    };

    _handleOpenTraining = () => {
        this.props.history.push('/training');
    };

    render() {
        return (
            <div className={style.homePage}>
                <div className={style.content}>
                    <div className={style.menu}>
                        <h1 className={style.title}>Kana-Go (仮名)</h1>
                        <button
                            className={style.kanaTableButton}
                            onClick={this._handleOpenKanaTable}
                        >
                            Alphabet
                        </button>
                        <button
                            className={style.trainingButton}
                            onClick={this._handleOpenTraining}
                        >
                            Training
                        </button>
                        <button className={style.helpButton}>
                            Help
                        </button>
                    </div>
                </div>
                <AnimatedBackground />
            </div>
        );
    }
}

export default withRouter(HomePage);
