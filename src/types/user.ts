export interface User {
  id: string;
  name: string;
  email: string;
  role: 'pm' | 'fa' | 'reviewer' | 'admin' | 'owner' | 'client';
  avatar?: string;
  company?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  phone?: string;
  timezone?: string;
  language?: string;
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}
