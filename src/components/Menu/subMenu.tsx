import classNames from "classnames";
import React, { FC, FunctionComponentElement, MouseEvent, ReactNode, useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: ReactNode;
}

export const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const openSubMenus = context.defaultOpenSubMenus as string[];
  const isOpened = context.mode === 'vertical' && openSubMenus.includes(index as string) ? true : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  let timer: any;
  const handleMouse = (e: MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  }
  
  const clickEvent = context.mode === 'vertical' ? {
    onClick: (e: MouseEvent) => handleClick(e)
  } : {}
  const hoverEvent = context.mode !== 'vertical' ? {
    onMouseEnter: (e: MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: MouseEvent) => handleMouse(e, false)
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { type: { displayName } } = childElement;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      }
      else {
        console.error('Warning: Submenu has a child which is not MenuItem')
      }
    });

    return (
      // TODO: 关于transition没有添加，要补充上去
      <CSSTransition
        in={menuOpen}
        timeout={300}
        classNames='zoom-in-top'
        appear
      >
        <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
      </CSSTransition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu;
