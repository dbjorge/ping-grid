import { Component } from "react";
import * as d3 from "d3";
import { findDOMNode } from "react-dom";

export type GraphAxisProps = {
    height: number;
    axis: any;
    axisType: 'x'|'y';
}

export class GraphAxis extends Component<GraphAxisProps> {
    private renderAxis = () => {
        const thisDomNode = findDOMNode(this);
        d3.select(thisDomNode as any).call(this.props.axis);
    };

    public componentDidUpdate = this.renderAxis;
    public componentDidMount = this.renderAxis;
 
    public render = () => {
        const heightTranslate = `translate(0,${this.props.height})`;
        const translate = this.props.axisType === 'x' ? heightTranslate : '';
 
        return <>
            <style jsx>{`
                .axis {
                    fill: #E0E0E0;
                    opacity: 1;
                }
                .axis path,
                .axis line {
                    fill: none;
                    stroke: none;
                    shape-rendering: crispEdges;
                }

                .axis text {
                    font-size: 14px;
                }
            `}</style>
            <g className="axis" transform={translate} />
        </>;
    };
}
