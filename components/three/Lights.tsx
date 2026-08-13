export function Lights() {
  return (
    <>
      <ambientLight intensity={0.18} color="#8aa4c6" />
      <directionalLight position={[4, 5, 6]} intensity={2.6} color="#d7efff" />
      <pointLight position={[-4, 1, 3]} intensity={18} distance={9} color="#6474ff" />
      <pointLight position={[3, -3, 2]} intensity={12} distance={7} color="#64f1ff" />
    </>
  );
}

