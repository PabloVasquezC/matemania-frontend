import type { ITile } from "./ITile";

export interface BoardProps {
  tiles: ITile[];
  tileLocations: Record<string, string>;
}