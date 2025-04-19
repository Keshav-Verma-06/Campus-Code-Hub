function PostProblemPage({ onSuccess, user }) {
    try {
        const handleSubmit = async (problemData) => {
            try {
                // Add author information to the problem data
                const problemWithAuthor = {
                    ...problemData,
                    author: problemData.isAnonymous ? null : problemData.author
                };
                await createProblem(problemWithAuthor);
                onSuccess();
            } catch (error) {
                console.error('Error posting problem:', error);
            }
        };

        return (
            <div data-name="post-problem-page">
                <h1 className="text-3xl font-bold mb-6">Post a New Problem</h1>
                <ProblemForm onSubmit={handleSubmit} user={user} />
            </div>
        );
    } catch (error) {
        console.error('PostProblemPage render error:', error);
        reportError(error);
        return null;
    }
}
