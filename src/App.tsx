import React from "react";
import Button from "./components/Button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/tabs";
import TabItem from "./components/Tabs/tabItem";
import Icon from "./components/Icon/icon";
// import icon collection
import { faCoffee, fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fas)

const App = () => {
  const handleSelect = (index: string) => {
    console.log(index);
  }
  
  return (
    <div className="App">
      <Button>test</Button>
      <div className="mx-10">
        <Button>test12</Button>
        <Button>test123</Button>
      </div>
      <Button>test</Button>
    </div>
  );
};

export default App;
