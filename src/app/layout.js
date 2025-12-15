import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../app/Components/ReduxProvider.jsx";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wine Shipping",
  description: "Ecommerce for wine shipping",
  icons: {
    icon: "/favicon.ico", // o "/favicon.png" si usás PNG
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
   
        <ReduxProvider >
        {children}
        </ReduxProvider>
     
      </body>
    </html>
  );
}
