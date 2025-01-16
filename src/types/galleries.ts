export type GalleryType = {
    title: string;
    id: "macro" | "urbex" | "architecture" | "people" | "animals";
    color: string;
};

export type GalleriesType = GalleryType[];

export type GalleryProps = {
    currentGallery: GalleryType;
    onBack: () => void;
    onSwitchGallery: (direction: "next" | "prev") => void;
};
