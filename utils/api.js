const API_ENDPOINT = "http://localhost:5000/api";

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Helper function for making authenticated requests
const makeAuthRequest = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

async function fetchProblems(filters = {}) {
    try {
        const queryParams = new URLSearchParams();
        if (filters.filter) {
            queryParams.append('filter', filters.filter);
        }
        
        const response = await makeAuthRequest(`${API_ENDPOINT}/problems?${queryParams.toString()}`);
        return response;
    } catch (error) {
        console.error('Error fetching problems:', error);
        throw error;
    }
}

async function createProblem(problemData) {
    try {
        const response = await makeAuthRequest(`${API_ENDPOINT}/problems`, {
            method: 'POST',
            body: JSON.stringify(problemData)
        });
        return response;
    } catch (error) {
        console.error('Error creating problem:', error);
        throw error;
    }
}

async function voteProblem(problemId, voteType) {
    try {
        const response = await makeAuthRequest(`${API_ENDPOINT}/problems/${problemId}/vote`, {
            method: 'POST',
            body: JSON.stringify({ voteType })
        });
        return response;
    } catch (error) {
        console.error('Error voting:', error);
        throw error;
    }
}

async function submitSolution(problemId, solution) {
    try {
        const response = await makeAuthRequest(`${API_ENDPOINT}/solutions`, {
            method: 'POST',
            body: JSON.stringify({
                problemId,
                content: solution,
                authorId: JSON.parse(localStorage.getItem('currentUser')).id
            })
        });
        return response;
    } catch (error) {
        console.error('Error submitting solution:', error);
        throw error;
    }
}

async function submitComment(problemId, commentData) {
    try {
        const response = await makeAuthRequest(`${API_ENDPOINT}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                problemId,
                content: commentData.content,
                authorId: commentData.author.id
            })
        });
        return response;
    } catch (error) {
        console.error('Error submitting comment:', error);
        throw error;
    }
}

async function getSolutions(problemId) {
    try {
        const response = await makeAuthRequest(`${API_ENDPOINT}/solutions/problem/${problemId}`);
        return response;
    } catch (error) {
        console.error('Error fetching solutions:', error);
        throw error;
    }
}

async function getComments(problemId) {
    try {
        const response = await makeAuthRequest(`${API_ENDPOINT}/comments/problem/${problemId}`);
        return response;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

export {
    fetchProblems,
    createProblem,
    voteProblem,
    submitSolution,
    submitComment,
    getSolutions,
    getComments,
    API_ENDPOINT
};
