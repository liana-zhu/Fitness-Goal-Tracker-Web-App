import React, { useState } from 'react';
import { 
    Weight, 
    Salad, 
    Dumbbell, 
    LineChart, 
    LogOut,
    Menu,
    X
} from 'lucide-react';

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleLogout = () => {
        // TODO: Implement logout functionality
        console.log('Logout clicked');
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LineChart className="w-5 h-5" /> },
        { id: 'weight', label: 'Body Weight', icon: <Weight className="w-5 h-5" /> },
        { id: 'calories', label: 'Calories', icon: <Salad className="w-5 h-5" /> },
        { id: 'workout', label: 'Workout', icon: <Dumbbell className="w-5 h-5" /> }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile menu button */}
            <button
    className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md
               transition-all duration-300 ease-in-out hover:bg-gray-100"
    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
>
    {isSidebarOpen ? (
        <X className="w-6 h-6 text-gray-600 transition-transform duration-200 rotate-0 hover:rotate-90" />
    ) : (
        <Menu className="w-6 h-6 text-gray-600 transition-transform duration-200 hover:scale-110" />
    )}
</button>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white shadow-lg z-40`}>
                <div className="flex flex-col h-full">
                    {/* App Title */}
                    <div className="p-6 pt-16 border-b">
                        <h1 className="text-2xl font-bold text-gray-800">Fitness Tracker</h1>
                        <p className="text-sm text-gray-600">Welcome, Guest</p>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                                    activeSection === item.id
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} min-h-screen transition-all duration-300`}>
                <div className="p-8">
                    {/* Placeholder Content */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {navItems.find(item => item.id === activeSection)?.label}
                        </h2>
                        <p className="text-gray-600">
                            Content for {navItems.find(item => item.id === activeSection)?.label} will be displayed here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;