import {useState} from "react";
import * as d3 from "d3";
import ChartDraw from "./ChartDraw";
import ErrorMassage from "./ErrorMassage";

const Chart = (props) => {
    const [ox, setOx] = useState("country");
    const [oy, setOy] = useState([true, false]);
    const [type, setType] = useState(0);
    const handleSubmit = (event) => {
        event.preventDefault();
        setOx(event.target["ox"].value);
        setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])
        setType(event.target["type"].value)
    }
    const createArrGraph =(data, key)=>{
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['height']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        if(ox==='year'){
            arrGraph.sort((first, second) =>{
                let firstNum=Number(first.labelX);
                let secondNum=Number(second.labelX);
                return firstNum-secondNum;
            })
        }
        return arrGraph;
    }
    let errorMassage=''
    if(!oy[0] && !oy[1]){
        errorMassage='Ошибка! Выберите хоты бы одно значение по оси OY'
    } else errorMassage=''
    console.log(type)
    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="country" defaultChecked={ox === "country"}/>
                    Страна
                    <br/>
                    <input type="radio" name="ox" value="year" />
                    Год
                </div>

                <p> Значение по оси OY </p>
                <div>
                    <input type="checkbox" name="oy" defaultChecked={oy[0] === true}/>
                    Минимальная высота
                    <br/>
                    <input type="checkbox" name="oy" />
                    Максимальная высота
                </div>

                <p>Тип графика</p>
                <div>
                <select id="selectTypeGraph" name='type'>
                <option value="0">Точечная</option>
                <option value="1">Гистограмма</option>
                </select>
                </div>


                <p>
                    <button type="submit">Построить</button>
                    <ErrorMassage massage={errorMassage}/>
                </p>
            </form>
            <ChartDraw data={ createArrGraph(props.data, ox) } oy={oy} type={type}/>
        </>
    )
}

export default Chart;