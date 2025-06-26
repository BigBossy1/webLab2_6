import * as d3 from "d3";
import { useRef, useEffect, useState, useMemo } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // заносим в состояния ширину и высоту svg-элемента
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });
    // задаем отступы в svg-элементе
    const  margin = {
        top:10,
        bottom:60,
        left:40,
        right:10
    };

    // вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        // выводим прямоугольник,
        svg
            .append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width",  boundsWidth)
            .attr("height",  boundsWidth)
            .style("fill", "lightgrey");
    });
    console.log(props.data)
    const indexOY = 1; // диаграмма для максимальных значений
    let [min, max] = d3.extent(props.data.map(d => d.values[1]));

    // формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

    let graphMin = min - Math.sign(min)*(min * 0.15);
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        //рисуем график
        const colors=['red', 'blue']
        console.log(props.type)
        if(props.type==0){

            for(let i=0; i<props.oy.length; i++){
               if(props.oy[i]){
               svg .selectAll(".dot")
                  .data(props.data)
                  .enter()
                  .append("circle")
                   .attr("r", 5)
                   .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                  .attr("cy", d => scaleY(d.values[i] ) )
                  .attr("transform", `translate(${margin.left}, ${margin.top})`)
                  .style("fill", colors[i])
               }
        }
        }
        if(props.type==1){
            for(let i=0; i<props.oy.length; i++){
                if(props.oy[i]){
                    svg .selectAll(".dot")
                        .data(props.data)
                        .enter()
                        .append("line")
                        .attr('x1', d=> scaleX(d.labelX) + i*2 + scaleX.bandwidth() / 2)
                        .attr('y1', scaleY(graphMin))
                        .attr('x2', d=> scaleX(d.labelX) + i*2 + scaleX.bandwidth() / 2)
                        .attr('y2', d=> scaleY(d.values[i]))
                        .attr("transform", `translate(${margin.left},
                         ${margin.top})`)
                        .style("stroke", colors[i])
                        .style("stroke-width", 3)
                }
            }
        }


    }, [scaleX, scaleY, props.data]);

    return (
        <svg ref={ chartRef }>  </svg>
    )
}

export default ChartDraw;