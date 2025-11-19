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
  src: ["assets/sounds/gamesmusic.mp3"],
  volume: 1,
  preload: true,
});



export { loginSuccessSound, clickSound, errorSound, gamemusic };
