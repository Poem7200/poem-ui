import React from "react";
import Button from "./button";
// import mdx from './button.mdx'

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 这个是总的button
// 删除mdx里面的stories是为了避免被识别成story，这里只用该文件进行文档的编写
const buttonMeta: ComponentMeta<typeof Button> = {
  component: Button,
  title: 'Button 按钮',
  parameters: {
    docs: {
      // page: mdx
    }
  }
}

export default buttonMeta

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
)

export const Default = Template.bind({})
Default.args = {
  children: 'Default Button'
}
Default.storyName = 'Default'
// 在该story外部包裹一层，接收原来的story，返回一个新的story
Default.decorators = [
  (Story) => (
    <div style={{ margin: '30px' }}><Story /></div>
  )
]

export const ButtonLarge = Template.bind({})
ButtonLarge.args = {
  size: 'lg',
  children: 'Large Button'
}
ButtonLarge.storyName = 'Large'

export const ButtonSmall = Template.bind({})
ButtonSmall.args = {
  size: 'sm',
  children: 'Small Button'
}
ButtonSmall.storyName = 'Small'

export const ButtonPrimary = Template.bind({})
ButtonPrimary.args = {
  btnType: 'primary',
  children: 'Primary Button'
}
ButtonPrimary.storyName = 'Primary'

export const ButtonDanger = Template.bind({})
ButtonDanger.args = {
  btnType: 'danger',
  children: 'Danger Button'
}
ButtonDanger.storyName = 'Danger'

export const ButtonLink = Template.bind({})
ButtonLink.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'http://www.baidu.com'
}
ButtonLink.storyName = 'Link'

export const ButtonDisable = Template.bind({})
ButtonDisable.args = {
  disabled: true,
  children: 'Disable Button'
}
ButtonDisable.storyName = 'Disable'
