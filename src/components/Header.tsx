'use client';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white bg-opacity-10 dark:bg-slate-800 dark:bg-opacity-10 shadow-md p-4 z-10 backdrop-blur-sm">
      <div className="container">
        <h1 className="text-2xl font-bold text-foreground/30 dark:text-foreground/100 pl-4">プライベートAIチャット</h1>
      </div>
    </header>
  );
}
