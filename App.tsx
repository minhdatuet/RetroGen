import React, { useState } from 'react';
import { Gamepad2, Info } from 'lucide-react';
import { GeneratorForm } from './components/GeneratorForm';
import { PixelViewer } from './components/PixelViewer';
import { generatePixelSprite } from './services/geminiService';
import { GenerationState, GenerationOptions } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    imageData: null,
  });

  // Track options for display purposes
  const [lastOptions, setLastOptions] = useState<GenerationOptions | null>(null);

  const handleGenerate = async (options: GenerationOptions) => {
    setState({ isLoading: true, error: null, imageData: null });
    setLastOptions(options);
    
    try {
      const imageData = await generatePixelSprite(options);
      setState({ isLoading: false, error: null, imageData });
    } catch (error: any) {
      setState({ 
        isLoading: false, 
        error: error.message || "Failed to generate sprite. Please try again.", 
        imageData: null 
      });
    }
  };

  const handleClear = () => {
    setState(prev => ({ ...prev, imageData: null, error: null }));
    setLastOptions(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500 selection:text-white pb-20">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-pixel text-lg sm:text-xl text-white tracking-tight">
              Retro<span className="text-indigo-400">Gen</span>
            </h1>
          </div>
          <div className="text-xs font-medium px-3 py-1 bg-slate-800 rounded-full text-slate-400 border border-slate-700 hidden sm:block">
            Gemini 2.5 Flash
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Create 8-bit Style Assets
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Generate ultra-clean, strict pixel art sprites for your retro games instantly. 
            No dithering, no blur, just pure pixels.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Input */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            <div className="w-full bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
                 <h3 className="text-xl font-semibold text-white">Sprite Config</h3>
              </div>
              
              <GeneratorForm 
                onGenerate={handleGenerate} 
                isLoading={state.isLoading} 
              />

              {state.error && (
                <div className="mt-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200 text-sm flex items-start gap-3">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{state.error}</p>
                </div>
              )}
            </div>

            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/50 w-full">
               <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Style Rules Applied</h4>
               <ul className="space-y-2 text-sm text-slate-500 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Resolution: {lastOptions ? lastOptions.resolution : '256x256'} Strict
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Palette: Max {lastOptions ? lastOptions.maxColors : '5'} Flat Colors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Background: {lastOptions?.bgType === 'bands' ? 'Stripped' : 'Solid'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    No Shading, No Gradients
                  </li>
               </ul>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="flex flex-col items-center lg:items-end w-full">
            <div className="w-full max-w-md">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Preview Canvas</h3>
                  {state.isLoading && <span className="text-xs text-indigo-400 animate-pulse">Rendering pixels...</span>}
               </div>
               <PixelViewer 
                 imageData={state.imageData} 
                 onClear={handleClear}
               />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 mt-auto bg-slate-950 py-8 text-center text-slate-600 text-sm">
        <p>Powered by Google Gemini 2.5 Flash Image Model</p>
      </footer>
    </div>
  );
};

export default App;