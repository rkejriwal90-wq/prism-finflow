import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

interface HomeProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'pm' | 'fa' | 'reviewer' | 'admin' | 'owner' | 'client';
    avatar?: string;
  };
}

const Home: NextPage<HomeProps> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case 'pm':
          router.push('/dashboard/pm');
          break;
        case 'fa':
          router.push('/dashboard/fa');
          break;
        case 'reviewer':
          router.push('/dashboard/reviewer');
          break;
        case 'admin':
        case 'owner':
          router.push('/dashboard/admin');
          break;
        case 'client':
          router.push('/dashboard/client');
          break;
        default:
          router.push('/dashboard');
      }
    } else {
      // If no user, redirect to login
      router.push('/login');
    }
  }, [user, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default Home;
