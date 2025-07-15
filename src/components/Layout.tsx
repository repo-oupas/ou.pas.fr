// Layout.tsx
import React from 'react';
import { ChartArea, Info, Sun, Moon } from 'lucide-react';

interface LayoutProps {
    darkMode: boolean;
    currentBgVariant: string;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAbout: React.Dispatch<React.SetStateAction<boolean>>;
    openMatomoDashboard: () => void;
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
    darkMode,
    currentBgVariant,
    setDarkMode,
    setShowAbout,
    openMatomoDashboard,
    children // ✅ Now comes from React.FC<PropsWithChildren>
}) => {
    return (
        <div className={`min-h-screen ${currentBgVariant} ${darkMode ? 'dark' : ''} transition-all duration-500`}>
            {/* Header with theme toggle */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                {/* Matomo Dashboard */}
                <button
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300`}
                    onClick={openMatomoDashboard}
                >
                    <ChartArea size={20} />
                </button>
                {/* About Button */}
                <button
                    onClick={() => setShowAbout(true)}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300`}
                    aria-label="About"
                >
                    <Info size={20} />
                </button>
                {/* Theme Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
            {/* Main content */}
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
                {children}
            </div>
        </div>
    );
};

export default Layout;