function HealthBar({ currentHealth, maxHealth }) {
  try {
    const percentage = Math.round((currentHealth / maxHealth) * 100);
    const width = `${percentage}%`;

    return (
      <div className="mt-6" data-name="health-bar" data-file="components/HealthBar.js">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Boss Health</span>
          <span className="text-sm font-bold text-[var(--primary-color)]">
            {currentHealth.toLocaleString()} / {maxHealth.toLocaleString()}
          </span>
        </div>
        <div className="health-bar-container">
          <div className="health-bar" style={{ width }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white drop-shadow-lg">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HealthBar component error:', error);
    return null;
  }
}