// pages/api/partida/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // verifique o caminho para o prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const partida = await prisma.partidaId.findUnique({
                where: { id: Number(id) }, // use partida_id se esse for o seu identificador
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
