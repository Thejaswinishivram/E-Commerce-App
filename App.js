import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DataCollectionPages from './pages/DataCollectionPages';
import ProdRecordList from './productrecordlist/prodRecordList';


let theme = createTheme({
  palette: {
    primary: {
      main: '#400610',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
   <BrowserRouter>
   <Routes>
     <Route path='/' element={<DataCollectionPages/>}/>
     <Route path='/Record-list' element={<ProdRecordList/>}/>
   </Routes>
   </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;