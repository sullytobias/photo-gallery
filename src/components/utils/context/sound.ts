import { createContext } from "react";
import { SoundContextType } from "../../../types/soundContext";

export const SoundContext = createContext<SoundContextType | undefined>(
    undefined
);
