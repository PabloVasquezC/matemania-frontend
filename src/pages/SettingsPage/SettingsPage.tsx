function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-6 font-sans">
      <div className="w-full max-w-4xl bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
        {/* Encabezado de la página de configuración */}
        <div className="bg-gray-900/50 p-6 border-b border-gray-700">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Configuración</h1>
          <p className="text-sm text-gray-400 mt-1">Ajusta tus preferencias de juego y de cuenta.</p>
        </div>

        {/* Contenido principal de la configuración */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Sección de Cuenta */}
          <div className="pb-6 border-b border-gray-700">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Cuenta</h2>
            <p className="text-gray-400 mb-6">Actualiza tus detalles de perfil y contraseña.</p>
            
            <div className="flex flex-col space-y-4">
              <input 
                type="text" 
                placeholder="Nombre de usuario" 
                className="p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400 transition-colors"
              />
              <input 
                type="password" 
                placeholder="Cambiar contraseña" 
                className="p-4 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400 transition-colors"
              />
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md mt-4">
                Guardar cambios
              </button>
            </div>
          </div>

          {/* Sección de Notificaciones */}
          <div className="pb-6 border-b border-gray-700">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Notificaciones</h2>
            <p className="text-gray-400 mb-6">Controla cómo te notificamos de los eventos del juego.</p>
            
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Notificaciones por email</label>
              <input 
                type="checkbox" 
                className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Sección de Preferencias del Juego */}
          <div>
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Preferencias del Juego</h2>
            <p className="text-gray-400 mb-6">Ajusta el volumen o la dificultad.</p>
            
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Sonido del juego</label>
              <input 
                type="range" 
                className="w-1/2 accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
