import React from 'react';
import ProjectsList from './Components/Project/Project';
import { Route, Routes } from 'react-router-dom';
import { PartComponent } from './Components/Part/Part';
import { TaskComponent } from './Components/Task/Task';
import { MainLayout } from './Main.layout';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayout />}>
        <Route path='/' element={<ProjectsList />} />
        <Route path='/:id' element={<PartComponent />}/>
        <Route path='/part/:id' element={<TaskComponent />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
