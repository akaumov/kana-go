import React from 'react';
import logo from '../../assets/logo.svg';
import style from './style.module.scss';

function HomePage() {
    return (
        <div className={style.app}>
            <header className={style.appHeader}>
                <img src={logo} className={style.appLogo} alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className={style.appLink}
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default HomePage;
