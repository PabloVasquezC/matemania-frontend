import { Howl } from "howler";

const loginSuccessSound = new Howl({
  src: ["/sounds/login-success.wav"],
  volume: 0.5,
  preload: true,
});


export { loginSuccessSound };
