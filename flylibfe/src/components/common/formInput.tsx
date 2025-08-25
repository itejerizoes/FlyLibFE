import React from 'react';

interface FormInputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  name?: string; // <-- Agrega esta línea
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '',
  name,
}) => (
  <div style={{ marginBottom: 12 }}>
    <label>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={{ marginLeft: 8 }}
      />
    </label>
  </div>
);

export default FormInput;