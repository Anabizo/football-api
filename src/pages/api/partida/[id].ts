import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const partida = await prisma.partidaId.findUnique({
                where: { id: Number(id) },
            });

            if (!partida) {
                return res.status(404).json({ error: 'Partida não encontrada' });
            }

            res.status(200).json(partida);
        } catch (error) {
            console.error('Erro ao buscar partida:', error);
            res.status(500).json({ error: 'Erro ao buscar dados da partida' });
        }
    } else {
        res.status(405).end();
    }
}
