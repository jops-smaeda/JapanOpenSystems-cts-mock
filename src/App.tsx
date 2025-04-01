import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { AppProvider } from './context/AppContext';
import { Calendar } from './components/Calendar';
import { Memo } from './components/Memo';
import { WorkHistory } from './components/WorkHistory';

function App() {
  return (
    <AppProvider>
      <MainLayout>
        <div className="space-y-4">
          <div className="px-6 py-1">
            <h2 className="text-2xl font-bold text-gray-900">ポータル</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
            <div className="col-span-1 space-y-6">
              <Calendar />
              <Memo />
            </div>
            <div className="col-span-3">
              <WorkHistory />
            </div>
          </div>
        </div>
      </MainLayout>
    </AppProvider>
  );
}

export default App;
