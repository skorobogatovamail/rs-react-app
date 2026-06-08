import { GENDER_OPTIONS } from '../formConfig';

type GenderSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
};

export const GenderSelect = ({ id, ...props }: GenderSelectProps) => (
  <select id={id} {...props}>
    <option value="" disabled>
      Select gender
    </option>
    {GENDER_OPTIONS.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);
