import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Tabs from "./Tabs";
import Filter from "./Filter";
import Sort from "./Sort";


/*
 компонент, выводящий на страницу таблицу
 пропсы:
 data - данные для таблицы в виде массива объектов
*/
const Table = (props) => {
    const [activePage, setActivePage] = useState("1");
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
        const arr=Array.prototype.slice.call(document.getElementsByTagName('span'))
        arr.forEach((item) =>{
            item.className=''
        })
        event.target.className='selected'
    };
    const [dataTable, setDataTable] = useState(props.data);
    let updateDataTable = (value) => setDataTable(value);
    if(props.isPagination==='1'){

    //количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows);

    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>
        <span key={ index } onClick={ changeActive } className={item===1? "selected":''}> { item } </span>
    );
    return(
        <>

            <Tabs updateDataTable={updateDataTable} dataTable={dataTable} fullData={props.data}/>


            <table>
                <TableHead head={ Object.keys(props.data[0]) } />
                <TableBody body={ dataTable } amountRows={props.amountRows} numPage={activePage} />
            </table>

            <div>
                {pages}
            </div>
        </>
    )
    } else{
        return(
        <>
            <table>
                <TableHead head={Object.keys(props.data[0])}/>
                <TableBody body={props.data} amountRows={props.data.length} numPage='1'/>
            </table>
        </>
        )
    }
}


export default Table;