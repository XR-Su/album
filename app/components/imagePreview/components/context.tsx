/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';

interface ContextValues {
  boxWidth: number;
  setLayerOpen: (val: boolean) => void;
}

interface ContextProps extends ContextValues {
  children: any;
}

export const PreviewContext = React.createContext({
  boxWidth: 0,
  setLayerOpen: val => {
    val;
  }
});

export const usePreViewContext: () => ContextValues = () =>
  React.useContext(PreviewContext);

const PreviewProvider = ({
  children,
  boxWidth,
  setLayerOpen
}: ContextProps) => (
  <PreviewContext.Provider value={{ boxWidth, setLayerOpen }}>
    {children}
  </PreviewContext.Provider>
);

export default PreviewProvider;
