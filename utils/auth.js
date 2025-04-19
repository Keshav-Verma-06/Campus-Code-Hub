// async function loginUser(credentials) {
//     try {
//         const response = await fetch(`${API_ENDPOINT}/auth/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(credentials),
//         });
        
//         if (!response.ok) {
//             throw new Error('Login failed');
//         }
        
//         const userData = await response.json();
//         localStorage.setItem('user', JSON.stringify(userData));
//         return userData;
//     } catch (error) {
//         console.error('Login error:', error);
//         throw error;
//     }
// }

// async function registerUser(userData) {
//     try {
//         const response = await fetch(`${API_ENDPOINT}/auth/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData),
//         });
        
//         if (!response.ok) {
//             throw new Error('Registration failed');
//         }
        
//         return await response.json();
//     } catch (error) {
//         console.error('Registration error:', error);
//         throw error;
//     }
// }

// function validateEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
// }

// function validatePassword(password) {
//     return password.length >= 8;
// }

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function loginUser(credentials) {
    try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === credentials.email);
        
        if (!user || user.password !== credentials.password) {
            throw new Error('Invalid email or password');
        }
        
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            points: user.points || 0,
            problemsSolved: user.problemsSolved || 0
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        return userData;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

async function registerUser(userData) {
    try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some(u => u.email === userData.email)) {
            throw new Error('Email already registered');
        }
        
        const newUser = {
            id: generateId(),
            ...userData,
            points: 0,
            problemsSolved: 0
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        return newUser;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function logoutUser() {
    localStorage.removeItem('currentUser');
}
