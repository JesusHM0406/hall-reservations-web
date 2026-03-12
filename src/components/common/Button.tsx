import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import type { FC } from 'react';
import { Link } from 'react-router';

interface BaseProps {
  label: string;
  iconName?: IconName;
  primary: boolean;
  clickMethod: () => void;
}

interface ButtonProps extends BaseProps {
  iType: 'button';
}

interface LinkProps extends BaseProps {
  iType: 'link';
  link: string;
}

type ItemProps = ButtonProps | LinkProps

const Button: FC<ItemProps> = (props) => {
  const { label, iconName, primary, clickMethod }: BaseProps = props
  const classes = `cursor-pointer text-white w-fit font-semibold rounded-xl py-2.5 px-4 border-2 transition-all ${primary ? 'bg-indigo-400 border-transparent' : 'bg-transparent border-indigo-400'} flex gap-2 hover:shadow-lg hover:shadow-indigo-400/45`

  if (props.iType === 'link') {
    const { link }: LinkProps = props

    return (
      <Link to={link} className={classes} onClick={clickMethod} >
        {iconName && <DynamicIcon name={iconName} size={18} />}
        {label}
      </Link>
    )
  }

  return (
    <button type='button' className={classes} onClick={clickMethod}>
      {iconName && <DynamicIcon name={iconName} size={18} />}
      {label}
    </button>
  )
};

export default Button;