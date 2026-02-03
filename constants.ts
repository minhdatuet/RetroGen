export const PIXEL_ART_PROMPT_TEMPLATE = `
Role: Expert Pixel Artist.
Task: Create a sprite for a retro game.

Global Settings:
- Resolution: {{RESOLUTION}} pixels (Strict).
- Color Count: Max {{MAX_COLORS}} flat colors total.
- Style: Flat, Borderless, Iconic.

CRITICAL VISUAL RULES:
1. NO OUTLINES: The character must NOT have an outline (no black, white, or colored border).
2. EDGE DEFINITION: Edges must be defined purely by the contrast between body parts and the background.
3. SIZE: The character must be LARGE and fill 80% to 90% of the canvas. Do not leave excessive empty space.
4. NO SHADING: Use solid, flat colors only. No shadows, no gradients, no lighting.

Subject:
{{SUBJECT}}
- Appearance: Cute, chibi proportions, low detail, toy-like.
- Construction: Built from solid blocks of color.

Background:
{{BACKGROUND_INSTRUCTION}}
{{PROPS_INSTRUCTION}}

Negative Prompt:
- outline, border, stroke, line art
- shadow, shading, gradient, dither, noise
- anti-aliasing, blur, smoothing
- small size, tiny, zoomed out
- realistic, high detail
`;

export const BACKGROUND_PROPS = `
- Add 1-2 simple thematic props in the background.
- Props must be borderless and flat.
- Props must be smaller than the main character.`;