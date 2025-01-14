import { Howl } from "howler";

const sliderSound = new Howl({
    src: ["/sounds/slider.wav"],
    volume: 0.2,
});

export const useSliderSound = sliderSound;
