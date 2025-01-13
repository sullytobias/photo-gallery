import { useState, FC, ReactNode } from "react";
import { SoundContext } from "./sound";

interface SoundProviderProps {
    children: ReactNode;
}

export const SoundProvider: FC<SoundProviderProps> = ({ children }) => {
    const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(true);
    const [isFxPlaying, setIsFxPlaying] = useState(true);

    const toggleBackgroundSound = () => setIsBackgroundPlaying((prev) => !prev);
    const toggleFxSound = () => setIsFxPlaying((prev) => !prev);

    return (
        <SoundContext.Provider
            value={{
                isBackgroundPlaying,
                isFxPlaying,
                toggleBackgroundSound,
                toggleFxSound,
            }}
        >
            {children}
        </SoundContext.Provider>
    );
};
