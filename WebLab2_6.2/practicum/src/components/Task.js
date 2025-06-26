import TaskList from "./TaskList";
import {useState} from "react";

const Task = (props) => {
    const [elementsTop, setElementsTop] = useState(props.data)
    const [elementsBot, setElementsBot]= useState([])
    const [topElement, setTopElement] = useState(10)
    let flag=true
    let constId=0
    const change=(event)=>{
        setTopElement(event.target.id)
        let elementsBot1=[]
        let elementsTop2=[]
        for(let key in props.data){
            if(topElement===10){
                elementsTop2.push(props.data[key])
            } else {
                if (key === topElement) elementsTop2.push(props.data[key])
            else elementsBot1.push(props.data[key])
            }
        }
        setElementsTop(elementsTop2)
        setElementsBot(elementsBot1)
    }


    return(
        <>
            <div className='topList'>
                <TaskList data={elementsTop} onClick={change}/>
            </div>
            <div className='botList'>
                <TaskList data={elementsBot} onClick={change}/>
            </div>
        </>
    )
}
export default Task