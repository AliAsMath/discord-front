interface inputLabelProps {
  value: string;
  setValue: (state: string) => void;
  label: string;
  type: string;
  placholder?: string;
}

const InputLabel: React.FC<inputLabelProps> = (props) => {
  const { value, setValue, label, type, placholder } = props;

  const valueChangeHandler = (e: React.FormEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return (
    <div className="my-5 text-left">
      <label htmlFor="" className="mb-2 text-sm">
        {label}
      </label>
      <input
        className="w-full p-2 text-black transition-all border-4 border-transparent rounded focus:outline-none focus:border-yellow-400"
        type={type}
        onChange={valueChangeHandler}
        value={value}
        placeholder={placholder}
      />
    </div>
  );
};

export default InputLabel;
