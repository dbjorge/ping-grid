export type PingApiResult = {
    endpoint: string;
    timestampMs: number;
    pingMs: number | 'unknown';
};

export type PingResult = PingApiResult & { clientTimestampMs: number };

export type PingHistory = PingResult[];

export type PingGraphProps = {
    endpoint: string;
    windowMs: number;
    width: number;
    height: number;
};
