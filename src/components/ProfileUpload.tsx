"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateDemoUserProfileImage } from "@/lib/demoStore";

export function ProfileUpload() {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(user?.profileImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setIsUploading(true);

        // Simulate network upload
        setTimeout(() => {
          updateDemoUserProfileImage(base64);
          setIsUploading(false);
          window.location.reload();
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    if (!imagePreview) return;
    setImagePreview(null);
    updateDemoUserProfileImage("");
    window.location.reload();
  };

  const initial = user?.phone ? user.phone.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="group relative cursor-pointer"
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <div className="relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] rounded-full p-1 bg-gradient-to-tr from-violet-600 to-cyan-500 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-2 border-white/10 relative flex items-center justify-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl sm:text-4xl font-black text-white bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 w-full h-full flex items-center justify-center">
                {initial}
              </span>
            )}
            
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="block w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Icon Overlay */}
        <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-lg border-2 border-zinc-900 transition-transform duration-300 group-hover:scale-110">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>

        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
          disabled={isUploading}
        />
      </div>

      <div className="mt-4 flex flex-col items-center gap-1.5">
        <button 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="text-sm font-bold text-zinc-800 hover:text-violet-600 transition-colors"
        >
          Change Photo
        </button>
        {imagePreview && (
          <button 
            onClick={handleRemovePhoto}
            className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
          >
            Remove Photo
          </button>
        )}
      </div>
    </div>
  );
}
