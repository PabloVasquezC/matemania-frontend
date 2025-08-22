// src/pages/SettingsPage.js

function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Encabezado de la página de configuración */}
        <div className="bg-gray-800 text-white p-6">
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-sm text-gray-400 mt-1">Ajusta tus preferencias de juego y de cuenta.</p>
        </div>

        {/* Contenido principal de la configuración */}
        <div className="p-6 md:p-8">
          {/* Sección de Cuenta */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Cuenta</h2>
            <p className="text-gray-600 mb-4">Actualiza tus detalles de perfil y contraseña.</p>
            {/* Aquí irían los formularios o inputs para la cuenta */}
            <div className="flex flex-col space-y-4">
              <input 
                type="text" 
                placeholder="Nombre de usuario" 
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="password" 
                placeholder="Cambiar contraseña" 
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
                Guardar cambios
              </button>
            </div>
          </div>

          {/* Sección de Notificaciones */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Notificaciones</h2>
            <p className="text-gray-600 mb-4">Controla cómo te notificamos de los eventos del juego.</p>
            {/* Aquí irían los checkboxes o toggles para notificaciones */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Notificaciones por email</label>
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" />
            </div>
          </div>

          {/* Sección de Preferencias del Juego */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Preferencias del Juego</h2>
            <p className="text-gray-600 mb-4">Ajusta el volumen o la dificultad.</p>
            {/* Aquí irían los sliders, toggles, etc. */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Sonido del juego</label>
              <input type="range" className="w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;