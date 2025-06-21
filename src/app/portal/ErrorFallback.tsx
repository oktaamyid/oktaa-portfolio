"use client";

interface ErrorFallbackProps {
     message?: string;
}

export default function ErrorFallback({ message = "We're having trouble loading the portal. Please try again later." }: ErrorFallbackProps) {
     const handleRetry = () => {
          window.location.reload();
     };

     return (
          <div className="flex flex-col min-h-screen items-center justify-center">
               <div className="text-center text-gray-400 px-4">
                    <h1 className="text-xl font-bold mb-2">Oops! Something went wrong</h1>
                    <p className="text-sm">{message}</p>
                    <button
                         onClick={handleRetry}
                         className="mt-4 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
                    >
                         Retry
                    </button>
               </div>
          </div>
     );
}
