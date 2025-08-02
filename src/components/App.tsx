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
  FileIcon, Users2, DollarSign as PayrollIcon, LogOut, HelpCircle,
  PieChart, LayoutDashboard, FolderOpen, Receipt, UserCheck
} from 'lucide-react';

// Import your other components
import DealRoom from './deals/room/DealRoom';
import EngagementView from './deals/engagement/EngagementView';
import FileManager from './files/FileManager';
import PayrollDashboard from './payroll/PayrollDashboard';

// Custom Prism Icon Component - Brand Accurate
const PrismIcon = ({ className = "w-10 h-10", variant = "default" }) => {
  const isWhite = variant === "white";
  const oceanColor = isWhite ? "white" : "#0E7490";
  const coralColor = isWhite ? "white" : "#FF8C69";
  
  return (
    <svg className={className} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M 12 18 Q 22 12 32 18 T 52 18 T 72 18" 
        stroke={oceanColor} 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round" 
      />
      <path 
        d="M 16 36 Q 26 30 36 36 T 56 36" 
        stroke={oceanColor} 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round" 
      />
      <path 
        d="M 24 54 Q 30 50 36 54 T 48 54" 
        stroke={coralColor} 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

// Brand Colors - From Prism FS Brand Guide
const colors = {
  oceanBlue: '#0E7490',  // Primary Ocean Blue
  prismTeal: '#0891B2',  // Prism Teal (for dark backgrounds)
  coral: '#FF8C69',      // Prism Coral
  white: '#F8FAFC',      // Cool White
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

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

function Card({ children, className = '' }) {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200', className)}>
      {children}
    </div>
  );
}

function Badge({ children, variant = 'default' }) {
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

function StatsCard({ title, value, change, icon: Icon, trend }) {
  const isPositive = trend === 'up';
  
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
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
            <Icon className="h-6 w-6" style={{ color: colors.oceanBlue }} />
          </div>
        )}
      </div>
    </Card>
  );
}

function NavItem({ icon: Icon, label, isActive, onClick, badge = null, isCollapsed }) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={cn(
          'flex items-center justify-between w-full rounded-lg transition-all duration-200',
          isActive 
            ? 'bg-oceanBlue text-white shadow-md' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
          isCollapsed ? 'p-3' : 'px-4 py-2.5'
        )}
        style={isActive ? { backgroundColor: colors.oceanBlue } : {}}
      >
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center w-full" : "space-x-3"
        )}>
          <Icon className={cn("h-5 w-5", isActive && "text-white")} />
          {!isCollapsed && <span className="font-medium">{label}</span>}
        </div>
        {!isCollapsed && badge && (
          <span className={cn(
            "px-2 py-0.5 text-xs rounded-full",
            isActive ? "bg-oceanBlue-800 text-white" : "bg-coral text-white"
          )}
          style={!isActive ? { backgroundColor: colors.coral } : {}}>
            {badge}
          </span>
        )}
        {isCollapsed && badge && (
          <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.coral }}>
            {badge}
          </span>
        )}
      </button>
      
      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
          {label}
          {badge && <span className="ml-2" style={{ color: colors.coral }}>({badge})</span>}
        </div>
      )}
    </div>
  );
}

export function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'deals', label: 'Deal Room', icon: Briefcase, badge: '3' },
    { id: 'engagements', label: 'Engagements', icon: Users2, badge: '12' },
    { id: 'files', label: 'File Manager', icon: FolderOpen },
    { id: 'payroll', label: 'Payroll', icon: Receipt },
  ];

  const secondaryNavItems = [
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'team', label: 'Team', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
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
      case 'analytics':
        return (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
            <p className="text-gray-600">Analytics features coming soon...</p>
          </Card>
        );
      case 'team':
        return (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Team Management</h2>
            <p className="text-gray-600">Team management features coming soon...</p>
          </Card>
        );
      case 'settings':
        return (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </Card>
        );
      default:
        return (
          <>
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

            <Card className="mb-6 p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mainNavItems.slice(1).map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-oceanBlue hover:bg-gray-50 transition-all text-left group"
                  >
                    <item.icon className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" 
                                style={{ color: colors.oceanBlue }} />
                    <h3 className="font-medium">{item.label}</h3>
                    <p className="text-sm text-gray-600">
                      {item.id === 'deals' && 'Manage your deals'}
                      {item.id === 'engagements' && 'View engagements'}
                      {item.id === 'files' && 'Manage documents'}
                      {item.id === 'payroll' && 'Payroll dashboard'}
                    </p>
                    {item.badge && (
                      <span className="mt-2 inline-block px-2 py-1 text-xs text-white rounded-full"
                            style={{ backgroundColor: colors.coral }}>
                        {item.badge} new
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Deal #1234 completed</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New document uploaded</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Engagement review pending</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Welcome to Prism FS</h2>
                <p className="text-gray-600 mb-4">
                  Your comprehensive financial solutions partner. Track deals, manage engagements, and monitor performance all in one place.
                </p>
                <div className="flex gap-4">
                  <Badge variant="success">System Online</Badge>
                  <Badge variant="info">Version 1.0.0</Badge>
                  <Badge variant="warning">3 Updates</Badge>
                </div>
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Enhanced Sidebar with Collapsed Icons */}
      <div className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300 shadow-lg flex flex-col',
        isSidebarOpen ? 'w-72' : 'w-20'
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className={cn(
            "flex items-center",
            isSidebarOpen ? "justify-between" : "justify-center"
          )}>
            <div className={cn(
              'flex items-center',
              isSidebarOpen ? 'space-x-3' : 'justify-center'
            )}>
              <PrismIcon className="w-10 h-10 flex-shrink-0" />
              {isSidebarOpen && (
                <div>
                  <div className="flex items-baseline">
                    <h1 className="font-serif font-semibold text-xl text-oceanBlue">Prism</h1>
                    <span className="font-sans font-normal text-xl text-coral ml-1">FS</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Financial Solutions</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "p-2 rounded-lg hover:bg-gray-100 transition-colors",
                !isSidebarOpen && "mt-2"
              )}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Search Bar */}
          {isSidebarOpen && (
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Main Navigation */}
            <div>
              {isSidebarOpen && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Main Menu
                </p>
              )}
              <nav className="space-y-1">
                {mainNavItems.map(item => (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeView === item.id}
                    onClick={() => setActiveView(item.id)}
                    badge={item.badge}
                    isCollapsed={!isSidebarOpen}
                  />
                ))}
              </nav>
            </div>

            {/* Secondary Navigation */}
            <div>
              {isSidebarOpen && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Other
                </p>
              )}
              <nav className="space-y-1">
                {secondaryNavItems.map(item => (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeView === item.id}
                    onClick={() => setActiveView(item.id)}
                    isCollapsed={!isSidebarOpen}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className={cn(
            'flex items-center',
            isSidebarOpen ? 'space-x-3' : 'justify-center'
          )}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                 style={{ backgroundColor: colors.coral }}>
              <User className="h-5 w-5 text-white" />
            </div>
            {isSidebarOpen && (
              <>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@prismfs.com</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <LogOut className="h-4 w-4 text-gray-500" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.oceanBlue }}>
                {mainNavItems.find(item => item.id === activeView)?.label || 
                 secondaryNavItems.find(item => item.id === activeView)?.label || 
                 'Dashboard'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}