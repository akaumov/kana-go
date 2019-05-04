import React from 'react';
import {withRouter} from "react-router-dom";

import style from './style.module.scss';
import AnimatedBackground from "./animated-background";

class HomePage extends React.Component {
    _handleOpenKanaTable = () => {
        this.props.history.push('/kana-table/hiragana');
    };

    _handleOpenPractice = () => {
        this.props.history.push('/practice');
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
                            className={style.practiceButton}
                            onClick={this._handleOpenPractice}
                        >
                            Practice
                        </button>
                        <div className={style.optionButtons}>
                            <button className={style.optionButton}>
                                Info
                            </button>
                            <button className={style.optionButton}>
                                Lists
                            </button>
                        </div>
                    </div>
                </div>
                <AnimatedBackground />
            </div>
        );
    }
}

export default withRouter(HomePage);
