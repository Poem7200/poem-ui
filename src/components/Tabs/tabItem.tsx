import React, { FC, ReactNode } from "react";

export interface TabItemProps {
  label: string | ReactNode;
  index?: number;
  disabled?: boolean;
  children?: ReactNode;
}

const TabItem: FC<TabItemProps> = (props: TabItemProps) => {
  const { label, index, disabled, children } = props;

  return (
    <div className="tab-item">
      <div>{ label }</div>
    </div>
  )
}

TabItem.displayName = 'TabItem'

TabItem.defaultProps = {
  disabled: false
}

export default TabItem;
