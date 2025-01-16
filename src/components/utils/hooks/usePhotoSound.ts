import { Howl } from "howler";

const photoSound = new Howl({
    src: [`${import.meta.env.BASE_URL}/sounds/photo.wav`],
    volume: 0.2,
});

export const usePhotoSound = photoSound;
