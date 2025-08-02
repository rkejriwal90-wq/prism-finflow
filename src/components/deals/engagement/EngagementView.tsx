import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Calendar, DollarSign, Users, AlertCircle, 
  CheckCircle, RefreshCw, FileText, Edit, MoreVertical
} from 'lucide-react';
import { Engagement } from '@/types';

interface EngagementViewProps {
  engagementId: string;
  onBack: () => void;
}

export function EngagementView({ engagementId, onBack }: EngagementViewProps) {
  const [engagement] = useState<Engagement>({
    id: engagementId,
    dealId: 'deal-1',
    type: 'QS',
    progress: 'financial_analyst',
    status: 'active',
    faId: 'fa-1',
    reviewerId: 'reviewer-1',
    pricingType: 'fixed',
    fixedFee: 5000,
    freeHours: 10,
    freeTurns: 5,
    hoursUsed: 6.5,
    clientTurnsUsed: 2,
    reviewerTurnsUsed: 1,
    deadlines: {
      fa: new Date('2024-02-01'),
      reviewer: new Date('2024-02-03'),
      client: new Date('2024-02-05')
    },
    isRecurring: false
  });

  const progressSteps = [
    { id: 'document_intake', label: 'Document Intake', completed: true },
    { id: 'financial_analyst', label: 'Financial Analyst', completed: true, current: true },
    { id: 'final_reviewer', label: 'Final Reviewer', completed: false },
    { id: 'sent_to_client', label: 'Sent to Client', completed: false },
    { id: 'complete', label: 'Complete', completed: false }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Quick Screen Engagement
              </h1>
              <p className="text-sm text-gray-500">
                Deal: D-2024-001 | Client: Acme Corp | Type: Quick Screen
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Complete Engagement
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Progress Timeline */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-medium mb-4">Progress Timeline</h3>
          <div className="flex items-center justify-between">
            {progressSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    h-10 w-10 rounded-full flex items-center justify-center
                    ${step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-400'}
                    ${step.current ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                  `}>
                    {step.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <p className="text-sm mt-2 text-center">{step.label}</p>
                </div>
                {index < progressSteps.length - 1 && (
                  <div className={`
                    h-1 w-20 mx-2
                    ${step.completed ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Timeline & Deadlines */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Timeline & Deadlines</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">FA Deadline</p>
                  <p className="font-medium">Feb 1, 2024</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">24 working hours</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Reviewer Deadline</p>
                  <p className="font-medium">Feb 3, 2024</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">24 hours after FA</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Client Deadline</p>
                  <p className="font-medium">Feb 5, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Turn Management */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Turn Management</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Client Turns</p>
                  <p className="text-sm font-medium">{engagement.clientTurnsUsed} of {engagement.freeTurns} used</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(engagement.clientTurnsUsed / engagement.freeTurns) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reviewer Turns (Internal)</p>
                <p className="text-sm">{engagement.reviewerTurnsUsed} returns to FA</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-500">Overage Charges</p>
                <p className="text-sm">0 turns @ $500 each = $0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Configuration */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Billing Configuration</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">Edit Rules</button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Pricing Type</p>
              <p className="font-medium">Fixed Fee</p>
              <p className="text-2xl font-semibold mt-1">${engagement.fixedFee?.toLocaleString()}</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Included</p>
                <ul className="text-sm space-y-1 mt-1">
                  <li>• {engagement.freeTurns} turns</li>
                  <li>• {engagement.freeHours} hours</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-500">Used</p>
                <ul className="text-sm space-y-1 mt-1">
                  <li>• {engagement.clientTurnsUsed} turns</li>
                  <li>• {engagement.hoursUsed} hours</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500">Overage Rates</p>
            <ul className="text-sm space-y-1 mt-1">
              <li>• Additional turns: $500 each</li>
              <li>• Additional hours: $200/hour</li>
            </ul>
            <p className="mt-2 font-medium">Current Overage Charges: $0</p>
          </div>
        </div>

        {/* Team & Assignments */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Team & Assignments</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">Reassign</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Mike Johnson</p>
                  <p className="text-sm text-gray-500">Financial Analyst</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">$125/hour</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Sarah Chen</p>
                  <p className="text-sm text-gray-500">Reviewer</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">$200/hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngagementView;
