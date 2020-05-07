import { PingHistory, PingResult } from '../types/ping-types';
import * as d3 from 'd3';
import { GraphAxis } from './graph-axis';
import { GraphGrid } from './graph-grid';
import { isNumber } from 'util';

function getCurrentTimeMs(): number {
    return new Date().getTime();
}

export type PingGraphProps = {
    width: number;
    height: number;
    pingHistory: PingHistory;
};

type GraphPoint = { x: number, y: number };

export function PingGraph(props: PingGraphProps) {
    const { width, height, pingHistory } = props;

    const currentTimestampMs = getCurrentTimeMs();

    const data: GraphPoint[] = pingHistory.map(ping => ({
        x: Math.round((ping.clientTimestampMs - currentTimestampMs) / 1000),
        y: isNumber(ping.pingMs) ? ping.pingMs : 500,.,
    }));

    const margin = {top: 5, right: 20, bottom: 20, left: 50};
    const transform='translate(' + margin.left + ',' + margin.top + ')';
    const dataWidth = width - (margin.left + margin.right);
    const dataHeight = height - (margin.top + margin.bottom);

    const x = d3.scaleLinear()
        .domain([-60, 0])
        .rangeRound([0, dataWidth]);

    const y = d3.scaleLinear()
        .domain([0, 500])
        .range([dataHeight, 0]);

    const line = d3.line<GraphPoint>()
        .x(d => x(d.x))
        .y(d => y(d.y));

    const xAxis = d3.axisBottom(x).ticks(5).tickFormat(d => `${d}s`);
    const yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `${d}ms`);

    return <div>
        <style jsx>{`
            .line {
                fill: none;
                stroke: #7dc7f4;
                stroke-width: 4px;
            }
            .shadow {
                filter: drop-shadow( 0px 2px 2px rgba(0,0,0,.3) );
            }
        `}</style>
        <svg width={width} height={height}>
            <g transform={transform}>
                <GraphAxis height={dataHeight} axis={xAxis} axisType="x" />
                <GraphAxis height={dataHeight} axis={yAxis} axisType="y" />

                <GraphGrid width={dataWidth} height={dataHeight} axis={yAxis} axisType="y" />

                <path className="line shadow" d={line(data)} strokeLinecap="round"/>
            </g>
        </svg>
    </div>;
}