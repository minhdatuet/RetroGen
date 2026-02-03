export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  imageData: string | null; // Base64 data URI
}

export type Resolution = '64x64' | '128x128' | '256x256';
export type BackgroundType = 'solid' | 'bands';
export type BandOrientation = 'horizontal' | 'vertical';

export interface GenerationOptions {
  subject: string;
  resolution: Resolution;
  maxColors: number;
  bgType: BackgroundType;
  bgOrientation: BandOrientation;
  bgBandCount: number;
  includeProps: boolean;
}
