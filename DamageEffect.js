function DamageEffect({ effects }) {
  try {
    return (
      <div className="absolute inset-0 pointer-events-none" data-name="damage-effect" data-file="components/DamageEffect.js">
        {effects.map((effect, index) => (
          <div
            key={effect.id}
            className="damage-text"
            style={{
              left: `${30 + (index % 3) * 20}%`,
              top: `${20 + (index % 2) * 10}%`,
              animation: 'bounce 1s ease-out, fadeOut 2s ease-out'
            }}
          >
            -{effect.damage}
          </div>
        ))}
        <style>{`
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>
      </div>
    );
  } catch (error) {
    console.error('DamageEffect component error:', error);
    return null;
  }
}