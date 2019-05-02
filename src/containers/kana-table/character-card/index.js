import React from 'react';

import Modal from "../../../components/modal";

import style from './style.module.scss';

import closeIcon from '../../../assets/icons/_ionicons_svg_md-close.svg';

class CharacterCard extends React.Component {
    render() {
        const {onClose} = this.props;
        return (
            <Modal>
                <div className={style.dialog}>
                    <button
                        className={style.closeButton}
                        onClick={onClose}
                    >
                        <img src={closeIcon}/>
                    </button>
                    <div className={style.content}>

                    </div>
                </div>
            </Modal>
        );
    }
}

export default CharacterCard;