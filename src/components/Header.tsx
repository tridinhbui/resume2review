'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    // TODO: Implement actual login logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-navy-900/90 backdrop-blur-md shadow-lg border-b border-ocean-400/30' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
                                <div className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-ocean-500/50 transition-all duration-300 transform hover:scale-110">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold text-white hover:text-ocean-300 transition-colors duration-300">
              Resume2Path
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-ocean-200 hover:text-white transition-all duration-300 hover:scale-105 relative group font-medium">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ocean-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#courses" className="text-ocean-200 hover:text-white transition-all duration-300 hover:scale-105 relative group font-medium">
              Courses
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ocean-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#resources" className="text-ocean-200 hover:text-white transition-all duration-300 hover:scale-105 relative group font-medium">
              Resources
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ocean-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#community" className="text-ocean-200 hover:text-white transition-all duration-300 hover:scale-105 relative group font-medium">
              Community
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ocean-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <User className="w-3 h-3 mr-1" />
                  Welcome back!
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogin}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  size="sm"
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-blue-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#features" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#pricing" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-blue-100">
                {isLoggedIn ? (
                  <div className="px-3 py-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleLogout}
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2 px-3">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleLogin}
                      className="w-full text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleLogin}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
