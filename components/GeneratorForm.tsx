import React, { useState } from 'react';
import { Wand2, ImagePlus, Settings2, Palette, Box, Layers, Monitor } from 'lucide-react';
import { Button } from './Button';
import { GenerationOptions, Resolution, BackgroundType, BandOrientation } from '../types';

interface GeneratorFormProps {
  onGenerate: (options: GenerationOptions) => void;
  isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [subject, setSubject] = useState('');
  const [includeProps, setIncludeProps] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Advanced State
  const [resolution, setResolution] = useState<Resolution>('256x256');
  const [maxColors, setMaxColors] = useState<number>(5);
  const [bgType, setBgType] = useState<BackgroundType>('solid');
  const [bgOrientation, setBgOrientation] = useState<BandOrientation>('horizontal');
  const [bgBandCount, setBgBandCount] = useState<number>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim()) {
      onGenerate({
        subject,
        includeProps,
        resolution,
        maxColors,
        bgType,
        bgOrientation,
        bgBandCount
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-5">
      {/* Main Subject Input */}
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-slate-400">
          Character / Object
        </label>
        <div className="relative">
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. A grumpy wizard cat"
            className="w-full bg-slate-900 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Thematic Props Toggle */}
      <div 
        className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${includeProps ? 'bg-indigo-900/20 border-indigo-500/50' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'}`}
        onClick={() => !isLoading && setIncludeProps(!includeProps)}
      >
        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${includeProps ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-900 border-slate-600'}`}>
          {includeProps && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium text-slate-200 block">Include thematic props</span>
        </div>
        <ImagePlus className={`w-5 h-5 ${includeProps ? 'text-indigo-400' : 'text-slate-600'}`} />
      </div>

      {/* Advanced Settings Toggle */}
      <div className="border-t border-slate-800 pt-2">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors mb-4 w-full"
        >
          <Settings2 className="w-4 h-4" />
          {showAdvanced ? 'Hide Customization' : 'Customize Background & Style'}
        </button>

        {showAdvanced && (
          <div className="space-y-5 animate-fade-in bg-slate-900/30 p-4 rounded-xl border border-slate-800">
            
            {/* Resolution & Palette Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5" /> Resolution
                </label>
                <select 
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value as Resolution)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="64x64">64x64 (Macro)</option>
                  <option value="128x128">128x128 (Retro)</option>
                  <option value="256x256">256x256 (Sharp)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> Max Colors
                </label>
                <div className="flex items-center gap-3">
                    <input 
                        type="range" 
                        min="2" 
                        max="16" 
                        value={maxColors} 
                        onChange={(e) => setMaxColors(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <span className="text-sm font-mono text-indigo-400 w-6 text-right">{maxColors}</span>
                </div>
              </div>
            </div>

            {/* Background Settings */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Background Style
              </label>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBgType('solid')}
                  className={`flex-1 py-2 text-xs font-medium rounded-md border transition-colors ${bgType === 'solid' ? 'bg-indigo-900/40 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                >
                  Solid Color
                </button>
                <button
                  type="button"
                  onClick={() => setBgType('bands')}
                  className={`flex-1 py-2 text-xs font-medium rounded-md border transition-colors ${bgType === 'bands' ? 'bg-indigo-900/40 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                >
                  Striped Bands
                </button>
              </div>

              {bgType === 'bands' && (
                <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">Direction</span>
                    <select 
                      value={bgOrientation}
                      onChange={(e) => setBgOrientation(e.target.value as BandOrientation)}
                      className="w-full bg-slate-800 border border-slate-700 rounded py-1.5 px-2 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="horizontal">Horizontal</option>
                      <option value="vertical">Vertical</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">Band Count: {bgBandCount}</span>
                    <input 
                        type="range" 
                        min="2" 
                        max="5" 
                        value={bgBandCount} 
                        onChange={(e) => setBgBandCount(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-2"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={!subject.trim() || isLoading} 
        isLoading={isLoading}
        className="w-full font-pixel text-sm"
      >
        <Wand2 className="w-4 h-4" />
        Generate Sprite
      </Button>
    </form>
  );
};