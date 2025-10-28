// Authentication utilities for Twig/PHP version
// Uses localStorage for session management

const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';

function getSession() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return null;
  try {
    return JSON.parse(sessionData);
  } catch {
    return null;
  }
}

function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getUsers() {
  const usersData = localStorage.getItem(USERS_KEY);
  if (!usersData) return [];
  try {
    return JSON.parse(usersData);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function registerUser(email, password, name) {
  const users = getUsers();
  
  if (users.find(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password,
    name,
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const session = {
    user: {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    },
    token: crypto.randomUUID(),
  };

  setSession(session);
  return session;
}

function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = '?page=login';
    return false;
  }
  return true;
}
