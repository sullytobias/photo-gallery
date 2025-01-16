import { Howl } from "howler";

const pxSound = new Howl({
    src: [`${import.meta.env.BASE_URL}/sounds/500px.wav`],
    volume: 0.5,
});

export const usePxSound = pxSound;
