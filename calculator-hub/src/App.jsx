import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import BasicCalculator from './components/BasicCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Globe, LayoutGrid, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderView = () => {
    switch(activeView) {
      case 'basic': return <BasicCalculator />;
      case 'scientific': return <ScientificCalculator />;
      default: return <Dashboard onSelect={setActiveView} />;
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation Header */}
      <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {activeView !== 'dashboard' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveView('dashboard')}
                className="group"
              >
                <ChevronLeft className="size-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </Button>
            )}
            {activeView === 'dashboard' && (
              <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                  <LayoutGrid size={18} />
                </div>
                HUB
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Globe size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground flex flex-col items-center gap-4">
          <div className="flex items-center gap-8 uppercase font-bold tracking-[0.2em] text-[10px]">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
          <p>© 2026 Calculator Hub. Crafted with Precision.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
