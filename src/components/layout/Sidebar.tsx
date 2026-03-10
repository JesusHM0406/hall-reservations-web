import { SIDEBAR_ITEMS } from "../../config/sidebar-config";
import Button from "../common/Button";
import SidebarItem from "../ui/SidebarItem";

const Sidebar = () => {
  return (
    <>
      <aside className='bg-neutral-900 w-70 h-dvh flex flex-col px-4'>
        <div className='grow mt-7'>
          {SIDEBAR_ITEMS.map(item => {
            if (item.type === 'expandable') {
              return (
                <SidebarItem
                  {...item}
                  isActive={false}
                  sectionMethod={() => {}}
                  isExpanded={true}
                  optMethod={() => {}}
                  activeOpt={null}
                  key={item.sectionLabel}
                />
              )
            }

            return (
              <SidebarItem
                {...item}
                isActive={true}
                sectionMethod={() => {}}
                key={item.sectionLabel}
              />
            )

          })}
        </div>
        <div className='flex flex-col gap-4 items-center mb-10'>
          <Button label='Register' iconName='plus' primary={true} />
          <Button label='Log In' iconName='log-in' primary={false} />
        </div>
      </aside>
    </>
  )
};

export default Sidebar;