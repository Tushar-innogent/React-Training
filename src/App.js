import './App.css';
// import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
// import { Header } from './Components/Netflix/Header';
// import AboutPage from './Components/react/AboutPage';
// import { MyButton } from './Components/react/myButton';
// // import {JavaScriptTraining} from '../src/Components/js/first';
// import { NewButton } from "./Components/react/stateHooks";
// import { Board } from './Components/react/ticTacToe';
// import { Flipcart } from './Components/Flipcart/FlipCart';
// import NasaComponent from './Components/Training/nasa';
// import FormSubmit from './Components/Training/submitData';
// import Screen from './Components/Training/screenProduct';
// import Display from './Components/Training/display';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayOne from './Components/Training/displayOne';
import Employee from './Components/Employee/Employee';

export default function App() {
  // const [count, setCount] = useState(0);

  // function handleClick() {
  //   setCount(count + 1);
  // }

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: [theme.defaultAlgorithm]
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Employee/>}></Route>
            <Route path='/screen/:id' element={<DisplayOne/>}></Route>
            {/* <Route path='/details/:id' element={<EmpDetails/>}></Route> */}
          </Routes>
        </BrowserRouter>

        <div className="App">
          {/* <h1>React App</h1> */}
          {/* <Header/> */}
          {/* <MyButton></MyButton> */}
          {/* <AboutPage></AboutPage> */}
          {/* <NewButton></NewButton> */}
          {/* <NewButton count={count} onClick={handleClick}/>
      <NewButton count={count} onClick={handleClick}/> */}
          {/* <Board/> */}
          {/* <Flipcart/> */}
          {/* <NasaComponent/>
       */}
          {/* <FormSubmit/> */}
          {/* <Display/> */}
        </div>
      </ConfigProvider>
    </>
  );
};
