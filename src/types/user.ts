// src/types/index.ts

export interface IUser {
  id: string;
  name: string;
  email: string;
  fullName?: string;
  photo?: string;
  phone?: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  createdAt: string;
}
