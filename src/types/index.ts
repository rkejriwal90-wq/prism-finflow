// User Types
export interface User {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'pm' | 'reviewer' | 'fa' | 'vendor' | 'client_owner' | 'client_manager' | 'client_analyst';
  firstName: string;
  lastName: string;
  company?: Company;
  permissions: Permissions;
  vendorStatus?: 'invited' | 'pending_docs' | 'onboarding' | 'active' | 'suspended';
}

export interface Permissions {
  canViewFinancials: boolean;
  canEditRates: boolean;
  canOverrideFiles: boolean;
  canStartClientThreads: boolean;
}

// Company Types
export interface Company {
  id: string;
  name: string;
  type: 'internal' | 'client';
  logo?: string;
}

// Client Types  
export interface Client {
  id: string;
  company: Company;
  clientCode: string;
  userLimit: number;
  assignedPM: User;
  creditLimit: number;
  creditStatus: 'good' | 'warning' | 'hold' | 'red_alert';
}

// Deal Types
export interface Deal {
  id: string;
  dealNumber: string; // D-2024-001
  title: string;
  description?: string;
  client: Client;
  pmId: string;
  status: 'active' | 'on_hold' | 'complete' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  totalValue?: number;
  engagements: Engagement[];
  createdAt: Date;
  updatedAt: Date;
}

// Engagement Types
export interface Engagement {
  id: string;
  dealId: string;
  type: EngagementType;
  progress: EngagementProgress;
  status: 'active' | 'paused' | 'complete' | 'cancelled';
  faId?: string;
  reviewerId?: string;
  pricingType: 'fixed' | 'hourly' | 'hybrid';
  fixedFee?: number;
  hourlyRate?: number;
  freeHours: number;
  freeTurns: number;
  hoursUsed: number;
  clientTurnsUsed: number;
  reviewerTurnsUsed: number;
  deadlines: {
    fa?: Date;
    reviewer?: Date;
    client?: Date;
  };
  isRecurring: boolean;
  recurringConfig?: RecurringConfig;
}

export type EngagementType = 'QS' | 'MODEL' | 'QOE' | 'SBA' | 'AM' | 'BP';

export type EngagementProgress = 
  | 'document_intake'
  | 'financial_analyst' 
  | 'final_reviewer'
  | 'analyst_re_turn'
  | 'client_re_turn'
  | 'sent_to_client'
  | 'revised_sent_to_client';

export interface RecurringConfig {
  frequency: 'monthly' | 'quarterly' | 'annual';
  endType: 'never' | 'after_x' | 'on_date';
  endAfter?: number;
  endDate?: Date;
}

// File Types
export interface FileItem {
  id: string;
  originalName: string;
  displayName: string;
  aiSuggestedName?: string;
  folderPath: string;
  mimeType: string;
  size: number;
  version: number;
  isLocked: boolean;
  lockedBy?: string;
  includeInAI: boolean;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export interface Task {
  id: string;
  engagementId: string;
  title: string;
  description?: string;
  assignedTo?: string;
  dueDate?: Date;
  status: 'pending' | 'in_progress' | 'review' | 'complete' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  estimatedHours?: number;
  actualHours?: number;
}

// Time Entry Types
export interface TimeEntry {
  id: string;
  userId: string;
  engagementId: string;
  taskId?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  billableToClient: boolean;
  activityType: 'analysis' | 'client_meeting' | 'internal_meeting' | 'documentation' | 'review' | 'research' | 'travel' | 'admin';
  description?: string;
  vendorRate: number;
  clientRate?: number;
  payrollStatus: 'pending' | 'approved' | 'processing' | 'paid';
}

// Vendor Types
export interface Vendor extends User {
  hourlyRates: VendorRate[];
  specialties: string[];
  completedProjects: number;
  onboardingComplete: boolean;
  documents: VendorDocument[];
  wiseRecipientId?: string;
  quickbooksVendorId?: string;
}

export interface VendorRate {
  clientId?: string;
  engagementType?: EngagementType;
  rate: number;
  effectiveDate: Date;
  endDate?: Date;
}

export interface VendorDocument {
  type: 'w9' | 'vendor_agreement' | 'nda' | 'background_check';
  fileId: string;
  verified: boolean;
  validUntil?: Date;
}

// Billing Types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  amount: number;
  status: 'draft' | 'sent' | 'viewed' | 'partial' | 'paid' | 'overdue';
  dueDate: Date;
  lineItems: InvoiceLineItem[];
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  type: 'engagement_fee' | 'hourly_overage' | 'turn_overage' | 'rush_fee';
}

// Chat Types
export interface ChatRoom {
  id: string;
  type: 'client' | 'sub_client' | 'deal' | 'internal';
  participants: string[];
  messages: Message[];
  aiSummaryEnabled: boolean;
  lastAiSummary?: Date;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  attachments?: FileItem[];
  createdAt: Date;
  editedAt?: Date;
  parentMessageId?: string;
}

// Analytics Types
export interface DashboardMetrics {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  deals: {
    active: number;
    won: number;
    lost: number;
  };
  utilization: {
    current: number;
    target: number;
  };
  performance: {
    onTime: number;
    quality: number;
    revisions: number;
  };
}
