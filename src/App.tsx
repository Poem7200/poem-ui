import React from "react";
import Button from "./components/Button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

const App = () => {
  return (
    <div className="App">
      <div>
        <Button btnType="primary">primary</Button>
        <Button>default</Button>
        <Button btnType="danger">danger</Button>
        <Button btnType="link" href="www.baidu.com">
          link
        </Button>
        <Button size="lg">large</Button>
        <Button size="sm">small</Button>
      </div>
      <div>
        <Menu>
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
          <SubMenu title="3">
            <MenuItem>3-1</MenuItem>
            <MenuItem>3-2</MenuItem>
          </SubMenu>
        </Menu>
        <Menu mode="vertical">
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
          <SubMenu title="3">
            <MenuItem>3-1</MenuItem>
            <MenuItem>3-2</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default App;
