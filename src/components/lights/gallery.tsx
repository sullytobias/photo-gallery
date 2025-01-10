const GalleryLights = ({ lightOn }: { lightOn: boolean }) => {
    return lightOn ? (
        <>
            {/* Point lights for general illumination */}
            <pointLight position={[0, 0, 0]} intensity={30} />
            <pointLight position={[-5, 0, 0]} intensity={30} />
            <pointLight position={[5, 0, 0]} intensity={30} />
        </>
    ) : (
        <pointLight position={[0, 1.5, -4]} intensity={5} />
    );
}

export default GalleryLights;
