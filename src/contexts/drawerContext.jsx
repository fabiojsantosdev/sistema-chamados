import { useState, createContext, useCallback } from 'react';


export const DrawerContext = createContext({});


function DrawerProvider({ children }) {

  const [isDrawerOpen, SetIsDrawerOpen] = useState(false);


  const toggleDrawerOpen = useCallback(() => {
    SetIsDrawerOpen(oldOpenDrawer => !oldOpenDrawer);
  }, []);



  return (
    <DrawerContext.Provider value={{
      isDrawerOpen,
      toggleDrawerOpen,
    }}>
      {children}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider;