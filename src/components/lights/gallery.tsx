const GalleryLights = ({ lightOn }: { lightOn: boolean }) => {
    return (
        <>
            {lightOn ? (
                <>
                    {/* Point lights for general illumination */}
                    <pointLight position={[0, 0, 0]} intensity={30} />
                    <pointLight position={[-5, 0, 0]} intensity={30} />
                    <pointLight position={[5, 0, 0]} intensity={30} />
                </>
            ) : (
                <spotLight
                    position={[0, 5, 0]} // Position the spotlight above
                    angle={Math.PI / 2} // Spotlight beam spread angle
                    intensity={30} // Adjust intensity
                />
            )}
        </>
    );
};

export default GalleryLights;
