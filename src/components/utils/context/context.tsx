import { useState, FC } from "react";
import { SoundContext } from "./sound";
import { SoundProviderProps } from "../../../types/soundContext";

export const SoundProvider: FC<SoundProviderProps> = ({ children }) => {
    const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(true);
    const [isFxPlaying, setIsFxPlaying] = useState(true);

    const toggleBackgroundSound = () => setIsBackgroundPlaying((prev) => !prev);
    const toggleFxSound = () => setIsFxPlaying((prev) => !prev);

    const playSound = (sound: Howl, isFx?: boolean) => {
        if (isFx && isFxPlaying) sound.play();
        if (!isFx && isBackgroundPlaying) sound.play();
    };

    return (
        <SoundContext.Provider
            value={{
                isBackgroundPlaying,
                isFxPlaying,
                toggleBackgroundSound,
                toggleFxSound,
                playSound,
            }}
        >
            {children}
        </SoundContext.Provider>
    );
};
