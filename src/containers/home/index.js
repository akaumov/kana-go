import React from 'react';
import {withRouter} from "react-router-dom";

import style from './style.module.scss';

class HomePage extends React.Component {
    _handleOpenKanaTable = () => {
        this.props.history.push('/kana-table');
    };

    _handleOpenPractice = () => {
        this.props.history.push('/practice');
    };

    render() {
        return (
            <div className={style.homePage}>
                <div className={style.header}>
                    <h1>Kana (仮名) - Home</h1>
                </div>
                <div className={style.content}>
                    <div className={style.menu}>
                        <button
                            className={style.kanaTableButton}
                            onClick={this._handleOpenKanaTable}
                        >
                            Kana table
                        </button>
                        <button
                            className={style.practiceButton}
                            onClick={this._handleOpenPractice}
                        >
                            Practice
                        </button>
                        <div className={style.optionButtons}>
                            <button className={style.optionButton}>
                                More...
                            </button>
                            <button className={style.optionButton}>
                                Lists
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HomePage);
