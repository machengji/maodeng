export interface Task {
  id: string;
  title: string;
  time: string;
  coins: number;
  urgent: boolean;
  claimed: boolean;
  claimedBy?: string;
  completed: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Rating {
  id: string;
  taskTitle: string;
  taskId?: string;
  date: string;
  speed: number;
  quality: number;
  attitude: number;
  ratedBy: string;
  createdAt?: Date;
}

export interface ChoreRecord {
  id: string;
  person: string;
  task: string;
  duration: number;
  date: string;
  category: string;
  createdAt?: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  coins: number;
  partnerId?: string;
}
