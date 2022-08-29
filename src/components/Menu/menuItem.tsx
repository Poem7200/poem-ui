import React, { CSSProperties, FC, ReactNode } from "react";
import classNames from "classnames";

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const MenuItem: FC<MenuItemProps> = (props: MenuItemProps) => {
  const { index, disabled, className, style, children } = props;
  const classes = classNames('menu-item', classNames, {
    'is-disabled': disabled
  });

  return (
    <li className={classes} style={style}>{children}</li>
  )
}

export default MenuItem;
