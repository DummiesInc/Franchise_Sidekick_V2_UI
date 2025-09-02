// components/SelectInput.tsx
import { Select, Label } from 'flowbite-react';
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister
} from 'react-hook-form';

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options: SelectOption[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  onChange?: (value: number) => void; // custom onChange
  valueType?: 'string' | 'number';
};

// How do I change the underline behavior of this component to always have the value set as number type instead of string

export function SelectInput<T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
  placeholder,
  valueType = 'string',
  onChange
}: SelectInputProps<T>) {
  return (
    <div className="pt-2 pb-2">
      <Label className="block font-medium mb-1">{label}</Label>
      <Select
        {...register(name, {
          // setValueAs: (val) => (val === "" || valueType === 'number' ? undefined : Number(val)),
          setValueAs: (val) => {
            if (val === '') return undefined;
            switch (valueType) {
              case 'number':
                return Number(val);
              case 'string':
                return val;
              default:
                return val;
            }
          }
        })}
        // className="w-full border border-gray-300 p-2 rounded"
        onChange={(e) => {
          register(name as any).onChange(e);
          if (onChange) onChange(Number(e.target.value));
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={Number(option.value)}>
            {option.label}
          </option>
        ))}
      </Select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
