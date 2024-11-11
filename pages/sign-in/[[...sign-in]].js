// pages/sign-in/[[...sign-in]].js
import React from 'react';
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const ImageLayout = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center">
            {/* Fullscreen Background Image */}
            <div className="absolute inset-0">
                <Image 
                    src="/RENT.png" 
                    layout="responsive"
                    width={300} 
                    height={200}// Fullscreen background
                    objectFit="cover"           // Cover the entire background while maintaining aspect ratio
                    className="z-0 opacity-78"  // Reduced transparency to show the image clearly
                    alt="Rent Logo" 
                />
            </div>
            
            {/* Sign-in Section */}
            <div className="relative z-10 bg-white bg-opacity-30 backdrop-blur-md px-8 py-10 rounded-lg shadow-2xl max-w-md w-full border border-white border-opacity-40 transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-50">Welcome Back!</h2>
                <p className="text-center text-gray-200 text-lg mb-6">Sign in to continue</p>
                
                {/* Clerk Sign-In Component */}
                <div className="w-full flex justify-center">
                    <SignIn 
                        appearance={{
                            layout: {
                                socialButtonsPlacement: 'top',
                                primaryButtonVariant: 'default',
                            },
                            elements: {
                                rootBox: "text-gray-100",
                                socialButtonsIconBox: "hover:scale-105 transition-transform duration-200",
                                primaryButton: "w-full bg-purple-700 text-white hover:bg-purple-800 transition-colors duration-200 mt-4",
                            },
                        }}
                    />
                </div>
                
                <p className="text-center text-gray-200 mt-6 text-sm">
                    Don’t have an account? 
                    <span className="text-purple-300 hover:text-purple-500 cursor-pointer ml-1">Sign up</span>
                </p>
            </div>
            
            <style jsx>{`
                .animate-gradient {
                    background: linear-gradient(135deg, #4b6cb7, #182848, #dc2424, #4b6cb7);
                    background-size: 400% 400%;
                    animation: gradient-animation 10s ease infinite;
                }
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default function SignInPage() {
    return (
        <>
            <ImageLayout />
        </>
    );
}  
