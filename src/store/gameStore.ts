import { create } from 'zustand';
import { 
  Studio, 
  Currency, 
  Film, 
  TalentContract, 
  GameProgress, 
  UniversePhase 
} from '../models/types';

interface GameState {
  studio: Studio | null;
  gameProgress: GameProgress;
  selectedFilm: Film | null;
  selectedTalent: TalentContract | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeStudio: (name: string) => void;
  selectFilm: (film: Film | null) => void;
  selectTalent: (talent: TalentContract | null) => void;
  updateCurrency: (currency: Partial<Currency>) => void;
  startFilmProduction: (film: Film) => void;
  hireActor: (talent: TalentContract) => void;
  setError: (error: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  studio: null,
  gameProgress: {
    studioLevel: 1,
    universePhase: UniversePhase.ORIGIN,
    achievements: [],
  },
  selectedFilm: null,
  selectedTalent: null,
  isLoading: false,
  error: null,

  initializeStudio: (name: string) => set(() => ({
    studio: {
      id: crypto.randomUUID(),
      name,
      level: 1,
      currency: { studioCoins: 1000000, producerCredits: 100 },
      facilities: [],
      films: [],
      talent: [],
    }
  })),

  selectFilm: (film) => set({ selectedFilm: film }),
  
  selectTalent: (talent) => set({ selectedTalent: talent }),
  
  updateCurrency: (currency) => set((state) => ({
    studio: state.studio ? {
      ...state.studio,
      currency: { ...state.studio.currency, ...currency }
    } : null
  })),

  startFilmProduction: (film) => set((state) => ({
    studio: state.studio ? {
      ...state.studio,
      films: [...state.studio.films, film]
    } : null
  })),

  hireActor: (talent) => set((state) => ({
    studio: state.studio ? {
      ...state.studio,
      talent: [...state.studio.talent, talent]
    } : null
  })),

  setError: (error) => set({ error }),
}));
