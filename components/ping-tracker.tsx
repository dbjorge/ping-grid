import useSWR from 'swr'
import { useState } from 'react';
import { PingResult } from '../types/ping-types';
import { PingGraph } from './ping-graph';

const pingFetcher = (endpoint: string): Promise<PingResult> =>
    fetch(`/api/ping?endpoint=${endpoint}`)
        .then(r => r.json())
        .then(j => ({ ...j, clientTimestampMs: getCurrentTimeMs() }));

function getCurrentTimeMs(): number {
    return new Date().getTime();
}

type PingTrackerProps = {
    endpoint: string;
    windowMs: number;
    width: number;
    height: number;
};

export function PingTracker(props: PingTrackerProps) {
    const { endpoint, windowMs } = props;
    const currentTimeMs = getCurrentTimeMs();
    const cutoffTimeMs = currentTimeMs - windowMs;

    const [ pingHistory, setPingHistory ] = useState<PingResult[]>([]);
    const { data: pingResult, error } = useSWR(endpoint, pingFetcher, {
        dedupingInterval: 500,
        refreshInterval: 1000,
    });

    let updatedPingHistory = pingHistory.filter(h => h.timestampMs >= cutoffTimeMs);
    if (pingHistory.length !== updatedPingHistory.length) {
        setPingHistory(updatedPingHistory);
    }
    if (pingResult && !error && (pingHistory.length === 0 || pingHistory[0].timestampMs !== pingResult.timestampMs)) {
        updatedPingHistory = [pingResult, ...updatedPingHistory];
        setPingHistory(updatedPingHistory);
    }

    return <>
        <style jsx>{`
            .title {
                font-size: 18px;
            }
            .container {
                border: 1px solid;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `}</style>

        <div className="container">
            <h2 className="title">{endpoint}</h2>
            <PingGraph pingHistory={updatedPingHistory} width={props.width} height={props.height} />
            { error ? <div>{error.message}</div> : null }
        </div>
    </>;
}