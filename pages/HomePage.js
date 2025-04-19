function HomePage({ setCurrentPage, setSelectedProblem }) {
    try {
        const [filter, setFilter] = React.useState('latest');
        const [problems, setProblems] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            fetchProblems({ filter })
                .then(data => {
                    setProblems(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching problems:', error);
                    setLoading(false);
                });
        }, [filter]);

        const handleProblemClick = (problem) => {
            setSelectedProblem(problem);
            setCurrentPage('problem');
        };

        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <i className="fas fa-spinner fa-spin text-4xl"></i>
                </div>
            );
        }

        return (
            <div data-name="home-page">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Latest Problems</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage('post')}
                        data-name="post-problem-button"
                    >
                        Post a Problem
                    </button>
                </div>

                <div className="flex space-x-4 mb-6">
                    <button
                        className={`btn ${filter === 'latest' ? 'btn-primary' : ''}`}
                        onClick={() => setFilter('latest')}
                        data-name="filter-latest"
                    >
                        Latest
                    </button>
                    <button
                        className={`btn ${filter === 'popular' ? 'btn-primary' : ''}`}
                        onClick={() => setFilter('popular')}
                        data-name="filter-popular"
                    >
                        Most Popular
                    </button>
                    <button
                        className={`btn ${filter === 'unsolved' ? 'btn-primary' : ''}`}
                        onClick={() => setFilter('unsolved')}
                        data-name="filter-unsolved"
                    >
                        Unsolved
                    </button>
                </div>

                <div className="grid gap-6">
                    {problems.map(problem => (
                        <div 
                            key={problem.id}
                            onClick={() => handleProblemClick(problem)}
                            className="cursor-pointer"
                        >
                            <ProblemCard problem={problem} />
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('HomePage render error:', error);
        reportError(error);
        return null;
    }
}
