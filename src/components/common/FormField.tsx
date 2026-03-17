import { useId, type ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: (id: string) => ReactNode;
}

const FormField = ({ label, required = false, children }: FormFieldProps) => {
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
    </div>
  );
};

export default FormField;