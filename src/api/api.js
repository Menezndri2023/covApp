const API_URL = 'http://localhost:5000'; // ou ton IP si tu testes sur mobile

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const fetchProfile = async (token) => {
  const res = await fetch(`${API_URL}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
