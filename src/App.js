import logo from './logo.svg';
import './App.css';
//import { TableSearch } from './components/TableSearch';
import { PaginationTable } from './components/PaginationTable';
import Popup from 'reactjs-popup';
import TestModal from './components/TestModal'

function App() {
  return (
    <div className="App">
     <PaginationTable/>
      <TestModal/>
    
    </div>
  );
}

export default App;
