function BossCharacter({ health, maxHealth, gameOver }) {
  try {
    const healthPercentage = (health / maxHealth) * 100;
    const isLowHealth = healthPercentage < 30;
    const isCriticalHealth = healthPercentage < 10;

    return (
      <div className="boss-container" data-name="boss-character" data-file="components/BossCharacter.js">
        <div className={`text-center transition-all duration-300 ${gameOver ? 'opacity-30 scale-90' : ''} ${isCriticalHealth ? 'animate-pulse' : ''}`}>
          <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full mb-4 ${isLowHealth ? 'bg-red-900' : 'bg-gray-800'}`}>
            <div className={`icon-skull text-8xl ${gameOver ? 'text-gray-600' : isLowHealth ? 'text-red-400' : 'text-[var(--primary-color)]'}`}></div>
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {gameOver ? 'DEFEATED' : 'Shadow Boss'}
          </h2>
          <p className="text-xl text-[var(--text-secondary)]">
            Level 50 • Dark Warrior
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BossCharacter component error:', error);
    return null;
  }
}