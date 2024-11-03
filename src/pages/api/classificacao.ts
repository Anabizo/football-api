import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { fetchClassificacao } from '@/fetchReqs';

export const ehNecessarioAtualizar = (dataClassificacao: Date | null | undefined) => {
    if (!dataClassificacao) {
        return true;
    }

    const dataClassificacaoDate = new Date(dataClassificacao);

    const dataAtual = new Date();

    const diferencaEmMilissegundos = dataAtual.getTime() - dataClassificacaoDate.getTime();

    const diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60);
    return diferencaEmHoras > 6;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {

            /*await prisma.atualizacoes.create({
                data: { id: 1, dataClassificacao: new Date("2023-01-01"), dataPartida: new Date("2023-01-01"), dataPartidaId: new Date("2023-01-01"), },
            })*/

            const dataClassificacao = await prisma.atualizacoes.findUnique({
                where: { id: 1, }
            })

            if (ehNecessarioAtualizar(dataClassificacao?.dataClassificacao)) {
                await fetchClassificacao()
                await prisma.atualizacoes.update({
                    where: { id: 1, },
                    data: { dataClassificacao: new Date() }
                })
            }
            const classificacao = await prisma.estatisticas.findMany({
                orderBy: { posicao: 'asc' },
                include: {
                    time: true,
                    campeonato: true
                },
            });
            res.status(200).json(classificacao);
        } catch (error) {
            console.error('Erro ao buscar classificação:', error);
            res.status(500).json({ error: 'Erro ao buscar dados da classificação' });
        }
    } else {
        res.status(405).end();
    }
}