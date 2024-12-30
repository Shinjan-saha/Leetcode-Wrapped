import './globals.css';

export const metadata = {
  title: 'LeetCode Wrapped',
  description: 'Your LeetCode achievements summarized!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
