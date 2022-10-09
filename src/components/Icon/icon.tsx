import React, { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

// add theme color to icon
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: FC<IconProps> = (props: IconProps) => {
  const { theme, className, ...restProps } = props;
  
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme
  })
  
  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon
