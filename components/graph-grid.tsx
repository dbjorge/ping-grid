import { Component } from "react";
import * as d3 from "d3";
import { findDOMNode } from "react-dom";

export type GraphGridProps = {
    height: number;
    width: number;
    axis: any;
    axisType: 'x'|'y';
}

export class GraphGrid extends Component<GraphGridProps> {
    private renderGrid = () => {
        const { axis, width } = this.props;
        const grid = axis.tickFormat(() => '').tickSize(-width);
        const thisDomNode = findDOMNode(this);
        d3.select(thisDomNode as any).call(grid);
    };

    public componentDidUpdate = this.renderGrid;
    public componentDidMount = this.renderGrid;
 
    public render = () => {
        const heightTranslate = `translate(0,${this.props.height})`;
        const translate = this.props.axisType === 'x' ? heightTranslate : '';
 
        return <>
            <style jsx>{`
                .grid :global(.tick) {
                    stroke: #4b5f87;
                    opacity: 1;
                }
            `}</style>
            <g className="grid" transform={translate} />
        </>;
    };
}
