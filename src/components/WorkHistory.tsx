import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Task } from '../types';
import { NotificationList } from './NotificationList';

const mockTasks: Task[] = [
  {
    id: '1',
    order: 'ORD-2024-001',
    category: '見積作成',
    status: 'completed',
    updatedAt: new Date('2024-03-15T10:30:00'),
    assignedTo: 'user1',
    details: '/orders/ORD-2024-001'
  },
  {
    id: '2',
    order: 'ORD-2024-002',
    category: '受注処理',
    status: 'in-progress',
    updatedAt: new Date('2024-03-15T11:45:00'),
    assignedTo: 'user1',
    details: '/orders/ORD-2024-002'
  },
  {
    id: '3',
    order: 'ORD-2024-003',
    category: '出荷準備',
    status: 'pending',
    updatedAt: new Date('2024-03-15T14:20:00'),
    assignedTo: 'user1',
    details: '/orders/ORD-2024-003'
  }
];

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return '完了';
    case 'in-progress':
      return '処理中';
    case 'pending':
      return '未着手';
    default:
      return '不明';
  }
};

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

export function WorkHistory() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ユーザー作業履歴一覧</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    オーダー
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    業務区分
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    更新日時
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    詳細
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {task.order}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {task.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(task.updatedAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <a
                        href={task.details}
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
      </div>
      <NotificationList />
    </div>
  );
}
