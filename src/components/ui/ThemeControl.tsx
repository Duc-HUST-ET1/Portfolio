import { useTheme } from '../../hooks/useTheme';

const options = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const;

export function ThemeControl() {
  const { preference, setPreference } = useTheme();

  return (
    <fieldset className="theme-control">
      <legend>Appearance</legend>
      <div className="theme-options">
        {options.map(({ value, label }) => (
          <label className="theme-option" key={value}>
            <input
              type="radio"
              name="theme-preference"
              value={value}
              checked={preference === value}
              onChange={() => setPreference(value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
