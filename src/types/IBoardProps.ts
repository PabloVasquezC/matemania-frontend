import type { ITile } from "./ITile";

export interface IBoardProps {
  tiles: ITile[];
  tileLocations: Record<string, string>;
}