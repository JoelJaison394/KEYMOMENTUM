import React from "react";
import { AiFillGithub, AiOutlineStar } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <footer className="h-50 p-8 text-white  text-center">
      <div className="flex justify-center items-center space-x-4">
        <a
          href="https://github.com/JoelJaison394/KEYMOMENTUM.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub size={24} />
        </a>
        <span> | </span>
        <a
          href="https://github.com/JoelJaison394/KEYMOMENTUM.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineStar size={24} />
        </a>
      </div>
      <p className="mt-2">© 2023 KEYMOMENTUM</p>
    </footer>
  );
};

export default Footer;
