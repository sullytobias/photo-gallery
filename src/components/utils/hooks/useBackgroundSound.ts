import { Howl } from "howler";

const backgroundSound = new Howl({
    src: ["/sounds/menu.wav"],
    loop: true,
    volume: 0.5,
});

export const useBackgroundSound = backgroundSound;
