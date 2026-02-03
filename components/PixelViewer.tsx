import React, { useRef, useEffect, useState } from 'react';
import { Download, Maximize2, Trash2 } from 'lucide-react';
import { Button } from './Button';

interface PixelViewerProps {
  imageData: string | null;
  onClear: () => void;
}

export const PixelViewer: React.FC<PixelViewerProps> = ({ imageData, onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadSize, setDownloadSize] = useState<number>(256); // Default 256x256 strict output

  useEffect(() => {
    if (!imageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // We want to force the visual representation to be pixelated
      // The canvas itself will be 256x256 for the "Strict" mode view
      canvas.width = 256;
      canvas.height = 256;
      
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, 256, 256);
    };
    img.src = imageData;
  }, [imageData]);

  const handleDownload = () => {
    if (!imageData) return;
    
    // Create a temporary link to download
    const link = document.createElement('a');
    
    // If we want strict 256x256, we can use the canvas data
    if (downloadSize === 256 && canvasRef.current) {
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = `pixel-sprite-256.png`;
    } else {
        // Otherwise use the original high-res from Gemini if available/desired
        // But for this app, the prompt specifically asks for 256x256 resolution.
        // It's safer to use the canvas scaling to guarantee dimensions.
        // Let's create a temporary canvas for other sizes if needed, 
        // but for now, we'll just stick to the canvas logic.
        if (canvasRef.current) {
             link.href = canvasRef.current.toDataURL('image/png');
             link.download = `pixel-sprite-256.png`;
        }
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!imageData) {
    return (
      <div className="w-full aspect-square max-w-md bg-slate-800 rounded-xl border-2 border-slate-700 border-dashed flex items-center justify-center text-slate-500">
        <div className="text-center p-6">
          <Maximize2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-pixel text-xs uppercase tracking-widest">No Sprite Generated</p>
          <p className="text-sm mt-2 text-slate-400">Enter a prompt to create a new character</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="relative group">
        {/* The Display Canvas - Using CSS to ensure sharp pixels even if scaled on screen */}
        <canvas 
            ref={canvasRef} 
            className="w-full aspect-square bg-slate-800 rounded-xl shadow-2xl pixel-art-canvas border-4 border-slate-700"
            style={{ width: '100%', height: 'auto', imageRendering: 'pixelated' }}
        />
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
                onClick={onClear}
                className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                title="Discard"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Output</span>
            <span className="font-pixel text-sm text-indigo-400">256 x 256 PNG</span>
        </div>
        <Button onClick={handleDownload} variant="primary" className="w-full sm:w-auto">
          <Download className="w-4 h-4" />
          Download Sprite
        </Button>
      </div>
    </div>
  );
};