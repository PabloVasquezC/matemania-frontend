import { Howler } from "howler";

// Bandera para asegurar que solo intentamos desbloquear una vez
let isContextUnlocked = false;

/**
 * Intenta reanudar el AudioContext de Howler.js.
 * Esto es necesario en dispositivos móviles para cumplir con las políticas de autoplay,
 * ya que el contexto puede estar suspendido hasta la primera interacción del usuario.
 */
export function unlockAudioContext(): void {
  if (isContextUnlocked) {
    return;
  }

  // Verifica si el contexto de audio está disponible y no está corriendo
  if (Howler.ctx && Howler.ctx.state !== 'running') {
    Howler.ctx.resume().then(() => {
      console.log('🔊 Howler Audio Context resumed successfully.');
      isContextUnlocked = true;
    }).catch(e => {
      console.error('Error resuming Howler audio context:', e);
    });
  } else if (Howler.ctx && Howler.ctx.state === 'running') {
    // Si ya está corriendo, se considera desbloqueado
    isContextUnlocked = true;
  }
}
