// Game Economy Types
export interface Currency {
  studioCoins: number;
  producerCredits: number;
}

// Studio Types
export interface Studio {
  id: string;
  name: string;
  level: number;
  currency: Currency;
  facilities: Facility[];
  films: Film[];
  talent: TalentContract[];
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  level: number;
  position: Vector3;
}

export enum FacilityType {
  OFFICE = 'OFFICE',
  SOUNDSTAGE = 'SOUNDSTAGE',
  BACKLOT = 'BACKLOT',
  SPECIAL_EFFECTS = 'SPECIAL_EFFECTS',
  MARKETING = 'MARKETING',
  TALENT_AGENCY = 'TALENT_AGENCY',
  WRITING_ROOM = 'WRITING_ROOM',
}

// Film Types
export interface Film {
  id: string;
  title: string;
  genre: Genre;
  budget: number;
  status: ProductionStatus;
  quality: FilmQuality;
  cast: TalentContract[];
  director: TalentContract;
  writer: TalentContract;
  boxOffice: number;
  relatedFilms: string[]; // IDs of connected films
  position: Vector3; // Position in the 3D studio lot
}

export interface FilmQuality {
  script: number;
  acting: number;
  directing: number;
  specialEffects: number;
  marketing: number;
}

export enum Genre {
  ACTION = 'ACTION',
  SCIFI = 'SCIFI',
  FANTASY = 'FANTASY',
  CRIME = 'CRIME',
  COMEDY = 'COMEDY',
}

export enum ProductionStatus {
  PRE_PRODUCTION = 'PRE_PRODUCTION',
  PRODUCTION = 'PRODUCTION',
  POST_PRODUCTION = 'POST_PRODUCTION',
  MARKETING = 'MARKETING',
  RELEASED = 'RELEASED',
}

// Talent Types
export interface TalentContract {
  id: string;
  name: string;
  type: TalentType;
  skills: TalentSkills;
  cost: number;
  availability: boolean;
  contractEnd: Date;
}

export interface TalentSkills {
  acting?: number;
  directing?: number;
  writing?: number;
  chemistry: number; // How well they work with others
  starPower: number; // Marketing/audience draw
}

export enum TalentType {
  ACTOR = 'ACTOR',
  DIRECTOR = 'DIRECTOR',
  WRITER = 'WRITER',
}

// Utility Types
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

// Game Progress Types
export interface GameProgress {
  studioLevel: number;
  universePhase: UniversePhase;
  achievements: Achievement[];
}

export enum UniversePhase {
  ORIGIN = 'ORIGIN',
  EXPANSION = 'EXPANSION',
  CULMINATION = 'CULMINATION',
  NEW_DIRECTIONS = 'NEW_DIRECTIONS',
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  reward: Partial<Currency>;
}
