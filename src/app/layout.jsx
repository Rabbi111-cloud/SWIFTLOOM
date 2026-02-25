export const metadata = {
  title: "SWIFTLOOM",
  description: "A Delivery Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
