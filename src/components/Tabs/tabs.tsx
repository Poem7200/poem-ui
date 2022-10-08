import classNames from "classnames";
import React, { FC, FunctionComponentElement, ReactNode, useState } from "react";
import { TabItemProps } from "./tabItem";

export type SelectCallback = (index: number) => void;

interface TabsProps {
  defaultIndex?: number;
  className?: string;
  children: ReactNode;
  onSelect?: SelectCallback;
  type?: 'line' | 'card'; // 两种展现模式
}

const Tabs: FC<TabsProps> = (props: TabsProps) => {
  const { defaultIndex, className, type, children, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const handleSelect = (index: number, disabled?: boolean) => {
    if (!disabled) {
      setActive(index);
      onSelect && onSelect(index);
    }
  }
  
  const tabClasses = classNames('tabs', className)
  const tabNavClasses = classNames('tabs-nav', {
    [`nav-${type}`]: type
  })
  // 从子元素里面提取出来label和disabled属性，建立一个横向的div包裹所有的label
  const renderNav = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      if (childElement.type.displayName === 'TabItem') {
        const { label, disabled } = childElement.props
        const navItemClasses = classNames('tabs-nav-item', {
          'is-active': currentActive === index,
          'disabled': disabled
        });
        // TODO: 完善点击的功能
        return <li onClick={() => handleSelect(index)} className={navItemClasses} key={`tab-nav-item-${index}`}>
          {label}
        </li>
      }
      else {
        console.error('Warning: Tabs should have children which named TabItem');
      }
    })
  }

  const renderContent = () => (
    React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      if (childElement.type.displayName === 'TabItem') {
        const { children } = childElement.props;
        if (currentActive === index) {
          return children
        }
      }
      else {
        console.error('Warning: Tabs should have children which named TabItem');
      }
    })
  )
  
  return (
    <div className={tabClasses}>
      <ul className={tabNavClasses}>{renderNav()}</ul>
      <div className="tabs-content">{renderContent()}</div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line'
}

export default Tabs;
