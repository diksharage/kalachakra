import { calculateAgeGroup } from '../utils/ageUtils';

// Helper to get users from localStorage
const getUsers = () => {
  const users = localStorage.getItem('kalachakra_users_db');
  return users ? JSON.parse(users) : {};
};

// Helper to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('kalachakra_users_db', JSON.stringify(users));
};

export const authService = {
  login: async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getUsers();
    const user = users[email.toLowerCase()];

    if (!user) {
      throw new Error("Account not found. Please sign up.");
    }

    if (user.password !== password) {
      throw new Error("Invalid password.");
    }

    // Update lastLogin
    user.lastLogin = new Date().toISOString();
    saveUsers(users);

    // Return safe user object (without password)
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  signup: async (userData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsers();
    const emailKey = userData.email.toLowerCase();

    if (users[emailKey]) {
      throw new Error("An account with this email already exists.");
    }

    const ageNum = parseInt(userData.age, 10);
    const ageGroup = calculateAgeGroup(ageNum);
    const now = new Date().toISOString();

    const newUser = {
      id: 'user_' + Date.now().toString(),
      name: userData.name,
      email: emailKey,
      password: userData.password, // In a real app, NEVER store plaintext. 
      age: ageNum,
      ageGroup: ageGroup,
      createdAt: now,
      lastLogin: now,
    };

    users[emailKey] = newUser;
    saveUsers(users);

    const { password: _, ...safeUser } = newUser;
    return safeUser;
  }
};
