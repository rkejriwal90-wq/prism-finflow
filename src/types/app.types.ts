// Type definitions for Prism FinFlow

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export type UserRole = 
  | 'owner' 
  | 'admin' 
  | 'pm' 
  | 'reviewer' 
  | 'fa' 
  | 'vendor' 
  | 'client_owner' 
  | 'client_manager' 
  | 'client_analyst';

export interface DashboardViewProps {
  userRole: UserRole;
}

export interface DashboardLayoutProps {
  userRole: UserRole;
  currentView: string;
  setCurrentView: (view: string) => void;
}

export interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}
