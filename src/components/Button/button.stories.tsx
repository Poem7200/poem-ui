import React from "react";
import Button from "./button";

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 这个是总的button
const buttonMeta: ComponentMeta<typeof Button> = {
  component: Button,
  title: 'Button 按钮'
}

export default buttonMeta

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
)

export const Default = Template.bind({})
Default.args = {
  children: 'DefaultButton'
}
Default.storyName = '默认按钮样式'

// TODO: 改用template+bind的模式写story
export const ButtonWithSize: ComponentStory<typeof Button> = () => (
  <>
    <Button size="lg">Large size</Button>
    <Button size="sm">Small size</Button>
  </>
)
ButtonWithSize.storyName = '不用尺寸的按钮'

export const ButtonWithType: ComponentStory<typeof Button> = () => (
  <>
    <Button>Default button</Button>
    <Button btnType="primary">Primary button</Button>
    <Button btnType="danger">Danger button</Button>
    <Button btnType="link" href="https://www.baidu.com">Link button</Button>
  </>
)
ButtonWithType.storyName = '不同类型的按钮'
