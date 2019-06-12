import {useTransition, config,} from "react-spring";
import {useMedia, useWindowSize} from "use-hooks";
import {useState} from "react";

const DESKTOP_DIALOG_WIDTH = 350;
const DESKTOP_DIALOG_HEIGHT = 480;

const MINIFIED_CARD_SIZE = 65;

const _getTargetPosition = (windowSize, isMobile) => {
    if (isMobile) {
        return {
            x: 0,
            y: 0
        };
    }

    return {
        x: windowSize.width / 2 - DESKTOP_DIALOG_WIDTH / 2,
        y: windowSize.height / 2 - DESKTOP_DIALOG_HEIGHT / 2,
    }
};

const _getStartPosition = (windowSize, openedItem, isMobile) => {
    if (!openedItem) {
        return {
            x: 0,
            y: 0
        };
    }

    const targetPosition = _getTargetPosition(windowSize, isMobile);
    const rect = openedItem.getBoundingClientRect();
    return {
        x: rect.left - targetPosition.x,
        y: rect.top - targetPosition.y
    }
};


function useAnimation(isOpened, characterId, onClosed) {
    const windowSize = useWindowSize();
    const openedItem = document.getElementById(`table-item-${characterId}`);
    const [showExtraInfo, setShowExtraInfo] = useState(isOpened);

    const isMobile = useMedia(
        [`(max-width: ${DESKTOP_DIALOG_WIDTH + 100}px), (max-height: ${DESKTOP_DIALOG_HEIGHT + 100}px)`],
        [true],
        false
    );

    const startPosition = _getStartPosition(windowSize, openedItem, isMobile);

    const dialogHeight = isMobile ? windowSize.height : DESKTOP_DIALOG_HEIGHT;
    const dialogWidth = isMobile ? windowSize.width : DESKTOP_DIALOG_WIDTH;

    const _handleRest = (isOpened, characterId) => {
        setShowExtraInfo(isOpened);
        !isOpened && onClosed();
    };

    const initialContainerTransform = `translate(${startPosition.x}px, ${startPosition.y}px) scale(${MINIFIED_CARD_SIZE / dialogWidth}, ${MINIFIED_CARD_SIZE / dialogHeight})`;

    const transitionConfig = {
        config: {
            ...config.default,
            clamp: true,
            tension: 320,
            precision: 0.5,
        },
        onRest: _handleRest,
        from: {
            transform: initialContainerTransform,
            backdropBackground: 'rgba(0, 0, 0, 0)'
        },
        enter: {
            transform: `translate(0px, 0px) scale(1, 1)`,
            backdropBackground: 'rgba(0, 0, 0, 0.2)'
        },
        leave: {
            transform: initialContainerTransform,
            backdropBackground: 'rgba(0, 0, 0, 0)'
        },
    };

    const containerTransitions = useTransition(
        isOpened,
        null,
        transitionConfig
    );

    const extraInfoTransitionConfig = {
        from: {
            transform: 'translate(0,140px)',
            opacity: 0,
        },
        enter: {
            transform: 'translate(0,0px)',
            opacity: 1,
        },
        leave: {
            transform: 'translate(0,140px)',
            opacity: 0,
        },
    };

    const extraInfoTransitions = useTransition(
        showExtraInfo,
        null,
        extraInfoTransitionConfig
    );

    return [containerTransitions, extraInfoTransitions];
}

export default useAnimation;