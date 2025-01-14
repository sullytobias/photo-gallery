export type SliderProps = {
    onEnterGallery: (galleryId: string) => void;
};

export type MainBoxProps = {
    onEnterGallery: (galleryId: string) => void;
    currentIndex: number;
    playSound?: (sound: Howl, isFx: boolean) => void;
};