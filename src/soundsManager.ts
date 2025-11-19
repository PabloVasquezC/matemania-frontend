import { Howl } from "howler";

const loginSuccessSound = new Howl({
  src: ["assets/sounds/login-success.wav"],
  volume: 1,
  preload: true,
});

const clickSound = new Howl({
  src: ["/assets/sounds/click-sound.wav"], // ASEGÚRATE DE QUE ESTA RUTA ES CORRECTA
  volume: 1,
  preload: true,
  html5: true, // Esto puede ayudar en algunos navegadores/entornos
});

const errorSound = new Howl({
  src: ["assets/sounds/error-sound.wav"],
  volume: 1,
  preload: true,
});

const gamemusic = new Howl({
  src: ["assets/sounds/gamemusic.mp3"],
  volume: 0.5, // 🔉 Recomendado: Bajarlo un poco para que no moleste
  loop: true,  // 🔁 Importante: Para que no se detenga al acabar la canción
  preload: true,
  html5: true // Recomendado para archivos de música largos
});



export { loginSuccessSound, clickSound, errorSound, gamemusic };
