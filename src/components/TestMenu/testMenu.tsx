import React, { createContext, CSSProperties, FC, ReactNode, useState } from "react";
import classNames from 'classnames';

type TestMenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void;

export interface ITestMenuProps {
  defaultIndex?: number; // 默认选中的项目
  mode?: TestMenuMode;
  onSelect?: SelectCallback;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface ITestMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const TestMenuContext = createContext<ITestMenuContext>({ index: 0 })

const TestMenu: FC<ITestMenuProps> = (props) => {
  const { defaultIndex, mode, className, style, children, onSelect } = props;
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical' // vertical as default
  })
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
    onSelect && onSelect(selectedIndex); // preserve select method
  }
  
  // tell children which index is active, and use active style to render it
  const passedContext: ITestMenuContext = {
    index: activeIndex || defaultIndex || 0,
    onSelect: handleSelect
  }

  return (
    <ul style={style} className={classes}>
      <TestMenuContext.Provider value={passedContext}>
        {children}
      </TestMenuContext.Provider>
    </ul>
  )
}

TestMenu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default TestMenu;
