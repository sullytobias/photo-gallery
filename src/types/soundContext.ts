import { ReactNode } from "react";

export type SoundContextType = {
    isBackgroundPlaying: boolean;
    isFxPlaying: boolean;
    toggleBackgroundSound: () => void;
    toggleFxSound: () => void;
    playSound?: (sound: Howl, isFx?: boolean) => void;
};

export type SoundProviderProps = {
    children: ReactNode;
};
