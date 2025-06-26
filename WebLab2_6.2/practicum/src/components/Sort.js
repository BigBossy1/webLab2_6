import React from 'react';

const Sort = (props) => {

    const sortFunction = (a, b) => {
        if (a[firstLevel] > b[firstLevel]) {
            return firstLevelDesc ? -1 : 1;
        } else if (a[firstLevel] < b[firstLevel]) {
            return !firstLevelDesc ? -1 : 1;
        } else if (secondLevel !== "no") {
            if (a[secondLevel] > b[secondLevel]) {
                return secondLevelDesc ? -1 : 1;
            } else if (a[secondLevel] < b[secondLevel]) {
                return !secondLevelDesc ? -1 : 1;
            } else if (thirdLevel !== "no") {
                if (a[thirdLevel] > b[thirdLevel]) {
                    return thirdLevelDesc ? -1 : 1;
                } else if (a[thirdLevel] < b[thirdLevel]) {
                    return !thirdLevelDesc ? -1 : 1;
                }
                return 0;
            }
        }
        return 0;
    }

    const handleClear = (event) => {
        setFirstLevel("no");
        setSecondLevel("no");
        setThirdLevel("no");

        setFirstLevelDesc(false);
        setSecondLevelDesc(false);
        setThirdLevelDesc(false);

        props.sorting([...savedData]);
        props.setWasSorted(false);
    }

    const handleApply = (event) => {
        if (firstLevel === "no") {
            return;
        }
        if (!props.wasSorted) {
            setSavedData([...props.data]);
            props.setWasSorted(true);
        }
        const sortedData = [...props.data].sort(sortFunction);

        props.sorting(sortedData);
    }

    const [firstLevel, setFirstLevel] = React.useState("no");
    const [secondLevel, setSecondLevel] = React.useState("no");
    const [thirdLevel, setThirdLevel] = React.useState("no");

    const [firstLevelDesc, setFirstLevelDesc] = React.useState(false);
    const [secondLevelDesc, setSecondLevelDesc] = React.useState(false);
    const [thirdLevelDesc, setThirdLevelDesc] = React.useState(false);

    const [options, setOptions] = React.useState({no:"Нет", ...props.options});
    const [savedData, setSavedData] = React.useState([]);

    return (
        <>
            <div>
                <select value={firstLevel} onChange={(e) => {
                    setFirstLevel(e.target.value);
                    if (e.target.value === "no") {
                        setSecondLevel("no");
                        setThirdLevel("no");
                    }
                }}>
                    {Object.entries(options).map(([key, value], i) => (
                        <option key={i} value={key}>{value}</option>
                    ))}
                </select>
                <input type="checkbox" checked={firstLevelDesc}
                       onChange={(e) => setFirstLevelDesc(!firstLevelDesc)} />
                <label>по убыванию?</label>
            </div>
            <div>
                <select value={secondLevel} disabled={firstLevel === "no"} onChange={(e) => {
                    setSecondLevel(e.target.value);
                    if (e.target.value === "no") {
                        setThirdLevel("no");
                    }
                }}>
                    {
                        Object.entries(options).filter(([key, value]) => key !== firstLevel || key==="no")
                            .map(([key, value], i) =>
                                (
                                    <option key={i} value={key}>{value}</option>
                                ))
                    }
                </select>
                <input type="checkbox" checked={secondLevelDesc}
                       onChange={(e) => setSecondLevelDesc(!secondLevelDesc)} />
                <label>по убыванию?</label>
            </div>
            <div>
                <select value={thirdLevel} disabled={secondLevel === "no" || firstLevel === "no"} onChange={(e) => setThirdLevel(e.target.value)}>
                    {
                        Object.entries(options).filter(([key, value]) => (key !== secondLevel && key !== firstLevel) || key==="no")
                            .map(([key, value], i) =>
                                (
                                    <option key={i} value={key}>{value}</option>
                                ))
                    }
                </select>
                <input type="checkbox" checked={thirdLevelDesc}
                       onChange={(e) => setThirdLevelDesc(!thirdLevelDesc)} />
                <label>по убыванию?</label>
            </div>
            <div style={{marginTop: "10px"}}>
                <button onClick={handleApply}>Применить</button>
                <button onClick={handleClear}>Очистить сортировку</button>
            </div>
        </>
    );
};

export default Sort;