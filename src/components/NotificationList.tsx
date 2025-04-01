import React, { useState } from 'react';
import { Mail, Star, ExternalLink, MessageSquare } from 'lucide-react';
import { Notification } from '../types';
import { useApp } from '../context/AppContext';

const mockNotifications: Notification[] = [
  {
    id: '1',
    order: 'ORD-2024-001',
    type: '見積依頼',
    sender: '営業部 田中',
    message: '新規見積の作成依頼が届いています。',
    timestamp: new Date('2024-03-15T10:30:00'),
    isRead: false,
    isFavorite: true
  },
  {
    id: '2',
    order: 'ORD-2024-002',
    type: '受注確認',
    sender: '営業部 鈴木',
    message: '受注内容の確認をお願いします。',
    timestamp: new Date('2024-03-15T11:45:00'),
    isRead: true,
    isFavorite: false
  },
  {
    id: '3',
    order: 'ORD-2024-003',
    type: '出荷指示',
    sender: '物流部 佐藤',
    message: '至急の出荷指示が入っています。',
    timestamp: new Date('2024-03-15T14:20:00'),
    isRead: false,
    isFavorite: false
  }
];

const formatDate = (date: Date) => {
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

interface MessagePopupProps {
  message: string;
  onClose: () => void;
  position: { x: number; y: number };
}

const MessagePopup: React.FC<MessagePopupProps> = ({ message, onClose, position }) => {
  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <p className="text-sm text-gray-700">{message}</p>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      ></div>
    </div>
  );
};

export function NotificationList() {
  const { sidebarOpen } = useApp();
  const [activePopup, setActivePopup] = useState<{
    message: string;
    position: { x: number; y: number };
  } | null>(null);

  const handleMessageClick = (message: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setActivePopup({
      message,
      position: {
        x: rect.right + 10,
        y: rect.top,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ユーザー通知一覧</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="w-12 px-4 py-3 bg-gray-50"></th>
                <th className="w-12 px-4 py-3 bg-gray-50"></th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  オーダー
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  通知区分
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  通知者
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  メッセージ
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  通知日時
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  詳細
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Mail 
                      className={`h-5 w-5 ${notification.isRead ? 'text-gray-400' : 'text-blue-600'}`}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Star
                      className={`h-5 w-5 ${notification.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {notification.order}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {notification.type}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {notification.sender}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {sidebarOpen ? (
                      <button
                        onClick={(e) => handleMessageClick(notification.message, e)}
                        className="hover:bg-gray-100 p-1 rounded-full"
                      >
                        <MessageSquare className="h-5 w-5 text-gray-600" />
                      </button>
                    ) : (
                      notification.message
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(notification.timestamp)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    <a
                      href={`/notifications/${notification.id}`}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      <span>詳細</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {activePopup && (
        <MessagePopup
          message={activePopup.message}
          onClose={() => setActivePopup(null)}
          position={activePopup.position}
        />
      )}
    </div>
  );
}
