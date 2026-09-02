import usersData from "../data/users.json";
import type { User } from "../types";

const users = usersData as User[];

export function getUsers() {
  return users;
}

export function findUser(identity: string) {
  return users.find(
    (user) => user.email === identity || user.phone === identity,
  );
}

export function validateLogin(identity: string, password: string) {
  if (password !== "123456") {
    return null;
  }

  return findUser(identity) ?? null;
}
