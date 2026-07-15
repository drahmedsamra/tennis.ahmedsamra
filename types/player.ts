

export interface Player {
    id: string;
  
    player_code: string;
    egypt_tennis_id: number | null;
  
    preferred_name_ar: string;
    preferred_name_en: string;
  
    full_name_ar: string;
    full_name_en: string;
  
    birth_year: number;
  
    gender: string;
  
    dominant_hand: string;
    dominant_eye: string;
  
    primary_club: string | null;
    private_coach: string | null;
  
    parent_name: string | null;
    parent_phone: string | null;
  
    photo_url: string | null;
  
    notes: string | null;
  
    active: boolean;
  
    created_at: string;
    updated_at: string;
  }
  
  export type NewPlayer = Omit<
    Player,
    "id" | "created_at" | "updated_at"
  >;