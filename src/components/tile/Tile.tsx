const Tile = () => {

  const value = Math.round(Math.random()*10);
  const points: number = 1;


  return (
    <div className="tile font-bold text-2xl flex items-center justify-center bg-gray-200 rounded-lg shadow-md p-4">
      <span className="text-gray-800">{value}</span>

      <span className="text-gray-600">{points}</span>
    </div>
  )
}

export default Tile