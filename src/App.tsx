import SidebarItem from "./components/ui/SidebarItem";

function App() {
  return (
    <>
      <SidebarItem
        type='simple'
        sectionLabel='Simple Opt'
        iconName='camera'
        sectionMethod={() => {}}
        isActive={false}
      />

      <SidebarItem
        type='expandable'
        sectionLabel='Expandable Opt'
        iconName='camera'
        sectionMethod={() => {}}
        isActive={true}
        optLabels={['Opt 1', 'Opt 2']}
        isExpanded={true}
        optMethod={() => {}}
        activeOpt={'Opt 1Expandable Opt'}
      />
    </>
  )
};

export default App;