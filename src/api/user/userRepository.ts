import type { User } from "@/api/user/userModel";

export const users: User[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    planId: "1",
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
  {
    id: "2",
    name: "Robert",
    email: "Robert@example.com",
    planId: "1",
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
];

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    return users;
  }

  async findByIdAsync(id: string): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  }
}
