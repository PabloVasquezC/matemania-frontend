import type { ITile } from '../../types/ITile';
import type { FC } from 'react';

const Tile: FC<ITile> = ({ value , points }) => {
  return (
    <div className="tile">
      <span>{value}</span>
      <span>{points}</span>
    </div>
  )
}

export default Tile