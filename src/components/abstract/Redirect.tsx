import React from "react";
import { Link } from "react-router-dom";

interface redirectProps {
  path: string;
  text: string;
  linkText: string;
}

const Redirect: React.FC<redirectProps> = ({ path, text, linkText }) => {
  return (
    <div className="mt-4 ">
      {text}
      <Link className="ml-1 text-blue-400 " to={path}>
        {linkText}
      </Link>
    </div>
  );
};

export default Redirect;
