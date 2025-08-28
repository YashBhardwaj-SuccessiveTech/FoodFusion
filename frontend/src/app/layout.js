import { AuthProvider } from "@/context/AuthContext";
import "./globals.css"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200 min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar/>
          <main className="flex-1">
            {children}
          </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
