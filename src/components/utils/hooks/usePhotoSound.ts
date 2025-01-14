import { Howl } from "howler";

const photoSound = new Howl({
    src: ["/sounds/photo.wav"],
    volume: 0.2,
});

export const usePhotoSound = photoSound;
