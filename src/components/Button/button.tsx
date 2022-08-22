import React, { ButtonHTMLAttributes } from "react";
import classNames from 'classnames';

export type ButtonSize = "lg" | "sm";

export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string; // for link type
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { className, disabled, size, btnType, children, href, ...restProps } = props;
  
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled // use style control disable for link
  });
  
  if (btnType === 'link' && href) {
    return <a className={classes} href={href} {...restProps}>{children}</a>
  }
  
  return <button className={classes} disabled={disabled} {...restProps}>{children}</button>
}

Button.defaultProps = {
  disabled: false,
  btnType: "default"
}

export default Button;
