import React, {useEffect, useState} from 'react';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false))
    }, [audio]);

    useEffect(
        () => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    return [playing, toggle];
};

export default useAudio;