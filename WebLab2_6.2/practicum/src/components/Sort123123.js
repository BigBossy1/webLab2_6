import SortSelect from "./SortSelect";

const Sort = (props) =>{


    const handleSubmit= (event) => {
        event.preventDefault();
        let createSortArr = (data) => {
            let sortArr = [];
            let sortSelects = data.getElementsByTagName('select');
            for (let i = 0; i < sortSelects.length; i++) {
                let keySort = sortSelects[i].value;
                if (keySort == "Нет") {
                    break;
                }
                let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
                sortArr.push(
                    {column: keySort,
                        order: desc}
                );
            }
            return sortArr;
        };

        const sortArr=createSortArr(event.target)
        if (sortArr.length===0) {
            console.log('12312312312')
            props.sorting(props.data)

        } else{
        let arr=props.data;
        arr.sort((first, second) =>{
            for(let i in sortArr) {
                let key = sortArr[i].column;

                if(key===3 || key===4 || key===5){
                    let firstNum=Number(first[key])
                    let secondNum=Number(second[key])
                    if(firstNum > secondNum){
                        return !sortArr[i].order ? 1:-1
                    } else if(firstNum < secondNum){
                        return !sortArr[i].order ? -1: 1
                    }
                }else{
                    if (first[key] > second[key]) {
                        return !sortArr[i].order ? 1 : -1;
                    } else if (first[key] < second[key]){
                        return !sortArr[i].order ? -1 : 1;
                    }
                }
            }

        })
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        //props.filtering(arr);
        props.sorting(arr);
        }
    }
    return (
        <details>
            <summary>Сортировка</summary>
            <form name="form" id="sort" onSubmit={handleSubmit}>
                <p>
                    Первый уровень:
                    <SortSelect data={props.fullData[0]} id="fieldsFirst"/>
                    По убыванию?<input type="checkbox" id="fieldsFirstDesc"/>
                </p>
                <p>
                    Второй уровень:
                    <SortSelect data={props.fullData[0]} id="fieldsSecond"/>
                    По убыванию?<input type="checkbox" id="fieldsSecondDesc"/>
                </p>
                <p>
                <button type="submit">Отсортировать</button>
                <button type="reset">Очистить</button>
                </p>
            </form>
        </details>
    )
}



export default Sort