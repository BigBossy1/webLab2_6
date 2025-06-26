import React, {useState} from 'react';
import Filter from "./Filter";
import Sort from "./Sort";
import {tableHeaderNames} from "../data";
import Chart from "./Chart";
//import Chart from "./Chart";

const Tabs = (props) => {

    const handleToggle = (event) => {
        setActiveTab(event.currentTarget.value);
    }

    const [activeTab, setActiveTab] = React.useState("filter");

    //Для сброса сортировки
    const [wasSorted, setWasSorted] = useState(false);

    return (
        <div className="styledBlock">
            <div className="tabMenu">
                <button className={activeTab==="filter" ? "selected" : ""} onClick={handleToggle} value="filter">Фильтр</button>
                <button className={activeTab==="sort" ? "selected" : ""} onClick={handleToggle} value="sort">Сортировка</button>
                <button className={activeTab==="graph" ? "selected" : ""} onClick={handleToggle} value="graph">График</button>
            </div>
            <div className={activeTab==="filter" ? "show" : "hide"}>
                <h4>Фильтры</h4>
                <Filter filtering={props.updateDataTable} data={props.dataTable} fullData={props.fullData}
                        setWasSorted={setWasSorted} />
            </div>
            <div className={activeTab==="sort" ? "show" : "hide"}>
                <h4>Сортировка</h4>
                <Sort sorting={props.updateDataTable} options={tableHeaderNames} data={props.dataTable}
                      wasSorted={wasSorted} setWasSorted={setWasSorted}/>
            </div>
            <div className={activeTab==="graph" ? "show" : "hide"}>
                <h4>График</h4>
                <Chart data={props.dataTable}/>
            </div>

        </div>
    );
};

export default Tabs;