'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function UploadPage() {
  return (
    <div className="flex flex-col h-screen" style={{ background: 'linear-gradient(135deg, #fff 0%, #1e40af 100%)' }}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">ドキュメントアップロード</h2>
            <p>この機能は現在実装中です。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
