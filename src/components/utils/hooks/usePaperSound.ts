import { Howl } from "howler";

const paperSound = new Howl({
    src: ["/sounds/paper.wav"],
    volume: 0.4,
});

export const usePaperSound = paperSound;
