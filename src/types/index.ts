export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface Task {
  id: string;
  order: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed';
  updatedAt: Date;
  assignedTo: string;
  details: string;
}

export interface Notification {
  id: string;
  order: string;
  type: string;
  sender: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isFavorite: boolean;
}
