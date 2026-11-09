export type RegistrationRequestStatus =
  | "pending"
  | "contacted"
  | "approved"
  | "rejected";

export type Gender = "Male" | "Female" | "ذكر" | "أنثى";

export type TennisLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Competitive Player";

export type TennisExperience =
  | "Never Played"
  | "Less than 1 Year"
  | "1–3 Years"
  | "More than 3 Years";

export type PreferredTrainingType =
  | "Private"
  | "Semi-Private"
  | "Group Training"
  | "Not Sure Yet";

export type PreferredTrainingTime =
  | "Morning"
  | "Afternoon"
  | "Evening";

export interface PlayerRegistrationRequest {
  id: string;
  player_name: string;
  date_of_birth: string;
  age: number;
  gender: string;
  parent_name: string | null;
  egypt_tennis_id: string | null;
  preferred_player_code?: string | null;
  mobile_number: string;
  whatsapp_number: string | null;
  email: string | null;
  played_before: boolean;
  tennis_experience: string | null;
  current_level: string | null;
  tournament_experience: boolean;
  current_club: string | null;
  previous_coach: string | null;
  preferred_training_type: string | null;
  preferred_days: string[];
  preferred_time: string | null;
  additional_notes: string | null;
  status: RegistrationRequestStatus;
  created_at: string;
  updated_at: string;
}

export type NewPlayerRegistrationRequest = Omit<
  PlayerRegistrationRequest,
  "id" | "status" | "created_at" | "updated_at"
> & {
  status?: RegistrationRequestStatus;
};

