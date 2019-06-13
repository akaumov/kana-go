import React from 'react';
import style from "./style.module.scss";

const PlaySoundButton = ({isSoundPlaying, onClick}) => (
    <button
        className={isSoundPlaying ? style.playSoundButtonActive : style.playSoundButton}
        onClick={onClick}
    >
        <i
            className={isSoundPlaying ? "ion ion-ios-volume-high" : "ion ion-ios-volume-low"}
            onClick={onClick}
        />
    </button>
);

export default PlaySoundButton;