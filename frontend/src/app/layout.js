// import { AuthProvider } from "@/context/AuthContext";
// import "./globals.css"
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-200 min-h-screen flex flex-col">
//         <AuthProvider>
//           <Navbar/>
//           <main className="flex-1">
//             {children}
//           </main>
//           <Footer/>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


"use client"
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apolloClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeNotifier from "@/components/RecipeNotifier";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200 min-h-screen flex flex-col">
        <ApolloProvider client={client}>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
          <RecipeNotifier/>
          <ToastContainer position="top-right" autoClose={3000} />
        </ApolloProvider>
      </body>
    </html>
  );
}
