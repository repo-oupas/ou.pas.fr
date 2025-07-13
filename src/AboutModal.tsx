import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop - Clicking here will close the modal */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative z-10 max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">À propos</h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p>Ce site Web affiche une phrase suivie, après une seconde, de "ou pas".</p>
                    <p>Dans la langue français ceci, est une figure de style, appelée une 'ellipse'.</p>
                    <p className="mb-4">github: <a href="https://github.com/repo-oupas/ou.pas.fr">https://github.com/repo-oupas/ou.pas.fr</a></p>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;