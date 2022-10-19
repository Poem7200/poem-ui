import React, { CSSProperties, FC, ReactNode, createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

// Menu包括item和submenu
export interface MenuProps {
  /** menu的默认选中项（高亮） */
  defaultIndex?: string;
  className?: string;
  /** 模式：横向（默认）、纵向 */
  mode?: MenuMode;
  style?: CSSProperties;
  children?: ReactNode;
  onSelect?: SelectCallback;
  /** 默认展开的子菜单（纵向模式） */
  defaultOpenSubMenus?: string[];
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

export const Menu: FC<MenuProps> = (props: MenuProps) => {
  const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('menu', className, {
    [`menu-${mode}`]: mode // vertical as default
  });

  const handleSelect = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  }

  const passedContext: IMenuContext = {
    index: currentActive || '0',
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { type: { displayName } } = childElement;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: `${index}`
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
  defaultIndex: '0',
  defaultOpenSubMenus: []
}

export default Menu;
