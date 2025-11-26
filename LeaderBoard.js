function LeaderBoard({ players }) {
  try {
    const topPlayers = players.slice(0, 10);

    return (
      <div className="bg-[var(--background-card)] rounded-2xl p-6 sticky top-4" data-name="leaderboard" data-file="components/LeaderBoard.js">
        <div className="flex items-center gap-2 mb-4">
          <div className="icon-trophy text-xl text-[var(--warning-color)]"></div>
          <h3 className="text-xl font-bold">Top Damage Dealers</h3>
        </div>

        {topPlayers.length === 0 ? (
          <p className="text-center text-[var(--text-secondary)] py-8">
            No damage dealt yet
          </p>
        ) : (
          <div className="space-y-3">
            {topPlayers.map((player, index) => (
              <div
                key={player.username}
                className="flex items-center gap-3 p-3 bg-[var(--background-dark)] rounded-lg"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-yellow-500 text-black' :
                  index === 1 ? 'bg-gray-400 text-black' :
                  index === 2 ? 'bg-amber-700 text-white' :
                  'bg-gray-700'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{player.username}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {player.totalDamage.toLocaleString()} damage
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('LeaderBoard component error:', error);
    return null;
  }
}