import * as d3 from "d3";
import React from "react";
interface ChartData {
  date: Date;
  value: number;
}
function LinearChart({
  chartData,
}: {
  chartData: {createdAt: string; value: number; productId: string}[];
}) {
  const svgRef = React.useRef(null);

  function LineChart(
    data: ChartData[],
    {
      x = ([x]: string[]) => x, // given d in data, returns the (temporal) x-value
      y = ([y]: number[]) => y, // given d in data, returns the (quantitative) y-value
      defined, // for gaps in data
      curve = d3.curveLinear, // method of interpolation between points
      marginTop = 20, // top margin, in pixels
      marginRight = 30, // right margin, in pixels
      marginBottom = 30, // bottom margin, in pixels
      marginLeft = 40, // left margin, in pixels
      width = 640, // outer width, in pixels
      height = 500, // outer height, in pixels
      xType = d3.scaleUtc, // the x-scale type
      xDomain, // [xmin, xmax]
      xRange = [marginLeft, width - marginRight], // [left, right]
      yType = d3.scaleLinear, // the y-scale type
      yDomain, // [ymin, ymax]
      yRange = [height - marginBottom, marginTop], // [bottom, top]
      yFormat, // a format specifier string for the y-axis
      yLabel, // a label for the y-axis
      color = "currentColor", // stroke color of line
      strokeLinecap = "round", // stroke line cap of the line
      strokeLinejoin = "round", // stroke line join of the line
      strokeWidth = 2, // stroke width of line, in pixels
      strokeOpacity = 1, // stroke opacity of line
    }: any = {},
  ) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const I = d3.range(X.length) as number[];

    if (defined === undefined)
      defined = (d: ChartData, i: number) => !isNaN(X[i] as number) && !isNaN(Y[i] as number);

    const D: boolean[] = d3.map(data, defined);

    // Compute default domains.
    if (xDomain === undefined) xDomain = d3.extent(X as string[]);
    if (yDomain === undefined) yDomain = [0, d3.max(Y as number[])];

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(width / 80)
      .tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    // Construct a line generator.
    const line = d3
      .line()
      .defined((i: any) => D[i])
      .curve(curve)
      .x((i: any) => xScale(X[i]))
      .y((i: any) => yScale(Y[i]));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr(
        "style",
        "max-width: 100%; height: auto; height: intrinsic;overflow: visible;padding-top: 20px;",
      );

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call((g: any) => g.select(".domain").remove())
      .call((g: any) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1),
      )
      .call((g: any) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel)
          .attr("style", "transform: translate(0rem,-1em);font-size: 14px;opacity: 0.8;"),
      );

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", line(I as any));
  }
  React.useEffect(() => {
    const parseTime = d3.timeParse("%d/%m/%Y");
    const formattedData = chartData.map(
      (price): ChartData => ({
        date: parseTime(new Date(price.createdAt).toLocaleDateString("en-US")) as Date,
        value: price.value,
      }),
    );

    LineChart(formattedData, {
      x: (d: ChartData) => d.date,
      y: (d: ChartData) => d.value,
      yLabel: `Registros (${formattedData.length})`,
      width: 1250,
      height: 500,
      color: "var(--secondary)",
      yFormat: "$100.2f",
      marginLeft: 50,
    });
  }, []);

  return <svg ref={svgRef} />;
}

export default LinearChart;
