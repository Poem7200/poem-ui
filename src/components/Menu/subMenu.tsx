import classNames from "classnames";
import React, { FC, FunctionComponentElement, MouseEvent, ReactNode, useContext, useState } from "react";
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
  children?: ReactNode;
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const [menuOpen, setMenuOpen] = useState(false);

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
          index
        })
      }
      else {
        console.error('Warning: Submenu has a child which is not MenuItem')
      }
    });

    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
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