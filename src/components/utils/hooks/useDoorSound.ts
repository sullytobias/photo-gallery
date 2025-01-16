import { Howl } from "howler";

const doorSound = new Howl({
    src: [`${import.meta.env.BASE_URL}/sounds/door.wav`],
    volume: 0.7,
});

export const useDoorSound = doorSound;
