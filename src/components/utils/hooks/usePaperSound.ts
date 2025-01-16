import { Howl } from "howler";

const paperSound = new Howl({
    src: [`${import.meta.env.BASE_URL}/sounds/paper.wav`],
    volume: 0.4,
});

export const usePaperSound = paperSound;
