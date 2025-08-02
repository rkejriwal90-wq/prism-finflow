import React, { useState } from 'react';
import { 
  ChevronDown, ChevronUp, ChevronRight, Search, Bell, User, Menu, X, Eye, EyeOff, 
  AlertCircle, Loader2, Check, Home, Briefcase, Clock, FileText, Users, 
  MessageSquare, Settings, DollarSign, TrendingUp, Calendar, MoreVertical, 
  Plus, Filter, Download, CheckCircle, XCircle, AlertTriangle, RefreshCw, 
  ExternalLink, Copy, Archive, Trash2, Edit2, Save, Lock, Unlock, Upload, 
  FolderPlus, Paperclip, Send, Bot, Pin, Hash, Globe, Play, Pause, Square, 
  Timer, Star, Mail, Phone, Building, Activity, BarChart3, FileSearch, 
  Brain, Zap, ArrowUp, ArrowDown, CreditCard, ArrowRight, Link, 
  FileIcon, Users2, DollarSign as PayrollIcon
} from 'lucide-react';

// Import your other components
import DealRoom from './deals/room/DealRoom';
import EngagementView from './deals/engagement/EngagementView';
import FileManager from './files/FileManager';
import PayrollDashboard from './payroll/PayrollDashboard';

// Brand Colors and Theme
const colors = {
  oceanBlue: '#0E7490',
  coral: '#FF8C69',
  teal: '#0891B2',
  white: '#F8FAFC',
  gray: {
    900: '#0F172A',
    800: '#1E293B',
    700: '#334155',
    600: '#475569',
    500: '#64748B',
    400: '#94A3B8',
    300: '#CBD5E1',
    200: '#E2E8F0',
    100: '#F1F5F9',
    50: '#F9FAFB'
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
};

// Utility function for conditional classes
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Base Components
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200', className)}>
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant])}>
      {children}
    </span>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.FC<{ className?: string }>;
  trend?: 'up' | 'down';
}

function StatsCard({ title, value, change, icon: Icon, trend }: StatsCardProps) {
  const isPositive = trend === 'up';
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                'text-sm ml-1',
                isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {change}%
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.oceanBlue}20` }}>
            <span style={{ color: colors.oceanBlue }}><Icon className="h-6 w-6" /></span>
          </div>
        )}
      </div>
    </Card>
  );
}

// Navigation Component
interface NavItemProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors w-full text-left',
        isActive 
          ? 'bg-cyan-700 text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}

// Main App Component with Navigation
export function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'deals', label: 'Deal Room', icon: Briefcase },
    { id: 'engagements', label: 'Engagements', icon: Users2 },
    { id: 'files', label: 'File Manager', icon: FileIcon },
    { id: 'payroll', label: 'Payroll', icon: PayrollIcon },
  ];

    const renderContent = () => {
    switch (activeView) {
      case 'deals':
        return <DealRoom dealId="demo-deal" onBack={() => setActiveView('dashboard')} />;
      case 'engagements':
        return <EngagementView engagementId="demo-engagement" onBack={() => setActiveView('dashboard')} />;
      case 'files':
        return <FileManager />;
      case 'payroll':
        return <PayrollDashboard />;
      default:
        return (
          <>
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard 
                title="Total Revenue" 
                value="$125,000" 
                change={12.5} 
                icon={DollarSign} 
                trend="up" 
              />
              <StatsCard 
                title="Active Deals" 
                value="24" 
                change={3} 
                icon={Briefcase} 
                trend="up" 
              />
              <StatsCard 
                title="Hours Tracked" 
                value="1,234" 
                change={8.2} 
                icon={Clock} 
                trend="up" 
              />
              <StatsCard 
                title="Efficiency" 
                value="94%" 
                change={2.1} 
                icon={TrendingUp} 
                trend="up" 
              />
            </div>

            {/* Quick Actions */}
            <Card className="mb-6 p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveView('deals')}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Briefcase className="h-8 w-8 text-cyan-700 mb-2" />
                  <h3 className="font-medium">Deal Room</h3>
                  <p className="text-sm text-gray-600">Manage your deals</p>
                </button>
                <button 
                  onClick={() => setActiveView('engagements')}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Users2 className="h-8 w-8 text-cyan-700 mb-2" />
                  <h3 className="font-medium">Engagements</h3>
                  <p className="text-sm text-gray-600">View engagements</p>
                </button>
                <button 
                  onClick={() => setActiveView('files')}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <FileIcon className="h-8 w-8 text-cyan-700 mb-2" />
                  <h3 className="font-medium">Files</h3>
                  <p className="text-sm text-gray-600">Manage documents</p>
                </button>
                <button 
                  onClick={() => setActiveView('payroll')}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <PayrollIcon className="h-8 w-8 text-cyan-700 mb-2" />
                  <h3 className="font-medium">Payroll</h3>
                  <p className="text-sm text-gray-600">Payroll dashboard</p>
                </button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h2>
              <p className="text-gray-600 mb-4">
                Manage your financial workflows, track deals, and monitor performance all in one place.
              </p>
              <div className="flex gap-4">
                <Badge variant="success">System Online</Badge>
                <Badge variant="default">Version 1.0.0</Badge>
              </div>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300',
        isSidebarOpen ? 'w-64' : 'w-16'
      )}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className={cn(
              'font-bold text-xl text-gray-900 transition-opacity',
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            )}>
              Prism FinFlow
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={isSidebarOpen ? item.label : ''}
                isActive={activeView === item.id}
                onClick={() => setActiveView(item.id)}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {navigationItems.find(item => item.id === activeView)?.label || 'Dashboard'}
            </h1>
            <p className="text-gray-600 mt-1">Financial Flow Management System</p>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
}


