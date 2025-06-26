/*
   компонент, для фильтрации таблицы
*/

const Filter = (props) => {

    const handleReset = (event) => {
        props.filtering(props.fullData)
        props.setWasSorted(false);
    }

    const handleSubmit= (event) => {
        event.preventDefault();
        props.setWasSorted(false);

        // создаем словарь со значениями полей формы
        const filterField = {
            "name": event.target["name"].value.toLowerCase(),
            "type": event.target["type"].value.toLowerCase(),
            "country": event.target["country"].value.toLowerCase(),
            "maxSpeed": [event.target["maxSpeedFrom"].value.toLowerCase(), event.target["maxSpeedTo"].value.toLowerCase() !== '' ? event.target["maxSpeedTo"].value.toLowerCase() : Number.MAX_SAFE_INTEGER],
            "year": [event.target["yearFrom"].value.toLowerCase(), event.target["yearTo"].value.toLowerCase() !== '' ? event.target["yearTo"].value.toLowerCase() : Number.MAX_SAFE_INTEGER],
            "height": [event.target["heightFrom"].value.toLowerCase(), event.target["heightTo"].value.toLowerCase() !== '' ? event.target["heightTo"].value.toLowerCase() : Number.MAX_SAFE_INTEGER]

        };

        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in  filterField) {
            arr = arr.filter(item =>
                key !== 'year' && key!=='height' && key!=='maxSpeed'? item[key].toLowerCase().includes(filterField[key]) : (item[key]-filterField[key][0])>=0 && (item[key]-filterField[key][1])<=0);
            if(key==='Год') console.log(filterField[key][1]==='')
        }

        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
    }
    return (
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <p>
                    <label>Название:</label>
                    <input name="name" type="text"/>
                </p>
                <p>
                    <label>Тип:</label>
                    <input name="type" type="text"/>
                </p>
                <p>
                    <label>Страна:</label>
                    <input name="country" type="text"/>
                </p>
                <p>
                    <label>Год от:</label>
                    <input name="yearFrom" type="number"/>
                </p>
                <p>
                    <label>Год до:</label>
                    <input name="yearTo" type="number"/>
                </p>
                <p>
                    <label>Высота от:</label>
                    <input name="heightFrom" type="number"/>
                </p>
                <p>
                    <label>Высота до:</label>
                    <input name="heightTo" type="number"/>
                </p>
                <p>
                    <label>Скорость от:</label>
                    <input name="maxSpeedFrom" type="number"/>
                </p>
                <p>
                    <label>Скорость до:</label>
                    <input name="maxSpeedTo" type="number"/>
                </p>
                <p>
                    <button type="submit">Фильтровать</button>
                    <button type="reset">Очистить фильтр</button>
                </p>
            </form>
    )
}


export default Filter;