import React from "react";
import { Link } from "react-router-dom";
import { PenLine, Github, Linkedin, Code } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 mb-4 md:mb-0 text-black dark:text-white font-semibold text-lg tracking-tight"
          >
            <PenLine size={20} />
            BlogApp
          </Link>

          <div className="flex gap-4">
            <a
              href="https://github.com/shaik-mohammed-uwais"
              target="_blank"
              rel="noreferrer"
              className="transition-transform hover:scale-110 text-black dark:text-white"
            >
              <Github size={20} />
            </a>
            <a
              href="https://leetcode.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-transform hover:scale-110 text-black dark:text-white"
            >
              <Code size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/shaik-mohammed-uwais/"
              target="_blank"
              rel="noreferrer"
              className="transition-transform hover:scale-110 text-black dark:text-white"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-black/60 dark:text-white/40">
          &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
