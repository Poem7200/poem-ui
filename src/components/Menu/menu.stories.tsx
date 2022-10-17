import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Menu from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";

const menuMeta: ComponentMeta<typeof Menu> = {
  component: Menu,
  subcomponents: { 'SubMenu': SubMenu, 'MenuItem': MenuItem },
  title: "Menu 菜单",
  args: {
    // 这里也可以使用args，但是优先级比单个的低
    defaultIndex: '1'
  },
  // argTypes: {
  //   defaultIndex: {
  //     control: 'color',
  //     description: 'normal test'
  //   }
  // },
  parameters: {
    controls: {
      // 这里让mode这个属性用date控件控制了
      matchers: {
        date: /mode$/
      }
    }
  }
}
export default menuMeta

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args} >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem> 
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>    
    </SubMenu>
  </Menu>
)

export const ADefaultMenu = Template.bind({})
ADefaultMenu.args = {}
ADefaultMenu.storyName = '默认Menu'

export const BClickMenu = Template.bind({})
BClickMenu.args = {
  mode: 'vertical'
}
BClickMenu.storyName = '纵向的 Menu'

export const COpenedMenu = Template.bind({})
COpenedMenu.args = {
  mode: 'vertical',
  defaultOpenSubMenus: ['3']
}
COpenedMenu.argTypes = {
  // 可以控制具体的控制器类型，例如下方的color取色器
  // defaultIndex: {
  //   control: 'color'
  // }
}
// 这里写的是单个story的parameters控制
COpenedMenu.parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' }
    ]
  }
}
COpenedMenu.storyName = '默认展开的纵向 Menu'
