import React, { CSSProperties, FC, ReactNode } from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';

// Menu包括item和submenu
interface MenuProps {
  defaultIndex?: string; // menu的默认选中项
  className?: string;
  mode?: MenuMode;
  style?: CSSProperties;
  children?: ReactNode;
}

const Menu: FC<MenuProps> = (props: MenuProps) => {
  // const {} = props;

  return (
    <div></div>
  )
}

export default Menu;
