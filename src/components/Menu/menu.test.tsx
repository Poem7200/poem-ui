import React from "react";
import { cleanup, fireEvent, render, RenderResult } from "@testing-library/react";

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from "./subMenu";
import { wait } from "@testing-library/user-event/dist/utils";

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
      <SubMenu title="submenu">
        <MenuItem>test submenu item</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu .menu-opened {
      display: block;
    }
  `;
  const style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultMenuProps));
    // add style file to wrapper in order to apply dynamic style(show/hide)
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test-menu');
    // getElementsByTagName will get all elements which tagName is li, so use css scope to handle it
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('poem');
    fireEvent.click(thirdItem);
    expect(defaultMenuProps.onSelect).toHaveBeenCalledWith('2');
    expect(thirdItem).toHaveClass('menu-item is-active');
    expect(activeElement).not.toHaveClass('is-active');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(defaultMenuProps.onSelect).not.toHaveBeenCalledWith('1');
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(verticalMenuProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  })

  it('should show dropdown items when hover on subMenu', async () => {
    // css file has not been imported, should use a method to import part of it
    expect(wrapper.queryByText('test submenu item')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('submenu');
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('test submenu item')).toBeVisible();
    })
    fireEvent.click(wrapper.getByText('test submenu item'));
    expect(defaultMenuProps.onSelect).toHaveBeenCalledWith('3-0');
  })

  it('click submenu show menuitems when mode is vertical', async () => {
    cleanup();
    const wrapper = render(generateMenu(verticalMenuProps));
    wrapper.container.append(createStyleFile());
    expect(wrapper.queryByText('test submenu item')).not.toBeVisible();
    const subMenuItem = wrapper.getByText('submenu');
    fireEvent.click(subMenuItem);
    await wait(() => {
      expect(wrapper.queryByText('test submenu item')).toBeVisible();
    });
  })
  // TODO: vertical默认展示下拉菜单的情况
  it('show default open menu when mode is vertical and set openSubMenus', () => {})
})
