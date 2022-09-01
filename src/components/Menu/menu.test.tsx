import React from "react";
import { cleanup, fireEvent, render, RenderResult } from "@testing-library/react";

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const defaultMenuProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test-menu'
}
const verticalMenuProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>poem</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultMenuProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test-menu');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('poem');
    fireEvent.click(thirdItem);
    expect(defaultMenuProps.onSelect).toHaveBeenCalledWith(2);
    expect(thirdItem).toHaveClass('menu-item is-active');
    expect(activeElement).not.toHaveClass('is-active');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(defaultMenuProps.onSelect).not.toHaveBeenCalledWith(1);
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(verticalMenuProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  })
})
