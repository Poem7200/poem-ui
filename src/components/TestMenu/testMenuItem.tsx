import React, { CSSProperties, FC, ReactNode, useContext } from "react";
import classNames from "classnames";
import { TestMenuContext } from "./testMenu";

export interface ITestMenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const TestMenuItem: FC<ITestMenuItemProps> = (props) => {
  const { index, children, className, disabled, style } = props;
  const context = useContext(TestMenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index
  });

  const handleClick = () => {
    !disabled && context.onSelect && context.onSelect(index)
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>{children}</li>
  )
}

export default TestMenuItem;
