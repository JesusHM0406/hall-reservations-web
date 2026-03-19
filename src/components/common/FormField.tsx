import { useId, type ReactNode } from "react";
import type { FieldError } from "react-hook-form";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  children: (id: string) => ReactNode;
}

const FormField = ({ label, required = false, error, children }: FormFieldProps) => {
  const inputId = useId();

  return (
    <div className='flex flex-col'>
      <label
        htmlFor={inputId}
        className='uppercase py-2 font-bold tracking-widest text-2xs text-inactive'
      >
        {label}
        {required && <span className='text-danger ml-1' aria-hidden>*</span>}
      </label>
      {children(inputId)}
      {error && <span id={`${inputId}-error`} className='text-danger/80 mt-2 font-medium text-2xs'>{error.message}</span>}
    </div>
  );
};

export default FormField;