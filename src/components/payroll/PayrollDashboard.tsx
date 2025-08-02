import React, { useState } from 'react';
import { 
  Calendar, DollarSign, Users, Clock, AlertCircle, CheckCircle, 
  Send, FileText, RefreshCw, Download, Edit2, Save, X
} from 'lucide-react';

export function PayrollDashboard() {
  const [currentStep, setCurrentStep] = useState<'review' | 'process' | 'complete'>('review');
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  
  const payrollData = {
    weekEnding: new Date('2024-02-03'),
    totalAmount: 45280,
    totalHours: 856.5,
    vendorCount: 23,
    entries: [
      {
        id: '1',
        vendor: { name: 'Mike Johnson', email: 'mike@example.com' },
        hoursWorked: 38.5,
        hourlyRate: 125,
        bonusAmount: 200,
        totalAmount: 5012.50,
        status: 'pending',
        hasWise: true,
        hasQuickbooks: true
      },
      {
        id: '2',
        vendor: { name: 'Sarah Chen', email: 'sarah@example.com' },
        hoursWorked: 42,
        hourlyRate: 200,
        bonusAmount: 0,
        totalAmount: 8400,
        status: 'pending',
        hasWise: true,
        hasQuickbooks: false
      }
    ]
  };

  const readyEntries = payrollData.entries.filter(e => e.hasWise && e.hasQuickbooks);
  const notReadyEntries = payrollData.entries.filter(e => !e.hasWise || !e.hasQuickbooks);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Payroll Processing</h1>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            Week Ending: {payrollData.weekEnding.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Week Ending</p>
              <p className="text-2xl font-bold">{payrollData.weekEnding.toLocaleDateString()}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Payroll</p>
              <p className="text-2xl font-bold">${payrollData.totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Hours</p>
              <p className="text-2xl font-bold">{payrollData.totalHours.toFixed(1)}</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Vendors</p>
              <p className="text-2xl font-bold">{payrollData.vendorCount}</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between">
          {['Review', 'Process', 'Complete'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  h-10 w-10 rounded-full flex items-center justify-center
                  ${index === 0 && currentStep === 'review' ? 'bg-blue-600 text-white' : ''}
                  ${index === 1 && currentStep === 'process' ? 'bg-blue-600 text-white' : ''}
                  ${index === 2 && currentStep === 'complete' ? 'bg-green-600 text-white' : ''}
                  ${(index === 0 && currentStep !== 'review') || 
                    (index === 1 && currentStep === 'complete') ? 'bg-green-600 text-white' : ''}
                  ${!((index === 0 && currentStep !== 'review') || 
                     (index === 1 && currentStep === 'complete') ||
                     (index === 2 && currentStep === 'complete') ||
                     (index === 0 && currentStep === 'review') ||
                     (index === 1 && currentStep === 'process')) ? 'bg-gray-200 text-gray-400' : ''}
                `}>
                  {((index === 0 && currentStep !== 'review') || 
                    (index === 1 && currentStep === 'complete')) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <p className="text-sm mt-2">{step}</p>
              </div>
              {index < 2 && (
                <div className={`h-1 w-32 mx-4 ${
                  (index === 0 && currentStep !== 'review') || 
                  (index === 1 && currentStep === 'complete') 
                    ? 'bg-green-600' 
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Warning for not ready entries */}
      {notReadyEntries.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">
                {notReadyEntries.length} vendors are not ready for payment
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                They need to be linked to Wise and QuickBooks before processing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ready Entries Table */}
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Ready for Processing ({readyEntries.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEntries(new Set(readyEntries.map(e => e.id)));
                      } else {
                        setSelectedEntries(new Set());
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Vendor</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Hours</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Rate</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Subtotal</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Bonus</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {readyEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedEntries.has(entry.id)}
                      onChange={(e) => {
                        const newSelection = new Set(selectedEntries);
                        if (e.target.checked) {
                          newSelection.add(entry.id);
                        } else {
                          newSelection.delete(entry.id);
                        }
                        setSelectedEntries(newSelection);
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{entry.vendor.name}</p>
                      <p className="text-sm text-gray-500">{entry.vendor.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">{entry.hoursWorked.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">${entry.hourlyRate.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    ${(entry.hoursWorked * entry.hourlyRate).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">${entry.bonusAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    ${entry.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep === 'review' && (
            <button
              onClick={() => setCurrentStep('process')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={selectedEntries.size === 0}
            >
              <Send className="h-4 w-4 mr-2" />
              Process Selected ({selectedEntries.size})
            </button>
          )}
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2 inline" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayrollDashboard;
