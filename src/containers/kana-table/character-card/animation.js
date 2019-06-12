import {useTransition, config,} from "react-spring";
import {useMedia, useWindowSize} from "use-hooks";

const DESKTOP_DIALOG_WIDTH = 350;
const DESKTOP_DIALOG_HEIGHT = 480;

const MINIFIED_CARD_SIZE = 65;

const _getStartPosition = (windowSize, openedItem) => {
    if (!openedItem) {
        return null;
    }
    const rect = openedItem.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    }
};


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

function useAnimation(isOpened, characterId, onClosed) {
    const windowSize = useWindowSize();
    const openedItem = document.getElementById(`table-item-${characterId}`);
    const startPosition = _getStartPosition(windowSize, openedItem);
    const isMobile = useMedia([`(max-width: ${DESKTOP_DIALOG_WIDTH + 100}px), (max-height: ${DESKTOP_DIALOG_HEIGHT + 100}px)`], [true], false);

    const dialogHeight = isMobile ? windowSize.height : DESKTOP_DIALOG_HEIGHT;
    const dialogWidth = isMobile ? windowSize.width : DESKTOP_DIALOG_WIDTH;

    const transitionConfig = {
        config: {
            ...config.default,
            clamp: true,
            tension: 300,
            precision: 0.5
        },
        onRest: () => !isOpened && onClosed(),
        from: {
            ...startPosition,
            transform: `scale(${MINIFIED_CARD_SIZE / dialogWidth}, ${MINIFIED_CARD_SIZE / dialogHeight})`,
            backdropBackground: 'rgba(0, 0, 0, 0)'
        },
        enter: {
            ..._getTargetPosition(windowSize, isMobile),
            transform: 'scale(1,1)',
            backdropBackground: 'rgba(0, 0, 0, 0.2)'
        },
        leave: {
            ...startPosition,
            transform: `scale(${MINIFIED_CARD_SIZE / dialogWidth}, ${MINIFIED_CARD_SIZE / dialogHeight})`,
            backdropBackground: 'rgba(0, 0, 0, 0)'
        },

    };

    const transitions = useTransition(isOpened, null, transitionConfig);

    return [transitions];
}

export default useAnimation;