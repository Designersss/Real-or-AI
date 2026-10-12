/**
 * Release candidate catalog: 60 externally hosted images, 30 per class.
 * All labels are derived from source datasets, not from AI detectors.
 * Manual realism QA and checking underlying image rights remain necessary.
 * Source images MUST be self-hosted before broad release to avoid hotlink
 * availability, privacy and unexpected source-content changes.
 *
 * MIT image attribution and CC0 notes: docs/IMAGE-SOURCES.md
 * Keep image ids and order stable per catalog version to preserve challenges.
 */
export type ImageKind = 'real' | 'ai';

export interface GameImage {
  id: string;
  kind: ImageKind;
  category: 'portrait' | 'animal' | 'scene';
  alt: string;
  url: string;
  sourceLabel: string;
  sourceUrl: string;
  credit: string;
  license: string;
}
export const catalog: readonly GameImage[] = [
  {
    "id": "ai-animal-Real vs AI Dogs-1",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00014.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-10",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00105.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-2",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00016.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-3",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00025.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-4",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00026.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-5",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00028.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-6",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00049.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-7",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00087.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-8",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00091.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-animal-Real vs AI Dogs-9",
    "kind": "ai",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/1/ai_00104.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-1",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/001b1f10c62195e3f41dfc6a418cb5e16ffabc8e0d5819abe500d263ecfb59ba.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-10",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/01c522b693b92aaae56973f4819cfa6e46027f0dac650f765751c61e2d8903e2.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-2",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/00c0a5a1009e83f47bb99b815148b3efec45cf0754b44ecae78815305a6cb214.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-3",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/00c2ef09b666a5edea820c4d87d97598ef6ea544e4d20693638db938a4988f05.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-4",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/00cfee02d57fb50d6c65e03ebaa30d257b592b55234311b402af66d7aa21bde8.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-5",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/00d7bb3980c5251344f0f2df313c1119bc4ad547.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-6",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/00ffb7af5ada0f7a69f63d81272eef3c39198e96156e50a3c18f3574eb2fb863.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-7",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/01abeb09bd9a38c4aab9309b545d2d6b32517980ed563c3c67fae0e0c9c45eea.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-8",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/01b5d8f6254192605f3da43be40afc815e6dd7097f74899749bb3f6dcdb65bfa.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-portrait-Real vs AI Faces-9",
    "kind": "ai",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/1/01b5fdaa3985a19eab0e1e767057442cc674d123c9055c44ef047db23aa6f13e.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-1",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/5.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-10",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/3785.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-2",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/433.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-3",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/852.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-4",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/1292.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-5",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/1724.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-6",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/2159.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-7",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/2585.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-8",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/3013.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "ai-scene-Coherence assessment-9",
    "kind": "ai",
    "category": "scene",
    "alt": "A photographic-looking scene",
    "url": "https://raw.githubusercontent.com/PocketNugget/Coherence-assessment-of-generated-realistic-images/main/Generated%20Images/3403.png",
    "sourceLabel": "Coherence assessment",
    "sourceUrl": "https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images",
    "credit": "Coherence assessment (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-animal-Real vs AI Dogs-1",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00007.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-10",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00058.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-2",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00008.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-3",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00009.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-4",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00023.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-5",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00024.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-6",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00027.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-7",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00029.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-8",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00036.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-animal-Real vs AI Dogs-9",
    "kind": "real",
    "category": "animal",
    "alt": "A dog in a scene",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/dogs/test/0/real_00056.jpg",
    "sourceLabel": "Real vs AI Dogs",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Dogs (CC0-1.0)",
    "license": "CC0-1.0"
  },
  {
    "id": "real-portrait-Real vs AI Faces-1",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00000.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-10",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00047.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-2",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00008.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-3",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00012.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-4",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00018.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-5",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00023.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-6",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00030.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-7",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00032.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-8",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00038.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-portrait-Real vs AI Faces-9",
    "kind": "real",
    "category": "portrait",
    "alt": "A close-up portrait of a person",
    "url": "https://raw.githubusercontent.com/metetet/thesis/main/archive/datasets/faces_512x512/test/0/00041.jpg",
    "sourceLabel": "Real vs AI Faces",
    "sourceUrl": "https://github.com/metetet/thesis",
    "credit": "Real vs AI Faces (MIT)",
    "license": "MIT"
  },
  {
    "id": "real-scene-unsplash-1",
    "kind": "real",
    "category": "scene",
    "alt": "Snow-covered mountain peaks",
    "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "Simon Berger / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-10",
    "kind": "real",
    "category": "scene",
    "alt": "A lake in a mountain valley",
    "url": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "Unsplash / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-2",
    "kind": "real",
    "category": "scene",
    "alt": "A striking scene captured by a camera",
    "url": "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "NASA / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-3",
    "kind": "real",
    "category": "scene",
    "alt": "An unusual scene in a photograph",
    "url": "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "Jr Korpa / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-4",
    "kind": "real",
    "category": "scene",
    "alt": "A close-up of ocean waves",
    "url": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "Jeremy Bishop / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-5",
    "kind": "real",
    "category": "scene",
    "alt": "A landscape in warm light",
    "url": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "David Marcu / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-6",
    "kind": "real",
    "category": "scene",
    "alt": "An underwater scene",
    "url": "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "Marc Sendra Martorell / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-7",
    "kind": "real",
    "category": "scene",
    "alt": "A view captured from above",
    "url": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "NASA / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-8",
    "kind": "real",
    "category": "scene",
    "alt": "A detailed macro photograph",
    "url": "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "David Clode / Unsplash",
    "license": "Unsplash License"
  },
  {
    "id": "real-scene-unsplash-9",
    "kind": "real",
    "category": "scene",
    "alt": "A distant mountain landscape",
    "url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=82",
    "sourceLabel": "Unsplash",
    "sourceUrl": "https://unsplash.com/",
    "credit": "Unsplash / Unsplash",
    "license": "Unsplash License"
  }
];
