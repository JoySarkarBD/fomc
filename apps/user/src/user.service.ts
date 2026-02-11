import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUser(id: number): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    return user;
  }

  async createUser(data: { name: string; email: string }): Promise<User> {
    const nextId =
      this.users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
    const newUser: User = { id: nextId, ...data };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(
    id: number,
    data: { name: string; email: string },
  ): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    const updatedUser: User = { ...this.users[index], ...data };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  async deleteUser(id: number): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser ?? null;
  }
}
