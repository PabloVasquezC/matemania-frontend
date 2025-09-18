import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 z-50 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm flex items-center justify-center">
          <span>
            <em className="bg-gradient-to-br from-purple-500 to-rose-500 text-transparent bg-clip-text">CogniTiles</em> fue hecho con ❤️ & ☕ por Pablo Vásquez.
          </span>
          <a
            href="https://github.com/PabloVazquez"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-gray-400 transition-colors duration-200"
          >
            <FaGithub size={24} className="text-gray-400 hover:text-white ml-2" />
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;