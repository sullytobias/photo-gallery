import { Howl } from "howler";

const lightSwitchSound = new Howl({
    src: [`${import.meta.env.BASE_URL}/sounds/lightSwitch.wav`],
    volume: 0.7,
});

export const uselightSwitchSound = lightSwitchSound;
