import React from 'react';

import style from './style.module.scss';

class AnimatedBackground extends React.Component {
    render() {
        return (
            <div className={style.animatedBackground}>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
                <div className={style.petal}/>
            </div>
        );
    }
}

export default AnimatedBackground;