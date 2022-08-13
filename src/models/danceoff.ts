import { Robot } from "./robot";

export interface Danceoff {
  id: number;
  winner: number;
  loser: number;
  dancedAt: string;
}
export interface DanceoffPopulated {
  id: number;
  winner: Robot;
  loser: Robot;
  dancedAt: string;
}

export interface DanceOffPayload {
  id?: number;
  danceoffs: DanceOffPayloadEntity[];
}

export interface DanceOffPayloadEntity {
  winner: number;
  opponents: number[];
}
