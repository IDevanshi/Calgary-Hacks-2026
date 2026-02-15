import worldMap from '@/assets/world-map.png';

const Globe = () => {
  return (
    <div className="globe-container flex items-center justify-center">
      <div className="globe border-4 border-minecraft-water">
        <img
          src={worldMap}
          alt="World map"
          className="globe-map"
          draggable={false}
        />
        <img
          src={worldMap}
          alt=""
          className="globe-map"
          style={{ left: '100%' }}
          draggable={false}
        />
        {/* Globe overlay for 3D effect */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, transparent 40%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>
    </div>
  );
};

export default Globe;
