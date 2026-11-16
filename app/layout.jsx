import './globals.css';
import AppShell from '../components/AppShell';

export const metadata = {
  title: 'AI-POWERED TECHNICAL INTERVIEW PREPPER | Invertis Placement Portal',
  description: 'AI-Powered Technical Interview Prepper for Invertis University: Voice-based mock interviews, topic-wise practice, aptitude, coding tracks & CRC drives.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#EE6200',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#F8F9FA] text-slate-800 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
