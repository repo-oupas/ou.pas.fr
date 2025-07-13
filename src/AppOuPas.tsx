import { useState, useEffect, useRef } from 'react';
import { Share2, Copy, X, Moon, Sun, Info } from 'lucide-react';
import { FacebookIcon } from './FacebookIcon';
import AboutModal from './AboutModal';

const AppOuPas = () => {
    const [sentence, setSentence] = useState('');
    const [displayedSentence, setDisplayedSentence] = useState('');
    const [showOuPas, setShowOuPas] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [backgroundVariant, setBackgroundVariant] = useState(0);
    const [showCursor, setShowCursor] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showShareButton, setShowShareButton] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const typewriterRef = useRef<NodeJS.Timeout | null>(null);
    const [showAbout, setShowAbout] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    
    const defaultSentences = [
        "Site Bientôt terminé",
        "Tu es incroyable",
        "C'est magnifique",
        "Je suis heureux",
        "Tu as raison",
        "C'est génial",
        "J'adore cette idée",
        "Tu es doué",
        "Tu as de belles dents"
    ];

    const backgroundVariants = [
        'bg-gradient-to-br from-blue-50 to-indigo-100',
        'bg-gradient-to-br from-purple-50 to-pink-100',
        'bg-gradient-to-br from-green-50 to-emerald-100',
        'bg-gradient-to-br from-orange-50 to-red-100',
        'bg-gradient-to-br from-yellow-50 to-amber-100'
    ];

    const darkBackgroundVariants = [
        'bg-gradient-to-br from-slate-900 to-blue-900',
        'bg-gradient-to-br from-purple-900 to-pink-900',
        'bg-gradient-to-br from-emerald-900 to-teal-900',
        'bg-gradient-to-br from-red-900 to-orange-900',
        'bg-gradient-to-br from-yellow-900 to-amber-900'
    ];

    // Parse URL parameters and set sentence
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sentenceParam = urlParams.get('phrase') || urlParams.get('sentence');

        if (sentenceParam) {
            // Decode URI component and replace + with spaces
            const decodedSentence = decodeURIComponent(sentenceParam.replace(/\+/g, ' '));
            // Basic XSS protection - strip HTML tags and trim whitespace
            const sanitizedSentence = decodedSentence.replace(/<[^>]*>/g, '').trim();
            setSentence(sanitizedSentence);
        } else {
            // Random default sentence
            const randomSentence = defaultSentences[Math.floor(Math.random() * defaultSentences.length)];
            setSentence(randomSentence);
        }

        // Random background variant
        setBackgroundVariant(Math.floor(Math.random() * backgroundVariants.length));
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (sentence && sentence.length > 0 && !isTyping) {
            setIsTyping(true);
            setShowCursor(true);
            setDisplayedSentence('');
            setShowOuPas(false);

            let index = 0;
            const typeSpeed = 80; // milliseconds per character

            const typeChar = () => {
                if (index < sentence.length) {
                    setDisplayedSentence(sentence.substring(0, index + 1));
                    index++;

                    typewriterRef.current = setTimeout(typeChar, typeSpeed);
                } else {
                    setIsTyping(false);
                    // Show "ou pas" after a delay
                    setTimeout(() => {
                        setShowCursor(false);
                        setShowOuPas(true);
                    }, 2000);
                }
            };

            typeChar();
        }

        return () => {
            if (typewriterRef.current) {
                clearTimeout(typewriterRef.current);
            }
        };
    }, [sentence]);

    // Cursor blinking effect
    useEffect(() => {
        if (showCursor) {
            const cursorInterval = setInterval(() => {
                setShowCursor(prev => !prev);
            }, 500);
            return () => clearInterval(cursorInterval);
        }
    }, [showCursor]);

    // Main menu
    /*
    useEffect(() => {
        if (showMainMenu) {
            
        }
    }, [showMainMenu])
    */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowAbout(false);
        };

        if (showAbout) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showAbout]);

    // to Show the Share Button
    useEffect(() => {
        if (showOuPas) {
            const timer = setTimeout(() => {
                setShowShareButton(true);
            }, 1000); // 1 second delay
            return () => clearTimeout(timer);
        } else {
            setShowShareButton(false); // Reset if "ou pas" hides (optional)
        }
    }, [showOuPas]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (showInput && e.key === 'Enter' && inputValue.trim()) {
                const encodedSentence = encodeURIComponent(inputValue.trim());
                window.location.href = `?phrase=${encodedSentence}`;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showInput, inputValue]);

    const wport = window.location.port
    //const beginOfUrl = 'http'+((wport ==='80' || wport === '3000')?'':'s')+`://${window.location.hostname}` + ((wport === '') ? '' : (':' + wport));
    const beginOfUrl = window.location.origin + window.location.pathname;
    //console.log('sentence='+`${sentence}`)
    const handleShare = (platform: string) => {
        console.log('phrase=' + `${sentence}`)
        const notEncodedFullUrl = beginOfUrl + '?phrase=' + sentence
        const encodedSentence = encodeURIComponent(sentence || '');
        const encodedSentenceParam = `phrase=${encodedSentence}`;
        const fullEncodedUrl = `${beginOfUrl}?${encodedSentenceParam}`;

        //console.log('urlToShare=' + `${urlToShare}`)
        console.log('encodeddUrl=' + `${fullEncodedUrl}`)
        https://localhost:3000?sentence%3DJ'adore%20cette%20id%C3%A9e
        switch (platform) {
            case 'x':
                window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(fullEncodedUrl)}&`, '_blank');
                console.log(`https://x.com/intent/tweet?url=${encodeURIComponent(fullEncodedUrl)}&`)
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${fullEncodedUrl}`, '_blank');
                break;
            case 'copy':
                //navigator.clipboard.writeText(shareUrl).then(() => {
                //navigator.clipboard.writeText( beginOfUrl+'?'+encodedSentenceParam ).then(() => {
                navigator.clipboard.writeText(fullEncodedUrl ).then(() => {
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 700);
                });
                break;
        }
        setShowShareMenu(false);
    };

    const currentBgVariant = darkMode ? darkBackgroundVariants[backgroundVariant] : backgroundVariants[backgroundVariant];

    return (
        <div className={`min-h-screen ${currentBgVariant} ${darkMode ? 'dark' : ''} transition-all duration-500`}>
            {/* Header with theme toggle */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                {/* About Button */}
                <button
                    onClick={() => setShowAbout(true)}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300`}
                    aria-label="About"
                >
                    <Info size={20} />
                </button>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            {/* About Modal */}
            <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />

            {/* Main content */}
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
                <div className="max-w-4xl w-full text-center">
                    {/* Main sentence with typewriter effect */}
                    <div className="mb-8 relative">
                        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light leading-tight ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {displayedSentence}
                            {isTyping && showCursor && (
                                <span className={`animate-pulse ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>|</span>
                            )}
                        </h1>
                    </div>

                    {/* "ou pas" with fade-in animation */}
                    <div className={`transition-all duration-1000  ${showOuPas ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className={`text-2xl md:text-3xl lg:text-4xl font-light italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                            ou pas
                        </p>
                    </div>

                    {/* Share button - appears after "ou pas" animation completes */}
                    {showOuPas && showShareButton && (
                        <div className={`mt-12 relative transition-all duration-1000 delay-1000 ${showOuPas ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            {/* Share and Custom Sentence Buttons */}
                            <div className="mt-12 relative flex items-center justify-center gap-2">
                                {/* Share Button */}
                                <button
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    className={`px-6 py-3 ${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2`}
                                >
                                    <Share2 size={20} /> Partager
                                </button>

                                {/* Magnifier Button */}
                                <button
                                    onClick={() => setShowInput(!showInput)}
                                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300`}
                                    aria-label="Custom sentence"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.3-4.3" />
                                    </svg>
                                </button>
                            </div>

                            {/* Custom Sentence Input */}
                            {showInput && (
                                <div className={`mt-4 flex gap-2 w-full max-w-md mx-auto transition-all duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Saisi ta phrase..."
                                        className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    <button
                                        onClick={() => {
                                            const encodedSentence = encodeURIComponent(inputValue);
                                            window.location.href = `?phrase=${encodedSentence}`;
                                        }}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Go
                                    </button>
                                </div>
                            )}


                            {/* Share menu */}
                            {showShareMenu && (
                                <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-4 flex gap-2 z-20`}>
                                    <button
                                        onClick={() => handleShare('x')}
                                        className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                                        title="Partager sur X"
                                    >
                                        <X size={20} className="text-blue-500" />
                                    </button>
                                    <button
                                        onClick={() => handleShare('facebook')}
                                        className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                                        title="Partager sur Facebook"
                                    >
                                        <FacebookIcon size={20} className="text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => handleShare('copy')}
                                        className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                                        title="Copier le lien"
                                    >
                                        <Copy size={20} className={copySuccess ? 'text-green-500' : 'text-gray-500'} />
                                    </button>
                                </div>
                            )}

                            {/* Copy success message */}
                            {copySuccess && (
                                <div className={`absolute top-full mt-16 left-1/2 transform -translate-x-1/2 ${darkMode ? 'bg-gray-800 text-green-400' : 'bg-white text-green-600'} px-4 py-2 rounded-lg shadow-lg`}>
                                    Lien copié!
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Subtle decoration */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className={`w-16 h-px ${darkMode ? 'bg-gray-600' : 'bg-gray-400'} opacity-50`}></div>
                </div>
            </div>

            {/* Loading indicator for slow connections */}
            {!sentence && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className={`animate-spin rounded-full h-8 w-8 border-2 ${darkMode ? 'border-gray-600 border-t-gray-200' : 'border-gray-300 border-t-gray-600'}`}></div>
                </div>
            )}

            {/* Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet" />
        </div>
    );
};

export default AppOuPas;