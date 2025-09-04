import type { IRoboHash } from "../types/IRoboHash";

const handleGenerateRandomRobot = (stateSetter: React.Dispatch<React.SetStateAction<IRoboHash>>) => {
    const newRobot: IRoboHash = {
      id: Date.now().toString(),
      name: `Robot #${Math.floor(Math.random() * 1000)}`,
    };

		localStorage.setItem('userAvatar', newRobot.id);
    stateSetter(newRobot);
  };

export default handleGenerateRandomRobot;