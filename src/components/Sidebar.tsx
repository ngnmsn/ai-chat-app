'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'チャット', path: '/' },
    { name: 'ドキュメントアップロード', path: '/upload' },
  ];
  
  return (
    <div className="w-64 bg-white bg-opacity-10 dark:bg-slate-800 dark:bg-opacity-10 h-[calc(100vh-4rem)] p-4">
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors ${
              pathname === item.path ? 'bg-white bg-opacity-20' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
