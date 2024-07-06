import { User } from "../../types/user";
import sleepLocalStorage, { DELAY_KEY_LS } from "./sleepLS";

export async function getAllUsers({ filter = "" }: { filter: string }) {
  await sleepLocalStorage(DELAY_KEY_LS);

  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

  if (!filter) return users;

  const lowercaseFilter = filter.toLowerCase();
  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(lowercaseFilter),
  );

  return filteredUsers;
}

export async function createUser({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  await sleepLocalStorage(DELAY_KEY_LS);

  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) throw new Error("User already exists");

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
  };

  localStorage.setItem("users", JSON.stringify([...users, newUser]));

  return newUser;
}

export async function deleteUser({ userId }: { userId: string }) {
  await sleepLocalStorage(DELAY_KEY_LS);

  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

  const userToDelete = users.find((user) => user.id === userId);
  if (!userToDelete) throw new Error("User not found");

  console.log("delete user: " + userId);

  const filteredUsers = users.filter((user) => user.id !== userToDelete?.id);

  localStorage.setItem("users", JSON.stringify(filteredUsers));

  return userToDelete;
}

export async function updateUser({
  userId,
  name,
  email,
}: {
  userId: string;
  name: string;
  email: string;
}) {
  await sleepLocalStorage(DELAY_KEY_LS);

  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

  const userToUpdate = users.find((user) => user.id === userId);
  if (!userToUpdate) throw new Error("User not found");

  const updatedUser = {
    ...userToUpdate,
    name,
    email,
  };

  const updatedUsers = users.map((user) => {
    if (user.id === userId) {
      return updatedUser;
    }

    return user;
  });

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  return updatedUser;
}
