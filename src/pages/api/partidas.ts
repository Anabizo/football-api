import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {

            const partidas = await prisma.partida.findMany({
                where: { status: 'finalizado' },
                orderBy: { data_realizacao: 'desc' },
                take: 10
            });

            console.log(partidas);
            res.status(200).json(partidas);
        } catch (error) {
            console.error('Erro ao buscar partidas:', error);
            res.status(500).json({ error: 'Erro ao buscar dados das partidas' });
        }
    } else {
        res.status(405).end();
    }
}
