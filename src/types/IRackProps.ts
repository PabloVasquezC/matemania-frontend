import type { ITile } from "./ITile";

export interface RackProps {
  tiles: ITile[];
  tileLocations: Record<string, string>;
}