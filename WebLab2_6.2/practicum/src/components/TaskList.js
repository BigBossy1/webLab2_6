const TaskList = (props)=>{
    const elements = props.data.map((item, index) => <div id={`${item==='Нулевой' ? 0 : item==='Первый' ? 1 : item==='Второй' ? 2 : 3}`} className='element' onClick={props.onClick}>{item}</div>)
    return (
        <>
            {elements}
        </>
    )
}
export default TaskList