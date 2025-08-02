import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Users, FileText, MessageSquare, Mail, Link, 
  Edit, MoreVertical, Plus, Clock, AlertCircle, CheckCircle,
  Calendar, DollarSign, Download, Eye, Lock, Unlock
} from 'lucide-react';
import { Deal, Engagement, Task, FileItem, Message } from '@/types';

interface DealRoomProps {
  dealId: string;
  onBack: () => void;
}

export function DealRoom({ dealId, onBack }: DealRoomProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading deal data
    setTimeout(() => {
      setDeal({
        id: dealId,
        dealNumber: 'D-2024-001',
        title: 'Q4 Financial Analysis - Acme Corp',
        client: {
          id: 'client-1',
          company: { id: 'comp-1', name: 'Acme Corp', type: 'client' },
          clientCode: 'ACME',
          userLimit: 4,
          creditLimit: 100000,
          creditStatus: 'good',
          assignedPM: {
            id: 'pm-1',
            firstName: 'John',
            lastName: 'Smith',
            email: 'john@example.com',
            role: 'pm',
            permissions: {
              canViewFinancials: false,
              canEditRates: false,
              canOverrideFiles: false,
              canStartClientThreads: true
            }
          }
        },
        pmId: 'pm-1',
        status: 'active',
        priority: 'high',
        totalValue: 45000,
        engagements: [
          {
              id: 'eng-1',
              dealId: dealId,
              type: 'QS',
              progress: 'final_reviewer',
              status: 'active',
              freeHours: 2,
              freeTurns: 2,
              hoursUsed: 1.5,
              clientTurnsUsed: 1,
              reviewerTurnsUsed: 0,
              isRecurring: false,
              pricingType: 'fixed',
              fixedFee: 5000,
              deadlines: {           // Add this section
                fa: new Date('2024-01-15'),
                reviewer: new Date('2024-01-20'),
                client: new Date('2024-01-25')
          },
          }
        ],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      });
      setLoading(false);
    }, 500);
  }, [dealId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!deal) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'internal', label: 'Internal', icon: Users },
    { id: 'client', label: 'Client', icon: MessageSquare },
    { id: 'int-files', label: 'Int Files', icon: FileText },
    { id: 'client-files', label: 'Client Files', icon: FileText },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'engagements', label: 'Engagements', icon: Link }
  ];

  return (
    <div className="h-full flex flex-col">
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
                {deal.dealNumber} - {deal.title}
              </h1>
              <p className="text-sm text-gray-500">
                Client: {deal.client.company.name} | PM: {deal.client.assignedPM.firstName} {deal.client.assignedPM.lastName} | Status: {deal.status}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <Edit className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-3 px-1 border-b-2 text-sm font-medium
                  ${activeTab === tab.id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'}
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && <DealOverview deal={deal} />}
        {activeTab === 'internal' && <InternalChat dealId={deal.id} />}
        {activeTab === 'client' && <ClientChat dealId={deal.id} />}
        {activeTab === 'int-files' && <FileManager dealId={deal.id} type="internal" />}
        {activeTab === 'client-files' && <FileManager dealId={deal.id} type="client" />}
        {activeTab === 'email' && <EmailView dealId={deal.id} />}
        {activeTab === 'engagements' && <EngagementsList engagements={deal.engagements} />}
      </div>
    </div>
  );
}

function DealOverview({ deal }: { deal: Deal }) {
  return (
    <div className="space-y-6">
      {/* Deal Information */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Deal Information</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Title</p>
            <p className="font-medium">{deal.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-medium">{deal.client.company.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Deal Value</p>
            <p className="font-medium">${deal.totalValue?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-medium">{new Date(deal.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Team Assignments */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Team Assignments</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">Manage Team</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-gray-500">Project Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Engagements */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Active Engagements</h3>
          <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Engagement
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {deal.engagements.map((eng) => (
            <div key={eng.id} className="border rounded-lg p-4">
              <h4 className="font-medium">Quick Screen</h4>
              <div className="mt-2 space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-sm text-gray-600">Status: {eng.progress.replace(/_/g, ' ')}</p>
                <p className="text-sm text-gray-600">Due: 2 days</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InternalChat({ dealId }: { dealId: string }) {
  const [message, setMessage] = useState('');
  
  return (
    <div className="h-full flex flex-col bg-white rounded-lg border">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Sample messages */}
        <div className="flex items-start space-x-3">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <p className="font-medium text-sm">Sarah Chen</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              Quick Screen is complete and ready for client delivery.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function ClientChat({ dealId }: { dealId: string }) {
  return (
    <div className="h-full flex items-center justify-center text-gray-500">
      <p>Client chat functionality coming soon...</p>
    </div>
  );
}

function FileManager({ dealId, type }: { dealId: string; type: 'internal' | 'client' }) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{type === 'internal' ? 'Internal' : 'Client'} Files</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            Upload
          </button>
          <button className="px-3 py-1.5 border text-sm rounded-md hover:bg-gray-50">
            New Folder
          </button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Type</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Size</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Modified</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">Financial_Model_v3.xlsx</td>
              <td className="px-4 py-3 text-sm">Excel</td>
              <td className="px-4 py-3 text-sm">2.3 MB</td>
              <td className="px-4 py-3 text-sm">2 hours ago</td>
              <td className="px-4 py-3 text-sm">
                <Lock className="h-4 w-4 text-gray-400" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmailView({ dealId }: { dealId: string }) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-medium mb-4">Email History</h3>
      <p className="text-gray-500">Email integration coming soon...</p>
    </div>
  );
}

function EngagementsList({ engagements }: { engagements: Engagement[] }) {
  return (
    <div className="space-y-4">
      {engagements.map((eng) => (
        <div key={eng.id} className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Quick Screen</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View Details</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Progress</p>
              <p className="font-medium">{eng.progress.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hours Used</p>
              <p className="font-medium">{eng.hoursUsed} / {eng.freeHours}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Client Turns</p>
              <p className="font-medium">{eng.clientTurnsUsed} / {eng.freeTurns}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pricing</p>
              <p className="font-medium">${eng.fixedFee?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DealRoom;
