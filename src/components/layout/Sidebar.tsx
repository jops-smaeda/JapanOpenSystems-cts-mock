import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ShoppingCart, Factory, Building2, Warehouse, Settings, ShoppingBasket } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

export function Sidebar() {
  const { sidebarOpen } = useApp();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      label: '販売管理',
      icon: <ShoppingCart className="h-5 w-5" />,
      children: [
        {
          label: '見積',
          children: [
            { label: '一覧' },
            { label: '新規作成' },
            { label: '依頼' }
          ]
        },
        {
          label: '受注',
          children: [
            { label: '子画面' }
          ]
        },
        {
          label: '出荷',
          children: [
            { label: '子画面' }
          ]
        },
        {
          label: '売上',
          children: [
            { label: '子画面' }
          ]
        },
        {
          label: '売掛',
          children: [
            { label: '子画面' }
          ]
        },
        {
          label: '請求',
          children: [
            { label: '子画面' }
          ]
        },
        {
          label: '回収',
          children: [
            { label: '子画面' }
          ]
        }
      ]
    },
    {
      label: '生産管理',
      icon: <Factory className="h-5 w-5" />,
      children: [
        { label: '子画面' }
      ]
    },
    {
      label: '賃貸管理',
      icon: <Building2 className="h-5 w-5" />,
      children: [
        { label: '子画面' }
      ]
    },
    {
      label: '倉庫管理',
      icon: <Warehouse className="h-5 w-5" />,
      children: [
        { label: '子画面' }
      ]
    },
    {
      label: 'システム管理',
      icon: <Settings className="h-5 w-5" />,
      children: [
        { label: '子画面' }
      ]
    },
    {
      label: '購買管理',
      icon: <ShoppingBasket className="h-5 w-5" />,
      children: [
        { label: '子画面' }
      ]
    }
  ];

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path)
        ? prev.filter(item => !item.startsWith(path))
        : [...prev, path]
    );
  };

  const renderMenuItem = (item: MenuItem, path: string, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(path);
    const paddingLeft = `${depth * 1.5 + 1}rem`;

    return (
      <div key={path}>
        <button
          onClick={() => hasChildren && toggleExpand(path)}
          className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between text-gray-700`}
          style={{ paddingLeft }}
        >
          <span className="flex items-center gap-2">
            {depth === 0 && item.icon}
            <span className={`text-sm ${!sidebarOpen && depth === 0 ? 'hidden' : ''}`}>
              {item.label}
            </span>
          </span>
          {hasChildren && sidebarOpen && (
            <span className="ml-2">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          )}
        </button>
        {hasChildren && isExpanded && sidebarOpen && (
          <div className="border-l border-gray-200">
            {item.children.map((child, index) =>
              renderMenuItem(child, `${path}-${index}`, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 bg-white transform transition-transform duration-200 ease-in-out border-r border-gray-200 ${
        sidebarOpen ? 'translate-x-0 w-64' : 'translate-x-0 w-14'
      }`}
    >
      <div className={`h-16 flex items-center ${sidebarOpen ? 'justify-center' : 'justify-center'} border-b border-gray-200`}>
        <h2 className={`text-xl font-bold text-gray-900 ${!sidebarOpen && 'hidden'}`}>メニュー</h2>
      </div>

      <nav className="mt-5">
        <div>
          {menuItems.map((item, index) =>
            renderMenuItem(item, index.toString())
          )}
        </div>
      </nav>
    </aside>
  );
}
