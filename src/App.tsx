import React from "react";
import Button from "./components/Button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

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
          <MenuItem index={0}>1</MenuItem>
          <MenuItem index={1}>2</MenuItem>
          <MenuItem index={2}>3</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default App;
