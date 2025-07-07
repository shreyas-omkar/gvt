import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Gurukula Vaidhik Trust - Spiritual Guidance & Vastu Consultation',
  description:
    'Experience authentic Vedic wisdom through our astrological guidance, Vastu consultations, and spiritual remedies. Connect with ancient knowledge for modern living.',
  keywords:
    'Astrology, Vastu Shastra, Spiritual Guidance, Vedic Wisdom, Consultation, Mantras, Stotras',
  openGraph: {
    title: 'Gurukula Vaidhik Trust',
    description: 'Authentic Vedic Wisdom & Spiritual Guidance',
    type: 'website',
  },
  metadataBase: new URL('https://gurukulavaidhiktrust.com', 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </body>
    </html>
  );
}
