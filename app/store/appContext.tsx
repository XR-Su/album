/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import useAppStore, { AppState, initialState } from './appStore';

interface AppContext {
  state: AppState;
  dispatch: (action: object) => void;
}

export const AppContext = React.createContext<AppContext>({
  state: initialState,
  dispatch: ({}) => {}
});

export let useAppContext: () => AppContext;
useAppContext = () => React.useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const { state, dispatch } = useAppStore();
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
