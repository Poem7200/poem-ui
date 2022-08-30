import React, { CSSProperties, FC, ReactNode, createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;

// Menu包括item和submenu
export interface MenuProps {
  defaultIndex?: number; // menu的默认选中项（高亮）
  className?: string;
  mode?: MenuMode;
  style?: CSSProperties;
  children?: ReactNode;
  onSelect?: SelectCallback;
}
interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: FC<MenuProps> = (props: MenuProps) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical' // vertical as default
  })

  const handleSelect = (index: number) => {
    setActive(index);
    onSelect && onSelect(index);
  }

  const passedContext: IMenuContext = {
    index: currentActive || 0,
    onSelect: handleSelect
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { type: { displayName } } = childElement;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index
        })
      }
      else {
        console.error('Warning: Menu has a child which is not MenuItem');
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0
}

export default Menu;
