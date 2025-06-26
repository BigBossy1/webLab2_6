import './CSS/App.css';
import airplanes from "./data";
import Table from './components/Table.js';
import Task from "./components/Task";


function App() {
  /*return (
      <div className="App">
        <h3>Самолёты</h3>
        <Table data={ airplanes } amountRows="15" isPagination='1'/>
      </div>
  );*/
    return(
        <div className="App">
            <Task data={['Нулевой', 'Первый', 'Второй', 'Третий']}/>
        </div>
    )
}

export default App;
