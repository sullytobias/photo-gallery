import { Howl } from "howler";

const sliderSound = new Howl({
    src: [`${import.meta.env.BASE_URL}/sounds/slider.wav`],
    volume: 0.2,
});

export const useSliderSound = sliderSound;
