import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { ehNecessarioAtualizar } from './classificacao';
import { fetchPartidaId } from '@/fetchReqs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {

            const dataPartidaId = await prisma.atualizacoes.findUnique({
                where: { id: 1, }
            })

            if (ehNecessarioAtualizar(dataPartidaId?.dataPartidaId)) {
                await fetchPartidaId()
                await prisma.atualizacoes.update({
                    where: { id: 1, },
                    data: { dataPartidaId: new Date() }
                })
            }

            const partidas = await prisma.partidaId.findMany({
                orderBy: { dataRealizacao: 'desc' },
            });

            res.status(200).json(partidas);
        } catch (error) {
            console.error('Erro ao buscar partidas:', error);
            res.status(500).json({ error: 'Erro ao buscar dados das partidas' });
        }
    } else {
        res.status(405).end();
    }
}