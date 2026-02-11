
import React from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'resources', label: 'Ressources' },
    { id: 'ramadan', label: 'Ramadan' },
    { id: 'advice', label: 'Conseils' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">TSI<span className="text-blue-600">Hub</span></span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentPage === item.id ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          {/* Mobile simple dropdown could be here, but for simplicity we keep horizontal scrolling on mobile */}
          <div className="flex space-x-4 overflow-x-auto">
             {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-xs font-medium whitespace-nowrap ${
                    currentPage === item.id ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
