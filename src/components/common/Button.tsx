import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import type { FC } from 'react';

interface ButtonProps {
  label: string;
  iconName?: IconName;
  primary: boolean;
  clickMethod: () => void;
}

const Button: FC<ButtonProps> = ({ label, iconName, primary, clickMethod }) => {
  return (
    <button className={`cursor-pointer text-white w-fit font-semibold rounded py-2 px-4 border-2 transition-all ${primary ? 'bg-indigo-400 border-transparent' : 'bg-transparent border-indigo-400'} flex gap-2 hover:shadow-lg hover:shadow-indigo-400/45`} onClick={clickMethod}>
      {iconName && <DynamicIcon name={iconName} size={18} />}
      {label}
    </button>
  )
};

export default Button;