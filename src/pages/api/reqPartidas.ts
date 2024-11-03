import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.FUTEBOL_API_KEY;

export interface Partida {
    partida_id: number;
    time_mandante: {
        time_id: number;
        nome_popular: string;
        sigla: string;
        escudo: string;
    };
    time_visitante: {
        time_id: number;
        nome_popular: string;
        sigla: string;
        escudo: string;
    };
    status: string;
    slug: string;
    data_realizacao: string;
    hora_realizacao: string;
    data_realizacao_iso: string;
    _link: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get('https://api.api-futebol.com.br/v1/campeonatos/10/partidas', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            const partidas: Record<string, Record<string, Partida[]>> = response.data.partidas['fase-unica'];

            const todasPartidas: Partida[] = Object.values(partidas)
                .flatMap((rodada) => Object.values(rodada).flat());

            const partidasFinalizadas: Partida[] = todasPartidas
                .filter((partida) => partida.status === 'finalizado')
                .sort((a, b) => new Date(b.data_realizacao_iso).getTime() - new Date(a.data_realizacao_iso).getTime())
                .slice(0, 10);

            for (const partida of partidasFinalizadas) {
                await prisma.partida.upsert({
                    where: { partida_id: partida.partida_id },
                    update: {
                        time_mandante_id: partida.time_mandante.time_id,
                        time_mandante_nome: partida.time_mandante.nome_popular,
                        time_mandante_sigla: partida.time_mandante.sigla,
                        time_mandante_escudo: partida.time_mandante.escudo,
                        time_visitante_id: partida.time_visitante.time_id,
                        time_visitante_nome: partida.time_visitante.nome_popular,
                        time_visitante_sigla: partida.time_visitante.sigla,
                        time_visitante_escudo: partida.time_visitante.escudo,
                        status: partida.status,
                        slug: partida.slug,
                        data_realizacao: new Date(partida.data_realizacao_iso),
                    },
                    create: {
                        partida_id: partida.partida_id,
                        time_mandante_id: partida.time_mandante.time_id,
                        time_mandante_nome: partida.time_mandante.nome_popular,
                        time_mandante_sigla: partida.time_mandante.sigla,
                        time_mandante_escudo: partida.time_mandante.escudo,
                        time_visitante_id: partida.time_visitante.time_id,
                        time_visitante_nome: partida.time_visitante.nome_popular,
                        time_visitante_sigla: partida.time_visitante.sigla,
                        time_visitante_escudo: partida.time_visitante.escudo,
                        status: partida.status,
                        slug: partida.slug,
                        data_realizacao: new Date(partida.data_realizacao_iso),
                    },
                });
            }

            const totalPartidas = await prisma.partida.count();
            if (totalPartidas > 10) {
                const partidasParaDeletar = await prisma.partida.findMany({
                    orderBy: { data_realizacao: 'desc' },
                    skip: 10,
                    select: { partida_id: true },
                });

                await prisma.partida.deleteMany({
                    where: {
                        partida_id: {
                            in: partidasParaDeletar.map((p) => p.partida_id),
                        },
                    },
                });
            }

            const filePath = path.join(process.cwd(), 'partidas.json');
            fs.writeFileSync(filePath, JSON.stringify(todasPartidas, null, 2), 'utf-8');

            console.log('Dados salvos em partidas.json');
            res.status(200).json({ message: 'Partidas atualizadas com sucesso' });
        } catch (error) {
            console.error('Erro ao buscar dados da fase:', error);
            res.status(500).json({ error: 'Erro ao buscar dados' });
        }
    } else {
        res.status(405).end();
    }
}

