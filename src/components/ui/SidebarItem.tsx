import { ChevronRight } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import type { FC } from 'react';

interface BaseItemProps {
  sectionLabel: string;
  iconName: IconName;
  sectionMethod: () => void;
  isActive: boolean;
}

interface SimpleItemProps extends BaseItemProps {
  type: 'simple';
}

interface ExpandableItemProps extends BaseItemProps {
  type: 'expandable';
  isExpanded: boolean;
  optLabels: string[];
  optMethod: (optLabel: string) => void;
  activeOpt: string | null;
}

type SidebarItemProps = SimpleItemProps | ExpandableItemProps;

const SidebarItem: FC<SidebarItemProps> = (props: SidebarItemProps) => {
  const { sectionLabel, iconName, sectionMethod, isActive }: BaseItemProps = props
  
  if (props.type === 'expandable') {
    const { isExpanded, optLabels, optMethod, activeOpt }: ExpandableItemProps = props

    return (
      <div className='flex flex-col mb-3'>
        <button className={`text-start p-0.5 cursor-pointer flex items-center gap-2 transition-colors duration-100 ${isActive ? 'text-white' : 'text-slate-400'}`} onClick={sectionMethod}>
          <DynamicIcon name={iconName} size={18} />
          <span className='grow font-bold'>{sectionLabel}</span>
          <ChevronRight size={18} className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
        <div className={`mt-0.5 grid transition-[grid-template-rows] duration-150 grid-rows-[0fr] ${isExpanded ? 'grid-rows-[1fr]' : ''}`}>
          <div className='overflow-hidden flex flex-col gap-1'>
            {optLabels.map((optLabel, index) => {
              return (
                <button
                  key={index}
                  className={`cursor-pointer ml-8 px-0.5 text-start text-slate-400 ${activeOpt === optLabel + sectionLabel && 'text-white'}`}
                  onClick={() => optMethod(optLabel)}
                >
                  {optLabel}
                </button>
              )
              })}
          </div>
        </div>
      </div>
    );
  }

  // If is not 'expandable' then it is necessarily 'simple'
  return (
    <button className={`cursor-pointer p-0.5 flex text-start items-center gap-2 ${isActive ? 'text-white' : 'text-slate-400'}`} onClick={sectionMethod}>
      <DynamicIcon name={iconName} size={18} />
      <span className='grow font-bold'>{sectionLabel}</span>
    </button>
  );
}

export default SidebarItem; 