const GlobalLights = () => (
    <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
    </>
);

export default GlobalLights;
