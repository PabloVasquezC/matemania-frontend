import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="
      bg-gray-800/80 
      backdrop-blur-md
      text-white 
      py-6 
      md:py-8
      w-full
      border-t
      border-gray-700/50
      mt-auto
    ">
      <div className="container mx-auto px-4 text-center">
        <p className="
          text-sm 
          md:text-base
          flex 
          flex-col
          sm:flex-row
          items-center 
          justify-center
          gap-2
          sm:gap-1
        ">
          <span className="flex items-center gap-1">
            <em className="
              bg-gradient-to-r 
              from-teal-400 
              to-blue-500 
              text-transparent 
              bg-clip-text
              font-bold
              text-base
              md:text-lg
            ">
              Matemanía
            </em>{" "}
            <span className="hidden sm:inline">fue hecho con</span>
            <span className="sm:hidden">hecho con</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="animate-pulse-slow">❤️</span>
            <span>&</span>
            <span className="animate-float">☕</span>
            <span>por Pablo Vásquez</span>
          </span>
          <a
            href="https://github.com/PabloVasquezC"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex 
              items-center 
              gap-2
              hover:text-teal-400
              transition-all
              duration-200
              transform
              hover:scale-110
              group
            "
            aria-label="GitHub Profile"
          >
            <FaGithub 
              size={24} 
              className="
                text-gray-400 
                group-hover:text-teal-400
                transition-colors
                duration-200
              " 
            />
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
