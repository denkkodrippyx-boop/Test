function GiftPanel({ onGiftSent, gameOver }) {
  try {
    const [username, setUsername] = React.useState('');
    const gifts = getGiftList();

    const handleGiftClick = (gift) => {
      if (gameOver) return;
      
      const user = username.trim() || 'Anonymous';
      onGiftSent(gift.name, gift.damage, user);
    };

    return (
      <div className="bg-[var(--background-card)] rounded-2xl p-6" data-name="gift-panel" data-file="components/GiftPanel.js">
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Your TikTok Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username..."
            className="w-full px-4 py-3 bg-[var(--background-dark)] rounded-lg border border-gray-700 focus:border-[var(--primary-color)] outline-none"
            disabled={gameOver}
          />
        </div>

        <h3 className="text-xl font-bold mb-4">Send Gifts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              onClick={() => handleGiftClick(gift)}
              className={`gift-item ${gameOver ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-4xl mb-2">{gift.icon}</div>
              <div className="text-sm font-semibold mb-1">{gift.name}</div>
              <div className="text-xs text-[var(--warning-color)] font-bold">
                -{gift.damage} HP
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('GiftPanel component error:', error);
    return null;
  }
}