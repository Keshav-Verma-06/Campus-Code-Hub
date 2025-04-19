function RewardSystem({ userPoints }) {
    try {
        const [rewards, setRewards] = React.useState([
            { id: 1, brand: 'Adidas', item: 'Socks', points: 100, image: "https://th.bing.com/th/id/OIP.NwODrPeYTWMGbG1Tmg_g0wHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.2&pid=1.7" },
            { id: 2, brand: 'Puma', item: 'T-Shirt', points: 500, image: "https://www.dmsports.fr/48875-large_default/t-shirt-puma-power-colorblock-tee-noir-blanc.jpg" },
            { id: 3, brand: 'H&M', item: 'Hoodie', points: 1000, image: "https://i.pinimg.com/736x/49/bd/61/49bd617eade8b1813de434d6154a79d9.jpg" }
        ]);

        const handleRedeem = async (rewardId) => {
            try {
                const reward = rewards.find(r => r.id === rewardId);
                if (userPoints < reward.points) {
                    throw new Error('Not enough points');
                }
                // API call to redeem reward
                // await redeemReward(rewardId);
            } catch (error) {
                console.error('Redeem error:', error);
            }
        };

        return (
            <div className="card" data-name="reward-system">
                <h2 className="text-2xl font-bold mb-6">Rewards Store</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rewards.map(reward => (
                        <div key={reward.id} className="card" data-name="reward-card">
                            <img src={reward.image} alt={reward.item} className="w-full h-40 object-cover mb-4"/>
                            <h3 className="font-bold">{reward.brand}</h3>
                            <p>{reward.item}</p>
                            <p className="text-lg font-bold mt-2">{reward.points} Points</p>
                            <button
                                className={`btn btn-primary w-full mt-4 ${userPoints < reward.points ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => handleRedeem(reward.id)}
                                disabled={userPoints < reward.points}
                                data-name="redeem-button"
                            >
                                Redeem
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('RewardSystem render error:', error);
        reportError(error);
        return null;
    }
}
