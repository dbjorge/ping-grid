import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const endpoint = req.query['endpoint'];
    const serverTimestampMs = new Date().getTime();
    const pingMs = Math.random()*500;

    res.status(200).json({ endpoint, serverTimestampMs, pingMs });
}