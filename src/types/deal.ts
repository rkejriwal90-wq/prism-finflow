export interface Deal {
  id: string;
  dealNumber: string;
  title: string;
  clientId: string;
  clientName: string;
  type: 'QS' | 'Model' | 'QOE' | 'AM';
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  progress: {
    stage: 'analyst' | 'reviewer' | 'sent' | 'complete';
    percentage: number;
  };
  value: number;
  margin: number;
  dueDate: Date;
  pmId: string;
  faId?: string;
  reviewerId?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface DealFilters {
  status?: Deal['status'];
  type?: Deal['type'];
  pmId?: string;
  clientId?: string;
  priority?: Deal['priority'];
  riskLevel?: Deal['riskLevel'];
  dateRange?: {
    start: Date;
    end: Date;
  };
}
