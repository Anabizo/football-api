import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const classificacao = await prisma.estatisticas.findMany({
                orderBy: { posicao: 'asc' },
                include: {
                    time: true,
                    campeonato: true
                },
            });
            console.log(classificacao)
            res.status(200).json(classificacao);
        } catch (error) {
            console.error('Erro ao buscar classificação:', error);
            res.status(500).json({ error: 'Erro ao buscar dados da classificação' });
        }
    } else {
        res.status(405).end();
    }
}