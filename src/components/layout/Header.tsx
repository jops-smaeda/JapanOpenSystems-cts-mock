import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Key, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { user, sidebarOpen, toggleSidebar } = useApp();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePasswordChange = () => {
    setUserMenuOpen(false);
    // パスワード変更処理をここに実装
    console.log('パスワード変更');
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    // ログアウト処理をここに実装
    console.log('ログアウト');
  };

  return (
    <header className="bg-blue-500 text-white fixed w-full z-30">
      <div className="px-2 sm:px-4 lg:pr-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className={`p-2 hover:bg-blue-600 rounded-lg transition-all duration-200 -ml-2`}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center ml-4">
              <div className="w-5 h-5 bg-white rounded-full mr-3"></div>
              <h1 className="text-xl font-bold leading-tight">
                ほげほげ２
              </h1>
            </div>
          </div>

          <div className="flex items-center" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="relative"
            >
              <div className="w-8 h-8 rounded-full ring-2 ring-white/70 hover:ring-white transition-all overflow-hidden">
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-4 top-14 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={handlePasswordChange}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Key className="h-4 w-4" />
                  パスワード変更
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
