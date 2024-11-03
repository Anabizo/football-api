import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { Cartao, Gol, Tecnico, JogadorTitular } from '../../types/interPartidaId'
import { ehNecessarioAtualizar } from './classificacao';
import { fetchPartidas } from '@/fetchReqs';

const apiKey = process.env.FUTEBOL_API_KEY;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const dataPartida = await prisma.atualizacoes.findUnique({
                where: { id: 1, }
            })

            if (ehNecessarioAtualizar(dataPartida?.dataPartida)) {
                await fetchPartidas()
                await prisma.atualizacoes.update({
                    where: { id: 1, },
                    data: { dataPartida: new Date() }
                })
            }


            const partidas = await prisma.partida.findMany({
                select: { partida_id: true },
            });

            if (partidas.length === 0) {
                throw new Error(`Nenhuma partida encontrada.`);
            }

            partidas.forEach(partida => {
                console.log(partida.partida_id);
            });


            const urls = partidas.map(partida => `https://api.api-futebol.com.br/v1/partidas/${partida.partida_id}`);

            const partidasData = [];

            for (const url of urls) {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                    },
                });

                partidasData.push(response.data);
            }

            const filePath = path.join(process.cwd(), 'partidasData.json');
            fs.writeFileSync(filePath, JSON.stringify(partidasData, null, 2), 'utf-8');

            const upsertPartidaIdPromises = partidasData.map(partidaData =>
                prisma.partidaId.upsert({
                    where: { id: partidaData.partida_id },
                    create: {
                        id: partidaData.partida_id,
                        timeMandanteNome: partidaData.time_mandante.nome_popular ?? "Desconhecido",
                        timeVisitanteNome: partidaData.time_visitante.nome_popular ?? "Desconhecido",
                        timeMandanteId: partidaData.time_mandante.time_id ?? 0,
                        timeVisitanteId: partidaData.time_visitante.time_id ?? 0,
                        placarMandante: partidaData.placar_mandante ?? 0,
                        placarVisitante: partidaData.placar_visitante ?? 0,
                        nomeEstadio: partidaData.estadio.nome_popular ?? "Desconhecido",
                        status: partidaData.status ?? "Desconhecido",
                        chutesMandante: partidaData.estatisticas.mandante.finalizacao.total ?? 0,
                        chutesVisitante: partidaData.estatisticas.visitante.finalizacao.total ?? 0,
                        chutesAGolMandante: partidaData.estatisticas.mandante.finalizacao.no_gol ?? 0,
                        chutesAGolVisitante: partidaData.estatisticas.visitante.finalizacao.no_gol ?? 0,
                        posseDeBolaMandante: partidaData.estatisticas.mandante.posse_de_bola ?? 0,
                        posseDeBolaVisitante: partidaData.estatisticas.visitante.posse_de_bola ?? 0,
                        passesMandante: partidaData.estatisticas.mandante.passes.total ?? 0,
                        passesVisitante: partidaData.estatisticas.visitante.passes.total ?? 0,
                        precisaoPassesMandante: partidaData.estatisticas.mandante.passes.precisao ?? 0,
                        precisaoPassesVisitante: partidaData.estatisticas.visitante.passes.precisao ?? 0,
                        faltasMandante: partidaData.estatisticas.mandante.faltas ?? 0,
                        faltasVisitante: partidaData.estatisticas.visitante.faltas ?? 0,
                        impedimentosMandante: partidaData.estatisticas.mandante.impedimentos ?? 0,
                        impedimentosVisitante: partidaData.estatisticas.visitante.impedimentos ?? 0,
                        escanteiosMandante: partidaData.estatisticas.mandante.escanteios ?? 0,
                        escanteiosVisitante: partidaData.estatisticas.visitante.escanteios ?? 0,
                        dataRealizacao: new Date(partidaData.data_realizacao_iso),
                    },
                    update: {
                        timeMandanteNome: partidaData.time_mandante.nome_popular ?? "Desconhecido",
                        timeVisitanteNome: partidaData.time_visitante.nome_popular ?? "Desconhecido",
                        timeMandanteId: partidaData.time_mandante.time_id ?? 0,
                        timeVisitanteId: partidaData.time_visitante.time_id ?? 0,
                        placarMandante: partidaData.placar_mandante ?? 0,
                        placarVisitante: partidaData.placar_visitante ?? 0,
                        nomeEstadio: partidaData.estadio.nome_popular ?? "Desconhecido",
                        status: partidaData.status ?? "Desconhecido",
                        chutesMandante: partidaData.estatisticas.mandante.finalizacao.total ?? 0,
                        chutesVisitante: partidaData.estatisticas.visitante.finalizacao.total ?? 0,
                        chutesAGolMandante: partidaData.estatisticas.mandante.finalizacao.no_gol ?? 0,
                        chutesAGolVisitante: partidaData.estatisticas.visitante.finalizacao.no_gol ?? 0,
                        posseDeBolaMandante: partidaData.estatisticas.mandante.posse_de_bola ?? 0,
                        posseDeBolaVisitante: partidaData.estatisticas.visitante.posse_de_bola ?? 0,
                        passesMandante: partidaData.estatisticas.mandante.passes.total ?? 0,
                        passesVisitante: partidaData.estatisticas.visitante.passes.total ?? 0,
                        precisaoPassesMandante: partidaData.estatisticas.mandante.passes.precisao ?? 0,
                        precisaoPassesVisitante: partidaData.estatisticas.visitante.passes.precisao ?? 0,
                        faltasMandante: partidaData.estatisticas.mandante.faltas ?? 0,
                        faltasVisitante: partidaData.estatisticas.visitante.faltas ?? 0,
                        impedimentosMandante: partidaData.estatisticas.mandante.impedimentos ?? 0,
                        impedimentosVisitante: partidaData.estatisticas.visitante.impedimentos ?? 0,
                        escanteiosMandante: partidaData.estatisticas.mandante.escanteios ?? 0,
                        escanteiosVisitante: partidaData.estatisticas.visitante.escanteios ?? 0,
                        dataRealizacao: new Date(partidaData.data_realizacao_iso),
                    },
                })
            );

            await Promise.all(upsertPartidaIdPromises);

            /*const upsertGolsMandantePromises = partidasData.flatMap(partidaData => {
                if (partidaData.gols.mandante.length > 0) {
                    return partidaData.gols.mandante.map((gol: Gol) =>
                        prisma.golsMandante.upsert({
                            where: { id: partidaData.escalacoes.mandante.tecnico.tecnico_id + 1 },
                            create: {
                                PartidaId: partidaData.partida_id ?? 0,
                                minuto: gol.minuto ?? "desconhecido",
                                atletaId: gol.atleta.atleta_id ?? 0,
                                nomeAtleta: gol.atleta.nome_popular ?? "Desconhecido",
                                periodo: gol.periodo ?? "Desconhecido",
                            },
                            update: {},
                        })
                    );
                }
                return [];
            });
 
            await Promise.all(upsertGolsMandantePromises);
 
            const upsertGolsVisitantePromises = partidasData.flatMap(partidaData => {
                if (partidaData.gols.visitante.length > 0) {
                    return partidaData.gols.visitante.map((gol: Gol) =>
                        prisma.golsVisitante.upsert({
                            where: { id: partidaData.escalacoes.visitante.tecnico.tecnico_id + 1 },
                            create: {
                                PartidaId: partidaData.partida_id ?? 0,
                                minuto: gol.minuto ?? "desconhecido",
                                atletaId: gol.atleta.atleta_id ?? 0,
                                nomeAtleta: gol.atleta.nome_popular ?? "Desconhecido",
                                periodo: gol.periodo ?? "Desconhecido",
                            },
                            update: {},
                        })
                    );
                }
                return [];
            });
 
            await Promise.all(upsertGolsVisitantePromises);
 
            const upsertEscalacaoVisitantePromises = partidasData.flatMap(partidaData => {
                if (partidaData.escalacoes && Array.isArray(partidaData.escalacoes.visitante.tecnicos)) {
                    return partidaData.escalacoes.visitante.tecnicos.map((tecnico: Tecnico) =>
                        prisma.escalacaoVisitante.upsert({
                            where: { id: tecnico.tecnico_id },
                            create: {
                                PartidaId: partidaData.partida_id ?? 0,
                                tecnico: tecnico.nome_popular ?? "Desconhecido",
                            },
                            update: {},
                        })
                    );
                }
                return [];
            });
 
            await Promise.all(upsertEscalacaoVisitantePromises);
 
            const upsertEscalacaoMandantePromises = partidasData.flatMap(partidaData => {
                if (partidaData.escalacoes && Array.isArray(partidaData.escalacoes.mandante.tecnicos)) {
                    return partidaData.escalacoes.mandante.tecnicos.map((tecnico: Tecnico) =>
                        prisma.escalacaoMandante.upsert({
                            where: { id: tecnico.tecnico_id },
                            create: {
                                PartidaId: partidaData.partida_id ?? 0,
                                tecnico: tecnico.nome_popular ?? "Desconhecido",
                            },
                            update: {},
                        })
                    );
                }
                return [];
            });
 
            await Promise.all(upsertEscalacaoMandantePromises);
 
            const upsertJogadorTitularVisitantePromises = partidasData.flatMap(partidaData => {
                if (partidaData.escalacoes && Array.isArray(partidaData.escalacoes.visitante.titulares)) {
                    return partidaData.escalacoes.visitante.titulares.map((titular: JogadorTitular) =>
                        prisma.jogadorTitularVisitante.upsert({
                            where: { id: partidaData.escalacoes.visitante.tecnico.tecnico_id + 2 },
                            create: {
                                atletaId: titular.atleta?.atleta_id ?? 0,
                                nome: titular.atleta?.nome_popular ?? "Desconhecido",
                                numeroCamiseta: titular.camisa ?? "0",
                                posicao: titular.posicao?.nome ?? "Desconhecido",
                                siglaPosicao: titular.posicao?.sigla ?? "Desconhecido",
                                escalacaoId: partidaData.escalacoes.visitante.tecnico.tecnico_id ?? 0,
                            },
                            update: {},
                        })
                    );
                }
                return [];
            });
 
            await Promise.all(upsertJogadorTitularVisitantePromises);
 
            const upsertJogadorTitularMandantePromises = partidasData.flatMap(partidaData => {
                if (partidaData.escalacoes && Array.isArray(partidaData.escalacoes.mandante.titulares)) {
                    return partidaData.escalacoes.mandante.titulares.map((titular: JogadorTitular) =>
                        prisma.jogadorTitularMandante.upsert({
                            where: { id: partidaData.escalacoes.mandante.tecnico.tecnico_id + 2 },
                            create: {
                                atletaId: titular.atleta?.atleta_id ?? 0,
                                nome: titular.atleta?.nome_popular ?? "Desconhecido",
                                numeroCamiseta: titular.camisa ?? "0",
                                posicao: titular.posicao?.nome ?? "Desconhecido",
                                siglaPosicao: titular.posicao?.sigla ?? "Desconhecido",
                                escalacaoId: partidaData.escalacoes.mandante.tecnico.tecnico_id ?? 0,
                            },
                            update: {},
                        })
                    );
                }
                return [];
            });
 
 
            await Promise.all(upsertJogadorTitularMandantePromises);
 
            const upsertCartaoAmareloMandantePromises = partidasData.flatMap(partidaData => {
                if (!partidaData.cartoes || !partidaData.cartoes.amarelo || !partidaData.cartoes.amarelo.mandante.length) {
                    return [];
                }
                return partidaData.cartoes.amarelo.mandante.map((cartao: Cartao) =>
                    prisma.cartaoAmareloMandante.upsert({
                        where: { id: partidaData.escalacoes.mandante.tecnico.tecnico_id + 3 },
                        create: {
                            cartaoId: cartao.cartao_id,
                            atletaId: cartao.atleta?.atleta_id ?? 0,
                            nomeAtleta: cartao.atleta?.nome_popular || "Desconhecido",
                            minuto: cartao.minuto ? parseInt(cartao.minuto.split(":")[0]) : 0,
                            periodo: cartao.periodo,
                            partidaId: partidaData.partida_id,
                        },
                        update: {},
                    })
                );
            });
 
            const upsertCartaoAmareloVisitantePromises = partidasData.flatMap(partidaData => {
                if (!partidaData.cartoes || !partidaData.cartoes.amarelo || !partidaData.cartoes.amarelo.visitante.length) {
                    return [];
                }
 
                return partidaData.cartoes.amarelo.visitante.map((cartao: Cartao) =>
                    prisma.cartaoAmareloVisitante.upsert({
                        where: { id: partidaData.escalacoes.visitante.tecnico.tecnico_id + 3 },
                        create: {
                            cartaoId: cartao.cartao_id,
                            atletaId: cartao.atleta?.atleta_id ?? 0,
                            nomeAtleta: cartao.atleta?.nome_popular || "Desconhecido",
                            minuto: cartao.minuto ? parseInt(cartao.minuto.split(":")[0]) : 0,
                            periodo: cartao.periodo,
                            partidaId: partidaData.partida_id,
                        },
                        update: {},
                    })
                );
            });
 
            const upsertCartaoVermelhoMandantePromises = partidasData.flatMap(partidaData => {
                if (!partidaData.cartoes || !partidaData.cartoes.vermelho || !partidaData.cartoes.vermelho.mandante.length) {
                    return [];
                }
 
                return partidaData.cartoes.vermelho.mandante.map((cartao: Cartao) =>
                    prisma.cartaoVermelhoMandante.upsert({
                        where: { id: partidaData.escalacoes.mandante.tecnico.tecnico_id + 4 },
                        create: {
                            cartaoId: cartao.cartao_id,
                            atletaId: cartao.atleta?.atleta_id || 0,
                            nomeAtleta: cartao.atleta?.nome_popular || "Desconhecido",
                            minuto: cartao.minuto ? parseInt(cartao.minuto.split(":")[0]) : 0,
                            periodo: cartao.periodo,
                            partidaId: partidaData.partida_id,
                        },
                        update: {},
                    })
                );
            });
 
            const upsertCartaoVermelhoVisitantePromises = partidasData.flatMap(partidaData => {
                if (!partidaData.cartoes || !partidaData.cartoes.vermelho || !partidaData.cartoes.vermelho.visitante.length) {
                    return [];
                }
 
                return partidaData.cartoes.vermelho.visitante.map((cartao: Cartao) =>
                    prisma.cartaoVermelhoVisitante.upsert({
                        where: { id: partidaData.escalacoes.visitante.tecnico.tecnico_id + 4 },
                        create: {
                            cartaoId: cartao.cartao_id,
                            atletaId: cartao.atleta?.atleta_id || 0,
                            nomeAtleta: cartao.atleta?.nome_popular || "Desconhecido",
                            minuto: cartao.minuto ? parseInt(cartao.minuto.split(":")[0]) : 0,
                            periodo: cartao.periodo,
                            partidaId: partidaData.partida_id,
                        },
                        update: {},
                    })
                );
            });
            
            */

            const totalPartidasId = await prisma.partidaId.count();
            if (totalPartidasId > 10) {
                const partidasIdParaDeletar = await prisma.partidaId.findMany({
                    orderBy: { dataRealizacao: 'desc' },
                    skip: 10,
                    select: { id: true },
                });

                await prisma.partidaId.deleteMany({
                    where: {
                        id: {
                            in: partidasIdParaDeletar.map((p) => p.id),
                        },
                    },
                });
            }


            res.status(200).json({ message: 'partidas atualizadas com sucesso' });
        } catch (error) {
            console.error('Erro ao buscar dados da fase:', error);
            res.status(500).json({ error: 'Erro ao buscar dados' });
        }
    } else {
        res.status(405).end();
    }
}

