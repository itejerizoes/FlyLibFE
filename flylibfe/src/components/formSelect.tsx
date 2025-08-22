import React from 'react';

interface FormSelectProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  required?: boolean;
  name?: string; // <-- Agrega esta línea
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  name,
}) => (
  <div style={{ marginBottom: 12 }}>
    <label>
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{ marginLeft: 8 }}
      >
        <option value="">Seleccione...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default FormSelect;