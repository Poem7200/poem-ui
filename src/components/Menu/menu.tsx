import React, { CSSProperties, FC, ReactNode } from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';

// Menu包括item和submenu
interface MenuProps {
  defaultIndex?: number; // menu的默认选中项（高亮）
  className?: string;
  mode?: MenuMode;
  style?: CSSProperties;
  children?: ReactNode;
  onSelect?: (selectedIndex: number) => void;
}

const Menu: FC<MenuProps> = (props: MenuProps) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props;
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical' // vertical as default
  })

  return (
    <ul className={classes} style={style}>{children}</ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0
}

export default Menu;
