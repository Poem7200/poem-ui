import React, { CSSProperties, FC, ReactNode, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export const MenuItem: FC<MenuItemProps> = (props: MenuItemProps) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index
  });

  const handleSelect = () => {
    context.onSelect && !disabled && typeof index === 'string' && context.onSelect(index)
  }

  return (
    <li className={classes} style={style} onClick={handleSelect}>{children}</li>
  )
}

MenuItem.displayName = 'MenuItem';

export default MenuItem;
