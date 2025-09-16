import type { IPlayer } from "../../types/IPlayer"

function PlayerRack({player}: {player: IPlayer}) {
  return (
    <div>
        <h2>{player.name}'s Rack</h2>
        
    </div>
  )
}

export default PlayerRack