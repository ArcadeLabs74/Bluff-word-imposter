import type { WordData } from '../types/game';

export interface CategoryOption {
  id: string;
  name: string;
  description: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'random', name: 'Random Mix', description: 'Surprise pick from any category' },
  { id: 'food', name: 'Food & Drinks', description: 'Dishes, snacks, street food and flavours' },
  { id: 'movies', name: 'Movies & TV', description: 'Films, shows, cinematic icons and tropes' },
  { id: 'places', name: 'World Places', description: 'Famous cities, landmarks and wonders' },
  { id: 'animals', name: 'Animals & Wildlife', description: 'Creatures of land, sea and air' },
  { id: 'gaming', name: 'Video Games', description: 'Gaming icons, items, consoles and quests' },
  { id: 'sports', name: 'Sports & Fitness', description: 'Athletic events, gear, rules and stadiums' },
  { id: 'everyday', name: 'Everyday Objects', description: 'Common household items, gadgets and tools' },
  { id: 'professions', name: 'Professions & Jobs', description: 'Careers, emergency roles and trades' },
  { id: 'superheroes', name: 'Superheroes & Comics', description: 'Caped heroes, supervillains and powers' },
  { id: 'mythology', name: 'Mythology & Legends', description: 'Gods, mythical beasts and ancient lore' },
  { id: 'music', name: 'Music & Instruments', description: 'Instruments, sound gear and genres' },
  { id: 'scifi', name: 'Tech & Sci-Fi', description: 'Future gadgets, AI, cyberpunk and space' },
  { id: 'anime', name: 'Anime & Cartoons', description: 'Animated classics, series and characters' },
  { id: 'history', name: 'History & Eras', description: 'Ancient civilizations, dynasties and relics' },
  { id: 'nature', name: 'Nature & Space', description: 'Cosmic bodies, weather phenomena and biomes' },
];

export const PRESET_WORDS: Record<string, WordData[]> = {
  food: [
    { category: 'Food & Drinks', secretWord: 'Sushi', imposterHint: 'Often served chilled and requires careful craftsmanship.' },
    { category: 'Food & Drinks', secretWord: 'Espresso', imposterHint: 'A hot, concentrated brew known for high intensity.' },
    { category: 'Food & Drinks', secretWord: 'Pancakes', imposterHint: 'A sweet, griddled staple often enjoyed in the morning.' },
    { category: 'Food & Drinks', secretWord: 'Guacamole', imposterHint: 'A seasoned spread traditionally paired with finger food.' },
    { category: 'Food & Drinks', secretWord: 'Croissant', imposterHint: 'A light, golden baked good with layered texture.' },
    { category: 'Food & Drinks', secretWord: 'Barbecue', imposterHint: 'Involves prolonged heat and smoky seasonings.' },
  ],
  movies: [
    { category: 'Movies & TV', secretWord: 'Titanic', imposterHint: 'Centered around a monumental journey and dramatic tragedy.' },
    { category: 'Movies & TV', secretWord: 'Superhero', imposterHint: 'Involves extraordinary capabilities and concealed identities.' },
    { category: 'Movies & TV', secretWord: 'Sitcom', imposterHint: 'Focused on lighthearted dialogue in recurring everyday settings.' },
    { category: 'Movies & TV', secretWord: 'Director', imposterHint: 'Responsible for overall creative vision and execution.' },
    { category: 'Movies & TV', secretWord: 'Stunt Double', imposterHint: 'Involves high-risk physical action behind the scenes.' },
  ],
  places: [
    { category: 'World Places', secretWord: 'Eiffel Tower', imposterHint: 'Known for towering elevation and tourist appeal.' },
    { category: 'World Places', secretWord: 'Great Wall of China', imposterHint: 'An immense ancient barrier traversing rugged landscapes.' },
    { category: 'World Places', secretWord: 'Pyramids of Giza', imposterHint: 'Ancient monumental structures rising in arid terrain.' },
    { category: 'World Places', secretWord: 'Venice', imposterHint: 'A historic destination defined by water and unique navigation.' },
    { category: 'World Places', secretWord: 'Colosseum', imposterHint: 'A grand historic arena associated with ancient public spectacles.' },
  ],
  animals: [
    { category: 'Animals & Wildlife', secretWord: 'Chameleon', imposterHint: 'Known for blending in and discreet visual adaptation.' },
    { category: 'Animals & Wildlife', secretWord: 'Penguin', imposterHint: 'A flightless creature adapted to frigid conditions.' },
    { category: 'Animals & Wildlife', secretWord: 'Octopus', imposterHint: 'An intelligent aquatic creature known for fluid movement.' },
    { category: 'Animals & Wildlife', secretWord: 'Kangaroo', imposterHint: 'A distinctive creature recognized for bound mobility.' },
    { category: 'Animals & Wildlife', secretWord: 'Cheetah', imposterHint: 'Renowned for unmatched sprint capability in open terrain.' },
  ],
  gaming: [
    { category: 'Video Games', secretWord: 'Health Potion', imposterHint: 'A critical consumable used to recover during intense action.' },
    { category: 'Video Games', secretWord: 'Final Boss', imposterHint: 'The ultimate obstacle encountered at the climax of an adventure.' },
    { category: 'Video Games', secretWord: 'Respawn Point', imposterHint: 'A strategic safe zone where participants start anew.' },
    { category: 'Video Games', secretWord: 'Speedrun', imposterHint: 'Focused on optimization, quick completion, and mastery.' },
    { category: 'Video Games', secretWord: 'Loot Box', imposterHint: 'A randomized container providing surprise rewards.' },
  ],
  sports: [
    { category: 'Sports & Fitness', secretWord: 'Penalty Kick', imposterHint: 'A tense, focused moment where precision under pressure is key.' },
    { category: 'Sports & Fitness', secretWord: 'Marathon', imposterHint: 'A test of sustained cardiovascular endurance and pacing.' },
    { category: 'Sports & Fitness', secretWord: 'Slam Dunk', imposterHint: 'A high-impact aerial maneuver requiring vertical reach.' },
    { category: 'Sports & Fitness', secretWord: 'Referee', imposterHint: 'Responsible for fair play, oversight, and calling infractions.' },
    { category: 'Sports & Fitness', secretWord: 'Photo Finish', imposterHint: 'When outcomes are determined by minuscule fractions of time.' },
  ],
  everyday: [
    { category: 'Everyday Objects', secretWord: 'Umbrella', imposterHint: 'A portable safeguard utilized during changing weather.' },
    { category: 'Everyday Objects', secretWord: 'Alarm Clock', imposterHint: 'A routine fixture associated with scheduled awakenings.' },
    { category: 'Everyday Objects', secretWord: 'Headphones', imposterHint: 'An accessory used for focused, personal audio intake.' },
    { category: 'Everyday Objects', secretWord: 'Backpack', imposterHint: 'A practical utility item designed for carrying belongings.' },
    { category: 'Everyday Objects', secretWord: 'Mirror', imposterHint: 'A reflective surface common in personal preparation.' },
  ],
  professions: [
    { category: 'Professions & Jobs', secretWord: 'Astronaut', imposterHint: 'Operates in extreme environments beyond usual frontiers.' },
    { category: 'Professions & Jobs', secretWord: 'Detective', imposterHint: 'Dedicated to investigating clues and solving complex puzzles.' },
    { category: 'Professions & Jobs', secretWord: 'Surgeon', imposterHint: 'Demands precise manual dexterity and critical focus.' },
    { category: 'Professions & Jobs', secretWord: 'Architect', imposterHint: 'Focuses on structural planning and spatial blueprints.' },
    { category: 'Professions & Jobs', secretWord: 'Chef', imposterHint: 'Commands culinary preparation and kitchen timing.' },
  ],
  superheroes: [
    { category: 'Superheroes & Comics', secretWord: 'Batmobile', imposterHint: 'Associated with rapid mobility and nighttime operations.' },
    { category: 'Superheroes & Comics', secretWord: 'Kryptonite', imposterHint: 'A rare hazard capable of weakening formidable strength.' },
    { category: 'Superheroes & Comics', secretWord: 'Spider-Sense', imposterHint: 'A sudden heightened instinct alerting to immediate peril.' },
    { category: 'Superheroes & Comics', secretWord: 'Secret Identity', imposterHint: 'A personal safeguard maintained to separate public and private life.' },
  ],
  mythology: [
    { category: 'Mythology & Legends', secretWord: 'Excalibur', imposterHint: 'A revered symbol of leadership bound to ancient legend.' },
    { category: 'Mythology & Legends', secretWord: 'Medusa', imposterHint: 'A mythical figure whose direct encounter proved fatal.' },
    { category: 'Mythology & Legends', secretWord: 'Phoenix', imposterHint: 'Symbolizes renewal, resilience, and rise from destruction.' },
    { category: 'Mythology & Legends', secretWord: 'Trojan Horse', imposterHint: 'A classic tactical deception disguised as an offering.' },
  ],
  music: [
    { category: 'Music & Instruments', secretWord: 'Electric Guitar', imposterHint: 'Known for expressive riffs and amplified resonance.' },
    { category: 'Music & Instruments', secretWord: 'Synthesizer', imposterHint: 'An instrument sculpting electronic timbres and frequencies.' },
    { category: 'Music & Instruments', secretWord: 'Vinyl Record', imposterHint: 'A physical medium appreciated for warmth and classic groove.' },
    { category: 'Music & Instruments', secretWord: 'Conductor', imposterHint: 'Directs group harmony, tempo, and expressive timing.' },
  ],
  scifi: [
    { category: 'Tech & Sci-Fi', secretWord: 'Artificial Intelligence', imposterHint: 'Emulates reasoning, recognition, and automated decisions.' },
    { category: 'Tech & Sci-Fi', secretWord: 'Teleporter', imposterHint: 'Speculative technology enabling instant transit across space.' },
    { category: 'Tech & Sci-Fi', secretWord: 'Hologram', imposterHint: 'A three-dimensional optical projection floating without screens.' },
    { category: 'Tech & Sci-Fi', secretWord: 'Cyborg', imposterHint: 'A blend of biological and synthetic components.' },
  ],
  anime: [
    { category: 'Anime & Cartoons', secretWord: 'Kamehameha', imposterHint: 'An iconic surge of concentrated energy unleashed in duel.' },
    { category: 'Anime & Cartoons', secretWord: 'Pokeball', imposterHint: 'A compact device designed for capture and deployment.' },
    { category: 'Anime & Cartoons', secretWord: 'Ninja Headband', imposterHint: 'A symbolic garment representing allegiance and training.' },
    { category: 'Anime & Cartoons', secretWord: 'Mecha Robot', imposterHint: 'A massive piloted construct built for heavy conflict.' },
  ],
  history: [
    { category: 'History & Eras', secretWord: 'Samurai', imposterHint: 'Adheres to martial discipline and historical code of honor.' },
    { category: 'History & Eras', secretWord: 'Viking Longship', imposterHint: 'A seaworthy craft engineered for exploration and coastal movement.' },
    { category: 'History & Eras', secretWord: 'Renaissance', imposterHint: 'An era celebrated for rapid cultural and intellectual awakening.' },
    { category: 'History & Eras', secretWord: 'Pharaoh', imposterHint: 'A supreme ruler venerated in antiquity beside great riverbanks.' },
  ],
  nature: [
    { category: 'Nature & Space', secretWord: 'Northern Lights', imposterHint: 'An ethereal atmospheric display visible in high latitudes.' },
    { category: 'Nature & Space', secretWord: 'Black Hole', imposterHint: 'A dense gravitational phenomenon with immense pull.' },
    { category: 'Nature & Space', secretWord: 'Volcano', imposterHint: 'A geological formation capable of venting deep earth pressures.' },
    { category: 'Nature & Space', secretWord: 'Solar Eclipse', imposterHint: 'A celestial alignment causing dramatic midday darkness.' },
  ],
};

/**
 * Fallback preset word getter for a specific category ID or random pick
 */
export function getWord(categoryId: string): WordData {
  if (categoryId !== 'random' && PRESET_WORDS[categoryId]) {
    const list = PRESET_WORDS[categoryId];
    return list[Math.floor(Math.random() * list.length)];
  }
  const allLists = Object.values(PRESET_WORDS);
  const list = allLists[Math.floor(Math.random() * allLists.length)];
  return list[Math.floor(Math.random() * list.length)];
}

export const PLAYER_COLORS = [
  '#6366F1',
  '#0EA5E9',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#8B5CF6',
  '#14B8A6',
  '#F97316',
  '#84CC16',
  '#06B6D4',
  '#A855F7',
];
