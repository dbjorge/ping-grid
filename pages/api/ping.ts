import { NextApiRequest, NextApiResponse } from 'next'
import ping from 'ping'
import { PingApiResult } from '../../types/ping-types';

export default async (req: NextApiRequest, res: NextApiResponse<PingApiResult>) => {
    const endpoint = req.query['endpoint'] as string;
    const timestampMs = new Date().getTime();
    const rawPingResult = await ping.promise.probe(endpoint, { timeout: '2', extra: ['-n', '1']});

    const pingMs = rawPingResult.time;
    
    res.status(200).json({ endpoint, timestampMs, pingMs });
}