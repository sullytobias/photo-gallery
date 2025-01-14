import { Howl } from "howler";

const pxSound = new Howl({
    src: ["/sounds/500px.wav"],
    volume: 0.5,
});

export const usePxSound = pxSound;
