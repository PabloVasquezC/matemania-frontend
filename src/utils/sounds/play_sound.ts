import { clickSound } from "soundsManager";
import { unlockAudioContext } from "./unlockAudioContext";

const playClickSound = () => {
    unlockAudioContext(); 
    clickSound.play();
  };

export default playClickSound;