import React, { ButtonHTMLAttributes } from "react";
import classNames from 'classnames';

export type ButtonSize = "lg" | "sm";

export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  /** 禁用状态  */
  disabled?: boolean;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 按钮类型：普通、默认、警告、链接 */
  btnType?: ButtonType;
  children: React.ReactNode;
  /** 跳转链接地址：适用于链接类型 */
  href?: string; // for link type
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 页面中最常用的按钮元素，支持HTML button 和 a标签两种格式
 * ### 引用方法
 * ```js
 * import { Button } from 'poem-ui'
 * ```
 */
export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
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
