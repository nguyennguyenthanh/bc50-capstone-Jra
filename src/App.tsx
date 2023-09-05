import './App.css';
import { Routes, BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { createBrowserHistory } from 'history';
import renderRoutes from './routes';
import LoadingComponent from './GlobalSetting/Loading/LoadingComponent';

export const history: any = createBrowserHistory();

function App() {

  return (
    <Suspense fallback={<LoadingComponent />}>
      <BrowserRouter >
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
