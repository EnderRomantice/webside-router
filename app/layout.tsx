import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="min-h-screen">
      <body className="h-full transition-colors duration-2000 ease-in-out">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
