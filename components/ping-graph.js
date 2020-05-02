import useSWR from 'swr'

const restJsonFetcher = url => fetch(url).then(r => r.json())

export function PingGraph({ endpoint }) {
    const { data, error } = useSWR(`/api/ping`, restJsonFetcher, {
        initialData: { text: 'Loading...' },
        refreshInterval: 3000
    });

    return <>
        <style jsx>{`
            .container {
                border: 1px solid;
            }
        `}</style>

        <div className="container">
            <h2>{endpoint}</h2>
            <div>{ data ? data.text : error }</div>
        </div>
    </>;
}