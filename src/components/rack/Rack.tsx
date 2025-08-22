import { DndContext } from '@dnd-kit/core'
import Tile from '../tile/Tile'

const Rack = () => {
  return (
    <>
      <DndContext>
      <Tile />
    </DndContext>
    <DndContext>
      <Tile />
    </DndContext>
    </>
  )
}

export default Rack