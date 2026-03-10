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
      <div className='flex flex-col my-1'>
        <div className={`flex items-center gap-2 ${isActive && 'text-indigo-400'}`} onClick={sectionMethod}>
          <DynamicIcon name={iconName} size={20} />
          <span className='grow'>{sectionLabel}</span>
          <ChevronRight size={20} />
        </div>
        <div className={`grid transform-all duration-250 grid-cols-[0fr] ${isExpanded && 'grid-cols-[1fr]'}`}>
          <div className='overflow-hidden'>
            {optLabels.map((optLabel, index) => {
              return (
                <div
                  key={index}
                  className={`ml-9.5 ${activeOpt === optLabel + sectionLabel && 'text-indigo-400'}`}
                  onClick={() => optMethod(optLabel)}
                >
                  {optLabel}
                </div>
              )
              })}
          </div>
        </div>
      </div>
    );
  }

  // If is not 'expandable' then it is necessarily 'simple'
  return (
    <div className={`flex items-center gap-2 ${isActive && 'text-indigo-400'}`} onClick={sectionMethod}>
      <DynamicIcon name={iconName} size={20} />
      <span className='grow'>{sectionLabel}</span>
    </div>
  );
}

export default SidebarItem; 