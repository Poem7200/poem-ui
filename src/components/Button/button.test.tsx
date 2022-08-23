import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}

const linkProps: ButtonProps = {
  btnType: 'link',
  href: 'http://www.baidu.com'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test button component', () => {
  it('should render correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>test button</Button>);
    const element = wrapper.getByText('test button');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect((element as any).disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  })

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>test button</Button>);
    const element = wrapper.getByText('test button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary btn-lg klass');
  })

  it('should render a link when btnType is link and href provided', () => {
    const wrapper = render(<Button {...linkProps}>test link button</Button>);
    const element = wrapper.getByText('test link button');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass('btn btn-link');
  })

  it('should avoid click event fired when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>test disable button</Button>);
    const element = wrapper.getByText('test disable button');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
})
