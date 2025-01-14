import { Howl } from "howler";

const doorSound = new Howl({
    src: ["/sounds/door.wav"],
    volume: 0.7,
});

export const useDoorSound = doorSound;
