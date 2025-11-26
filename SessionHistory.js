function SessionHistory() {
  try {
    const [sessions, setSessions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showHistory, setShowHistory] = React.useState(false);

    React.useEffect(() => {
      loadSessions();
    }, []);

    const loadSessions = async () => {
      try {
        setLoading(true);
        const result = await trickleListObjects('game_session', 10, true);
        setSessions(result.items);
      } catch (error) {
        console.error('Failed to load sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    const formatDuration = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m ${secs}s`;
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
      <div className="bg-[var(--background-card)] rounded-2xl p-6" data-name="session-history" data-file="components/SessionHistory.js">
        <button
          onClick={() => {
            setShowHistory(!showHistory);
            if (!showHistory) loadSessions();
          }}
          className="w-full flex items-center justify-between mb-4 hover:opacity-80"
        >
          <div className="flex items-center gap-2">
            <div className="icon-history text-xl text-[var(--secondary-color)]"></div>
            <h3 className="text-xl font-bold">Session History</h3>
          </div>
          <div className={`icon-chevron-down text-xl transition-transform ${showHistory ? 'rotate-180' : ''}`}></div>
        </button>

        {showHistory && (
          <div>
            {loading ? (
              <p className="text-center text-[var(--text-secondary)] py-4">Loading...</p>
            ) : sessions.length === 0 ? (
              <p className="text-center text-[var(--text-secondary)] py-4">No sessions yet</p>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => {
                  const topPlayers = JSON.parse(session.objectData.TopPlayers || '[]');
                  return (
                    <div
                      key={session.objectId}
                      className="p-4 bg-[var(--background-dark)] rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[var(--success-color)]">
                          {session.objectData.WinnerUsername}
                        </span>
                        <span className="text-xs text-[var(--text-secondary)]">
                          {formatDuration(session.objectData.SessionDuration)}
                        </span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)] mb-2">
                        {formatDate(session.objectData.CompletedAt)}
                      </div>
                      {topPlayers.length > 0 && (
                        <div className="text-xs space-y-1">
                          {topPlayers.map((player, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>{player.username}</span>
                              <span className="text-[var(--warning-color)]">
                                {player.damage.toLocaleString()} dmg
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('SessionHistory component error:', error);
    return null;
  }
}