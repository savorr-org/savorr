
type SearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  placeholder = "Search for item...",
}) => {
  return (
    <input
      type="text"
      className="px-6 py-1 focus:outline-none bg-gray-input-box w-10/12 rounded-md font-manrope"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={inputRef}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;