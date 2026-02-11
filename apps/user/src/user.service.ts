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

  getUsersBasic(): User[] {
    return this.users;
  }

  getUserBasic(id: number): User | null {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }
}
