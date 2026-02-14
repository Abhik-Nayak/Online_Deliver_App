import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authStore';
import { Button } from '../components';
import { LogOut, MapPin, Clock, User } from 'lucide-react';
import toast from 'react-hot-toast';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container-main flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🚚</span>
            </div>
            <h1 className="text-xl font-bold">DeliveryApp</h1>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="container-main py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-heading-2 mb-2">Welcome, {user?.name}!</h2>
            <p className="text-lg text-white/90">
              Order your favorite meals from the best restaurants in your area
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Browse Restaurants</h3>
                <p className="text-sm text-gray-600">Find the best restaurants near you</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={24} className="text-secondary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Quick Delivery</h3>
                <p className="text-sm text-gray-600">Get food delivered in 30-45 minutes</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User size={24} className="text-success-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Great Deals</h3>
                <p className="text-sm text-gray-600">Enjoy exclusive discounts & offers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Restaurants */}
        <section className="mb-12">
          <h3 className="text-heading-3 mb-6">Featured Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="card overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 mb-4 rounded-lg" />
                <h4 className="font-semibold text-lg mb-2">Restaurant {item}</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Cuisines: Pizza, Burger, Desserts
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">4.5</span>
                  </div>
                  <span className="text-sm text-gray-600">30-40 mins</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Account Info */}
        {user && (
          <section className="mb-12">
            <h3 className="text-heading-3 mb-6">Account Information</h3>
            <div className="card max-w-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p className="font-semibold">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Role</p>
                  <p className="font-semibold capitalize">{user.role}</p>
                </div>
                {user.phone && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-semibold">{user.phone}</p>
                  </div>
                )}
              </div>
              <button className="mt-6 text-primary-600 font-semibold hover:text-primary-700">
                Edit Profile →
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DeliveryApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
