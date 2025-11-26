class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-dark)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[var(--primary-color)] rounded-lg"
            >
              Reload Game
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [bossHealth, setBossHealth] = React.useState(10000);
    const [maxHealth] = React.useState(10000);
    const [damageEffects, setDamageEffects] = React.useState([]);
    const [leaderboard, setLeaderboard] = React.useState([]);
    const [gameOver, setGameOver] = React.useState(false);
    const [sessionStartTime, setSessionStartTime] = React.useState(Date.now());
    const [lastWinner, setLastWinner] = React.useState('');

    const handleGiftSent = (giftName, damage, username) => {
      const newHealth = Math.max(0, bossHealth - damage);
      setBossHealth(newHealth);
      
      const effectId = Date.now();
      setDamageEffects(prev => [...prev, { id: effectId, damage }]);
      setTimeout(() => {
        setDamageEffects(prev => prev.filter(e => e.id !== effectId));
      }, 2000);

      setLeaderboard(prev => {
        const existing = prev.find(p => p.username === username);
        if (existing) {
          return prev.map(p => 
            p.username === username 
              ? { ...p, totalDamage: p.totalDamage + damage }
              : p
          ).sort((a, b) => b.totalDamage - a.totalDamage);
        }
        return [...prev, { username, totalDamage: damage }]
          .sort((a, b) => b.totalDamage - a.totalDamage);
      });

      if (newHealth === 0 && !gameOver) {
        setGameOver(true);
        setLastWinner(username);
        saveGameSession(username, leaderboard, sessionStartTime);
      }
    };

    const resetGame = () => {
      setBossHealth(maxHealth);
      setGameOver(false);
      setLeaderboard([]);
      setDamageEffects([]);
      setSessionStartTime(Date.now());
      setLastWinner('');
    };

    const saveGameSession = async (winner, players, startTime) => {
      try {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        const topThree = players.slice(0, 3).map(p => ({
          username: p.username,
          damage: p.totalDamage
        }));
        
        await trickleCreateObject('game_session', {
          BossName: 'Shadow Boss',
          WinnerUsername: winner,
          TotalDamageDealt: maxHealth,
          SessionDuration: duration,
          TopPlayers: JSON.stringify(topThree),
          CompletedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Failed to save game session:', error);
      }
    };

    return (
      <div className="min-h-screen bg-[var(--background-dark)] p-4" data-name="app" data-file="app.js">
        <div className="max-w-6xl mx-auto">
          <header className="text-center py-6 mb-8">
            <h1 className="text-4xl font-bold text-gradient mb-2">TikTok Boss Fight</h1>
            <p className="text-[var(--text-secondary)]">Send gifts to defeat the boss!</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-[var(--background-card)] rounded-2xl p-6 mb-6">
                <BossCharacter health={bossHealth} maxHealth={maxHealth} gameOver={gameOver} />
                <DamageEffect effects={damageEffects} />
                <HealthBar currentHealth={bossHealth} maxHealth={maxHealth} />
                
                {gameOver && (
                  <div className="text-center mt-6">
                    <h2 className="text-3xl font-bold text-[var(--success-color)] mb-4">
                      BOSS DEFEATED!
                    </h2>
                    <button
                      onClick={resetGame}
                      className="px-8 py-3 bg-[var(--primary-color)] rounded-lg font-bold hover:opacity-90"
                    >
                      New Boss
                    </button>
                  </div>
                )}
              </div>

              <GiftPanel onGiftSent={handleGiftSent} gameOver={gameOver} />
            </div>

            <div className="lg:col-span-1">
              <LeaderBoard players={leaderboard} />
              <div className="mt-6">
                <SessionHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);