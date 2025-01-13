import { useContext } from "react";
import { SoundContextType } from "../../../types/soundContext";
import { SoundContext } from "../context/sound";

export const useSound = (): SoundContextType => {
    const context = useContext(SoundContext);

    if (!context) {
        throw new Error("useSound must be used within a SoundProvider");
    }

    return context;
};
