import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionProvid from "./providers/sessionProvider";
import { SocketContextProvider } from "./providers/socketProvider";
import { UserContextProvider } from "./providers/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Share Scape",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <SessionProvid>
          <UserContextProvider>
          <SocketContextProvider>{children}</SocketContextProvider>
          </UserContextProvider>
          </SessionProvid>
        </ThemeProvider>
      </body>
    </html>
  );
}
