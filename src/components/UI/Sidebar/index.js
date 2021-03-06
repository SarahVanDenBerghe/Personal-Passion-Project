import React, { useState, useLayoutEffect } from 'react';
import SidebarDesktop from './Desktop';
import SidebarMobile from './Mobile';

const useWindowSize = () => {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const Sidebar = ({ children, active, setActive }) => {
  const width = useWindowSize();

  return (
    <>
      {width > 768 ? (
        <SidebarDesktop active={active} setActive={setActive}>
          {children}
        </SidebarDesktop>
      ) : (
        <SidebarMobile active={active} setActive={setActive}>
          {children}
        </SidebarMobile>
      )}
    </>
  );
};

export default Sidebar;
