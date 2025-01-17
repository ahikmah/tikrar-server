import type { User } from "@/api/user/userModel";

export const users: User[] = [
  {
    id: "e5a03e0c-b6e2-4318-b688-a0c4373a5ae4",
    name: "Awaliyatul Hikmah",
    email: "imadlz15@gmail.com",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIwcFrWoislM17T9Yp9Kuh1_Zp5eEslvqNykzXBABuTbaJvc_d6vg=s96-c",
    planId: null,
    createdAt: new Date("2025-01-15T05:04:36.259Z"),
    updatedAt: null,
  },
  {
    id: "ab188782-3f97-40c3-bd68-30f7959196ba",
    name: "Hikmah",
    email: "hikmah@mail.com",
    avatar: null,
    planId: "17bec569-60a7-4291-a4ea-82309d96da3f",
    createdAt: new Date("2025-01-15T06:20:56.834Z"),
    updatedAt: null,
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
