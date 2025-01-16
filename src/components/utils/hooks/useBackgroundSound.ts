import { Howl } from "howler";

const backgroundSound = new Howl({
    src: [`${import.meta.env.BASE_URL}/sounds/menu.wav`],
    loop: true,
    volume: 0.5,
});

export const useBackgroundSound = backgroundSound;
