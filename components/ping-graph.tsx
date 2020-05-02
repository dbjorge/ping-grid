import useSWR from 'swr'
import { useState } from 'react';
import { inspect } from 'util';

const pingFetcher = endpoint => fetch(`/api/ping?endpoint=${endpoint}`)
    .then(r => r.json())
    .then(j => ({ ...j, timestampMs: getCurrentTimeMs() }))

type PingResult = {
    timestampMs: number;
    pingMs: number;
};

type PingGraphProps = {
    endpoint: string,
    windowMs: number;
};

function getCurrentTimeMs(): number {
    return new Date().getTime();
}

export function PingGraph(props: PingGraphProps) {
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
    if (pingResult && (pingHistory.length === 0 || pingHistory[0].timestampMs !== pingResult.timestampMs)) {
        updatedPingHistory = [pingResult, ...updatedPingHistory];
        setPingHistory(updatedPingHistory);
    }

    return <>
        <style jsx>{`
            .container {
                border: 1px solid;
            }
        `}</style>

        <div className="container">
            <h2>{endpoint}</h2>
            <div>Last updated: { pingHistory.length > 0 ? pingHistory[0].timestampMs : 'never' }</div>
            <div>{ inspect(pingHistory) }</div>
            { error ? <div>{error}</div> : null }
        </div>
    </>;
}