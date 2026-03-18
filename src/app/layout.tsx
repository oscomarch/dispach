import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dispach — Kill the meeting',
  description: 'AI-powered async decision flows that replace unproductive meetings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-secondary antialiased">
        {children}
      </body>
    </html>
  );
}
