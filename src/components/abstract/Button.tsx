interface buttonProps {
  isFormValid: boolean;
  className: string;
  color: string;
  children: React.ReactNode;
}

const Button: React.FC<buttonProps> = ({
  className,
  color,
  isFormValid,
  children,
}) => {
  const inActiveClass = `!bg-opacity-30 hover:!bg-opacity-30 active:!bg-opacity-30 !text-opacity-30 hover:!${color} active:!${color}`;
  return (
    <button
      className={className + " " + (!isFormValid && inActiveClass)}
      disabled={!isFormValid}
    >
      {children}
    </button>
  );
};

export default Button;
