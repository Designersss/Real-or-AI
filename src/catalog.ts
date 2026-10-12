/**
 * Temporary, provenance-labelled preview catalog.
 * Images are served from the AI-Detect Arena benchmark samples until we curate
 * and self-host a thoroughly reviewed, licensed 20/20 catalog.
 * Data: https://github.com/AI-Detect-Arena/benchmark-dataset
 * Do not silently substitute unknown-origin images for these labels.
 */
export type ImageKind = 'real' | 'ai';

export interface GameImage {
  id: string;
  kind: ImageKind;
  category: string;
  alt: string;
  url: string;
  sourceLabel: string;
  sourceUrl: string;
  credit: string;
}
const root = 'https://raw.githubusercontent.com/AI-Detect-Arena/benchmark-dataset/main/samples';
const citation = 'https://github.com/AI-Detect-Arena/benchmark-dataset';
const asset = (id: string, kind: ImageKind, category: string, file: string, alt: string): GameImage => ({
  id, kind, category, alt,
  url: root + '/' + kind + '/' + category + '/' + file,
  sourceLabel: 'AI-Detect Arena benchmark',
  sourceUrl: citation,
  credit: kind === 'ai' ? 'AI-Detect Arena / FLUX.2 sample' : 'AI-Detect Arena / Unsplash sample',
});

export const catalog: readonly GameImage[] = [
  asset('ai-animal-01', 'ai', 'animal', 'flux_2_flex_animal_01.png', 'An animal in a detailed scene'),
  asset('ai-food-01', 'ai', 'food', 'flux_2_flex_food_01.png', 'A close-up of food'),
  asset('ai-landscape-01', 'ai', 'landscape', 'flux_2_flex_landscape_01.png', 'A scenic landscape'),
  asset('ai-portrait-01', 'ai', 'portrait', 'flux_2_flex_portrait_01.png', 'A portrait of a person'),
  asset('ai-product-01', 'ai', 'product', 'flux_2_flex_product_01.png', 'A product photograph style image'),
  asset('ai-art-01', 'ai', 'art', 'flux_2_flex_art_01.png', 'A photograph style art composition'),
  asset('real-animal-01', 'real', 'animal', 'animal_034_-Ylz_tc8NOk.jpg', 'An animal outdoors'),
  asset('real-animal-02', 'real', 'animal', 'animal_035_vQvq16ZQM60.jpg', 'An animal in natural light'),
  asset('real-animal-03', 'real', 'animal', 'animal_036_xlTolOtNLZM.jpg', 'A detailed animal photograph'),
  asset('real-food-01', 'real', 'food', 'food_034_dY7ONzZzoU8.jpg', 'A food photograph'),
  asset('real-food-02', 'real', 'food', 'food_035_91czTE5wmCg.jpg', 'Food in natural light'),
  asset('real-food-03', 'real', 'food', 'food_036_HkaSi5Fvc0s.jpg', 'A food close-up'),
  asset('real-landscape-01', 'real', 'landscape', 'landscape_01_mountain_peaks_with_snow.jpg', 'Snowy mountain peaks'),
  asset('real-landscape-02', 'real', 'landscape', 'landscape_02_sunset_over_mountains.jpg', 'Sunset over mountains'),
  asset('real-landscape-03', 'real', 'landscape', 'landscape_03_lake_reflection.jpg', 'Mountains reflected in a lake'),
  asset('real-portrait-01', 'real', 'portrait', 'portrait_036_IHJtKBe9xNs.jpg', 'A person in a portrait photograph'),
  asset('real-portrait-02', 'real', 'portrait', 'portrait_037_M34IAftLLsY.jpg', 'A portrait taken with a camera'),
  asset('real-portrait-03', 'real', 'portrait', 'portrait_038_62Ims7pw_X8.jpg', 'A photographed person'),
  asset('real-product-01', 'real', 'product', 'product_034_VlgzxZZKQOQ.jpg', 'A photographed product'),
  asset('real-product-02', 'real', 'product', 'product_035_s9TJ2ncyLcQ.jpg', 'A product on a real background'),
  asset('real-product-03', 'real', 'product', 'product_036_ww2S2eKgbKE.jpg', 'A product detail photograph'),
  asset('real-art-01', 'real', 'art', 'art_032_puf8VwPLAug.jpg', 'A photograph of an artwork'),
  asset('real-art-02', 'real', 'art', 'art_033_cpAKc-G6lPg.jpg', 'Art captured by a camera'),
];
