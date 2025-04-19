function UserProfile({ user }) {
    try {
        const [stats, setStats] = React.useState({
            problemsSolved: 0,
            totalPoints: 0,
            rank: 'Beginner'
        });

        React.useEffect(() => {
            // Fetch user stats
            const fetchStats = async () => {
                try {
                    // const response = await fetch(`${API_ENDPOINT}/users/${user.id}/stats`);
                    // const data = await response.json();
                    // setStats(data);
                } catch (error) {
                    console.error('Error fetching user stats:', error);
                }
            };
            fetchStats();
        }, [user]);

        return (
            <div className="card" data-name="user-profile">
                <div className="flex items-center mb-6">
                    <img
                        src={user.avatar || "https://www.creativefabrica.com/wp-content/uploads/2019/02/Monogram-KV-Logo-Design-by-Greenlines-Studios-580x387.jpg"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="card text-center">
                        <h3 className="text-xl font-bold">{stats.problemsSolved}</h3>
                        <p>Problems Solved</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-xl font-bold">{stats.totalPoints}</h3>
                        <p>Total Points</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-xl font-bold">{stats.rank}</h3>
                        <p>Rank</p>
                    </div>
                </div>

                <RewardSystem userPoints={stats.totalPoints} />
            </div>
        );
    } catch (error) {
        console.error('UserProfile render error:', error);
        reportError(error);
        return null;
    }
}
