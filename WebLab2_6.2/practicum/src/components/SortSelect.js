import React from "react";

const SortSelect=(props) =>{
    let data=Object.keys(props.data)
    // eslint-disable-next-line array-callback-return
    const options = data.map((item) =>
        <option name={item} value={item}> { item } </option>
    )
    return (
        <select id={props.id}>
            <option value='Нет'>Нет</option>
            {options}
        </select>
    )
}
export default SortSelect