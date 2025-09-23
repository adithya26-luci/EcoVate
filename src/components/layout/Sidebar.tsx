
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChartIcon, GaugeIcon, MapPinIcon, LeafIcon, SettingsIcon } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: <GaugeIcon className="h-5 w-5" />, path: '/' },
  { name: 'Projects', icon: <LeafIcon className="h-5 w-5" />, path: '/projects' },
  { name: 'Map', icon: <MapPinIcon className="h-5 w-5" />, path: '/map' },
  { name: 'Analytics', icon: <BarChartIcon className="h-5 w-5" />, path: '/analytics' },
  { name: 'Settings', icon: <SettingsIcon className="h-5 w-5" />, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 p-2 rounded-xl">
            <LeafIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-800">EcoVate</span>
            <p className="text-xs text-gray-500">Your carbon footprint companion</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  location.pathname === item.path 
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
