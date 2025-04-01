import React, { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';

export function Memo() {
  const [memo, setMemo] = useState('');
  const [savedMemos, setSavedMemos] = useState<string[]>([]);

  const handleSaveMemo = () => {
    if (memo.trim()) {
      setSavedMemos([...savedMemos, memo]);
      setMemo('');
    }
  };

  const handleDeleteMemo = (index: number) => {
    setSavedMemos(savedMemos.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">個人メモスペース</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="メモを入力してください..."
              className="flex-1 min-h-[80px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            />
            <button
              onClick={handleSaveMemo}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
            </button>
          </div>
          
          {savedMemos.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700 text-sm">保存されたメモ</h4>
              <div className="space-y-2 max-h-[150px] overflow-y-auto">
                {savedMemos.map((savedMemo, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-50 rounded-lg text-gray-700 text-xs flex justify-between items-start group"
                  >
                    <span className="flex-1 break-words">{savedMemo}</span>
                    <button
                      onClick={() => handleDeleteMemo(index)}
                      className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
