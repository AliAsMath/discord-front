import React from "react";

interface authBoxProps {
  children: React.ReactNode;
}

const AuthBox: React.FC<authBoxProps> = ({ children }) => {
  return (
    <div className="w-[600px] bg-neutral-800 p-5 rounded-xl text-center text-zinc-400">
      <h2 className="text-4xl font-semibold tracking-widest text-zinc-50 font-Oswald">
        AsMeet
      </h2>
      <h4>We are happy that you are with us!</h4>
      {children}
    </div>
  );
};

export default AuthBox;
