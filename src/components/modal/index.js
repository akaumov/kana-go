import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.className = props.backdropClass;
        this.el.onclick = props.onClickBackdrop;
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

Modal.propTypes = {
    backdrop: PropTypes.string,
};

Modal.defaultProps = {
    backdrop: style.backdropClass
};

export default Modal;