import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './global.css';
import Navigation from "./components/navigation";
import { Provider } from "./provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tournaments",
  description: "Social Network for teams to compete in worlwide tournaments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navigation />
          {children}
        </Provider>
      </body>
    </html>
  );
}
