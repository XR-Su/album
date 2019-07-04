/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import useAppStore, { AppState } from './appStore';

interface AppContext {
  state: object;
  dispatch: (action: object) => void;
}

export const AppContext = React.createContext<AppContext>({
  state: {},
  dispatch: ({}) => {}
});

export const useAppContext = () => React.useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const { state, dispatch } = useAppStore();
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
