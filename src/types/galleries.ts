export type GalleryType = { title: string; id: string; color: string };

export type GalleriesType = GalleryType[];

export type GalleryProps = {
    currentGallery: GalleryType;
    onBack: () => void;
    onSwitchGallery: (direction: "next" | "prev") => void;
};
