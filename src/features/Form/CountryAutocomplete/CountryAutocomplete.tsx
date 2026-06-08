import { useState } from 'react';

import { useAppSelector } from '../../../store/hooks';
import { selectCountries } from '../../../store/selectors/countriesSelectors';
import { type Country } from '../../../store/slices/countriesSlice';

type CountryAutocompleteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  onChange?: (value: string) => void;
  value?: string;
};

export const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  id,
  onChange,
  value,
  ...props
}) => {
  const [query, setQuery] = useState(value || '');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const countries = useAppSelector(selectCountries);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    console.log(value);

    const foundCountries = countries.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(foundCountries);
    onChange?.(value);
  };

  return (
    <>
      <input
        type="text"
        id={id}
        onChange={handleChange}
        value={query}
        list={`${id}-datalist`}
        {...props}
      />

      <datalist id={`${id}-datalist`}>
        {filteredCountries.map((country) => (
          <option key={country.code} value={country.name} />
        ))}
      </datalist>
    </>
  );
};
