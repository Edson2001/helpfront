// src/types/types.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "CLOSED";
  priority: string;
  slaDeadline: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  assignedToId: string | null;
  comments: any[];
  assignedTo: User | null;
  createdBy: User;
}
