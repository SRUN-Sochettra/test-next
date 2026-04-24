import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/src/context/AuthContext";
import Navbar from "@/src/components/Navbar";
import "./globals.css";

export const metadata = {
    title: "Next.js App",
    description: "Employee & Product Management",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <AuthProvider>
                    <Navbar />
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: "#1f2937",
                                color: "#fff",
                                border: "1px solid #374151",
                                borderRadius: "12px",
                                padding: "12px 16px",
                            },
                            success: {
                                iconTheme: {
                                    primary: "#22c55e",
                                    secondary: "#fff",
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: "#ef4444",
                                    secondary: "#fff",
                                },
                            },
                        }}
                    />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}