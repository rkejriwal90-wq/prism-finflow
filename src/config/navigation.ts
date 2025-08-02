// src/config/navigation.ts
import {
  Home,
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  Settings,
  DollarSign,
  BarChart3,
  Building,
  FolderOpen,
  UserCheck,
  Shield,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  CreditCard,
  Bell,
  User,
  Building2,
  Receipt
} from 'lucide-react';

export type UserRole = 'pm' | 'fa' | 'reviewer' | 'admin' | 'client' | 'owner';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: any;
  roles: UserRole[];
  badge?: number;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['pm', 'fa', 'reviewer', 'admin', 'client', 'owner'],
    children: [
      {
        id: 'dashboard-pm',
        label: 'PM Dashboard',
        href: '/dashboard/pm',
        icon: UserCheck,
        roles: ['pm', 'admin', 'owner']
      },
      {
        id: 'dashboard-fa',
        label: 'FA Dashboard',
        href: '/dashboard/fa',
        icon: TrendingUp,
        roles: ['fa', 'admin', 'owner']
      },
      {
        id: 'dashboard-reviewer',
        label: 'Reviewer Dashboard',
        href: '/dashboard/reviewer',
        icon: CheckCircle,
        roles: ['reviewer', 'admin', 'owner']
      },
      {
        id: 'dashboard-admin',
        label: 'Admin Dashboard',
        href: '/dashboard/admin',
        icon: Shield,
        roles: ['admin', 'owner']
      },
      {
        id: 'dashboard-client',
        label: 'Client Portal',
        href: '/dashboard/client',
        icon: Building,
        roles: ['client']
      }
    ]
  },
  {
    id: 'deals',
    label: 'Deals',
    href: '/deals',
    icon: Briefcase,
    roles: ['pm', 'fa', 'reviewer', 'admin', 'owner'],
    badge: 3,
    children: [
      {
        id: 'deals-all',
        label: 'All Deals',
        href: '/deals',
        icon: Briefcase,
        roles: ['pm', 'fa', 'reviewer', 'admin', 'owner']
      },
      {
        id: 'deals-my',
        label: 'My Deals',
        href: '/deals?filter=my',
        icon: User,
        roles: ['pm', 'fa', 'reviewer']
      },
      {
        id: 'deals-at-risk',
        label: 'At Risk',
        href: '/deals?filter=at-risk',
        icon: AlertCircle,
        roles: ['pm', 'admin', 'owner'],
        badge: 2
      },
      {
        id: 'deals-create',
        label: 'Create Deal',
        href: '/deals/create',
        icon: Clock,
        roles: ['pm', 'admin']
      }
    ]
  },
  {
    id: 'clients',
    label: 'Clients',
    href: '/clients',
    icon: Building2,
    roles: ['pm', 'admin', 'owner'],
    children: [
      {
        id: 'clients-all',
        label: 'All Clients',
        href: '/clients',
        icon: Building2,
        roles: ['pm', 'admin', 'owner']
      },
      {
        id: 'clients-active',
        label: 'Active Clients',
        href: '/clients?filter=active',
        icon: CheckCircle,
        roles: ['pm', 'admin', 'owner']
      },
      {
        id: 'clients-create',
        label: 'Add Client',
        href: '/clients/create',
        icon: Building2,
        roles: ['admin', 'owner']
      }
    ]
  },
  {
    id: 'chat',
    label: 'Messages',
    href: '/chat',
    icon: MessageSquare,
    roles: ['pm', 'fa', 'reviewer', 'admin', 'owner', 'client'],
    badge: 5
  },
  {
    id: 'files',
    label: 'Files',
    href: '/files',
    icon: FolderOpen,
    roles: ['pm', 'fa', 'reviewer', 'admin', 'owner', 'client'],
    children: [
      {
        id: 'files-all',
        label: 'All Files',
        href: '/files',
        icon: FolderOpen,
        roles: ['pm', 'fa', 'reviewer', 'admin', 'owner']
      },
      {
        id: 'files-recent',
        label: 'Recent',
        href: '/files?filter=recent',
        icon: Clock,
        roles: ['pm', 'fa', 'reviewer', 'admin', 'owner', 'client']
      },
      {
        id: 'files-shared',
        label: 'Shared with Me',
        href: '/files?filter=shared',
        icon: Users,
        roles: ['pm', 'fa', 'reviewer', 'client']
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['pm', 'admin', 'owner'],
    children: [
      {
        id: 'reports-dashboard',
        label: 'Reports Dashboard',
        href: '/reports',
        icon: BarChart3,
        roles: ['pm', 'admin', 'owner']
      },
      {
        id: 'reports-revenue',
        label: 'Revenue Report',
        href: '/reports/revenue',
        icon: DollarSign,
        roles: ['admin', 'owner']
      },
      {
        id: 'reports-performance',
        label: 'Performance',
        href: '/reports/performance',
        icon: TrendingUp,
        roles: ['pm', 'admin', 'owner']
      },
      {
        id: 'reports-create',
        label: 'Custom Report',
        href: '/reports/create',
        icon: FileText,
        roles: ['admin', 'owner']
      }
    ]
  },
  {
    id: 'users',
    label: 'Users',
    href: '/users',
    icon: Users,
    roles: ['admin', 'owner'],
    children: [
      {
        id: 'users-all',
        label: 'All Users',
        href: '/users',
        icon: Users,
        roles: ['admin', 'owner']
      },
      {
        id: 'users-teams',
        label: 'Teams',
        href: '/users/teams',
        icon: Users,
        roles: ['admin', 'owner']
      },
      {
        id: 'users-invite',
        label: 'Invite User',
        href: '/users/create',
        icon: UserCheck,
        roles: ['admin', 'owner']
      }
    ]
  },
  {
    id: 'billing',
    label: 'Billing',
    href: '/settings/billing',
    icon: CreditCard,
    roles: ['admin', 'owner', 'client'],
    children: [
      {
        id: 'billing-overview',
        label: 'Overview',
        href: '/settings/billing',
        icon: CreditCard,
        roles: ['admin', 'owner', 'client']
      },
      {
        id: 'billing-invoices',
        label: 'Invoices',
        href: '/settings/billing/invoices',
        icon: Receipt,
        roles: ['admin', 'owner', 'client']
      },
      {
        id: 'billing-payment',
        label: 'Payment Methods',
        href: '/settings/billing/payment',
        icon: CreditCard,
        roles: ['admin', 'owner', 'client']
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['pm', 'fa', 'reviewer', 'admin', 'owner', 'client'],
    children: [
      {
        id: 'settings-profile',
        label: 'Profile',
        href: '/settings/profile',
        icon: User,
        roles: ['pm', 'fa', 'reviewer', 'admin', 'owner', 'client']
      },
      {
        id: 'settings-company',
        label: 'Company',
        href: '/settings/company',
        icon: Building,
        roles: ['admin', 'owner']
      },
      {
        id: 'settings-notifications',
        label: 'Notifications',
        href: '/settings/notifications',
        icon: Bell,
        roles: ['pm', 'fa', 'reviewer', 'admin', 'owner', 'client']
      },
      {
        id: 'settings-calendar',
        label: 'Calendar Sync',
        href: '/settings/calendar',
        icon: Calendar,
        roles: ['pm', 'fa', 'reviewer', 'admin', 'owner']
      }
    ]
  }
];

// Helper function to get navigation items for a specific role
export function getNavigationForRole(role: UserRole): NavigationItem[] {
  return navigationItems
    .filter(item => item.roles.includes(role))
    .map(item => ({
      ...item,
      children: item.children?.filter(child => child.roles.includes(role))
    }));
}

// Helper function to get all accessible routes for a role
export function getAccessibleRoutes(role: UserRole): string[] {
  const routes: string[] = [];
  
  function extractRoutes(items: NavigationItem[]) {
    items.forEach(item => {
      if (item.roles.includes(role)) {
        routes.push(item.href);
        if (item.children) {
          extractRoutes(item.children);
        }
      }
    });
  }
  
  extractRoutes(navigationItems);
  return routes;
}
