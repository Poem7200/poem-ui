import React from 'react';
import Button from './components/Button';

const App = () => {
  return (
    <div className="App">
      <Button btnType='primary'>primary</Button>
      <Button>default</Button>
      <Button btnType='danger'>danger</Button>
      <Button btnType='link' href='www.baidu.com'>link</Button>
      <Button size='lg'>large</Button>
      <Button size='sm'>small</Button>
    </div>
  );
}

export default App;
