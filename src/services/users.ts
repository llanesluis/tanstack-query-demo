import { BASE_URL } from '../config';

// API de prueba 07-auth... midudev

export async function getAllUsers() {
  const res = await fetch(`${BASE_URL}users`);
  if (!res.ok) throw new Error('Bad response');

  return res.json();
}

export async function getUserByUsername(username: string) {
  const res = await fetch(`${BASE_URL}users/${username}`);
  if (!res.ok) throw new Error('Bad response');

  return res.json();
}

export async function createUser(input: {
  username: string;
  email: string;
  password: string;
  role: string;
}) {
  const body = {
    username: input.username,
    email: input.email,
    password: input.password,
    role: input.role,
  };

  const res = await fetch(`${BASE_URL}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Bad response');

  return res.json();
}
