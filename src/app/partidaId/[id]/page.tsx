// src/app/partidaId/[id]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PartidaId, Partida } from '../../../types/interPartidaId';

async function fetchPartidasId(id: string) {
    const response = await axios.get(`/api/partida/${id}`);
    return response.data;
}

async function fetchPartidas() {
    const response = await axios.get(`/api/partidas`);
    return response.data;
}

export default function PartidasId() {
    const { id } = useParams() as { id: string };

    const { data: partidas, isLoading: isLoadingPartidas, isError: isErrorPartidas, refetch } = useQuery<PartidaId | null>(
        ['partidasId', id],
        () => fetchPartidasId(id),
        {
            enabled: !!id,
        }
    );

    const { data: partida, isLoading: isLoadingTodasPartidas, isError: isErrorTodasPartidas, } = useQuery<Partida[]>(
        ['partida'],
        fetchPartidas,
        {

        }
    );

    if (isLoadingPartidas) return <p>Carregando as partidas...</p>;
    if (isErrorPartidas) return <p>Erro ao carregar os dados das partidas.</p>;

    if (isLoadingTodasPartidas) return <p>Carregando a partida...</p>;
    if (isErrorTodasPartidas) return <p>Erro ao carregar os dados da partida.</p>;

    if (!partidas) {
        return <p>Dados da partida não disponíveis.</p>;
    }

    const partidaEncontrada = partida?.find(p => p.partida_id === Number(id));

    if (!partidaEncontrada) {
        return <p>Dados da partida não disponíveis.</p>;
    }

    return (
        <div className=" bg-purple-400 min-h-screen pb-10 bg-center">

            <div className="pb-2 pt-5 flex items-center justify-center" >
                <img src={('/imagens/brasileirao.png')} alt={'brasileirao'} style={{ width: 96, height: 96, marginRight: 8 }} />
                <h1 className="text-4xl text-white font-bold  p-2 ">Brasileirão Série A</h1>
            </div>
            <div className="pt-5 flex items-center justify-center gap-10 px-60">
                <button
                    className="text-lg bg-purple-950 text-white hover:bg-pink-700 rounded-3xl h-9 w-36"
                    onClick={() => {
                        refetch();
                        window.location.href = '/';
                    }}
                >
                    Classificação
                </button>
                <button
                    className="text-lg bg-purple-950 text-white border-2 border-white hover:bg-pink-700 rounded-3xl h-9 w-36"
                    onClick={() => {
                        refetch();
                        window.location.href = '/partidas';
                    }}
                >
                    Partidas
                </button>
            </div>
            <div className="pt-5 flex items-center justify-center" >
                <div className="bg-gray-700 items-center justify-center text-white rounded-3xl py-16 px-10 w-11/12 max-w-2xl shadow-lg">
                    <div className="flex justify-between items-center text-center">
                        <div>
                            <p>Estádio: {partidas.nomeEstadio}</p>
                            <p>
                                Data:{' '}
                                {partidas.dataRealizacao
                                    ? new Date(partidas.dataRealizacao).toLocaleDateString()
                                    : 'Data não disponível'}
                            </p>
                        </div>
                        <div>
                            <p>{partidas.status}</p>
                        </div>
                    </div>


                    <div className="flex justify-between items-center my-6">
                        <div className="text-center">
                            <img src={partidaEncontrada.time_mandante_escudo} alt={`${partidaEncontrada.time_mandante_nome} escudo`} className="w-16 h-16 mx-auto" />
                            <p className="mt-2">{partidas.timeMandanteNome}</p>
                        </div>
                        <div className="text-4xl font-bold">
                            <p className="text-6xl">
                                {partidas.placarMandante} <span className='px-20'>x</span>{' '}
                                {partidas.placarVisitante}
                            </p>
                        </div>
                        <div className="text-center">
                            <img src={partidaEncontrada.time_visitante_escudo} alt={`${partidaEncontrada.time_visitante_nome} escudo`} className="w-16 h-16 mx-auto" />
                            <p className="mt-2">{partidas.timeVisitanteNome}</p>
                        </div>
                    </div>


                    {/*<div className="flex justify-around my-4">
                    <button className="bg-purple-950 hover:bg-pink-700 text-white py-2 px-4 rounded-full">Estatísticas</button>
                    <button className="bg-purple-950 hover:bg-pink-700 text-white py-2 px-4 rounded-full">Escalações</button>
                </div>*/}


                    <div className="text-center mt-6">
                        <h2 className="text-lg font-semibold mb-4">ESTATÍSTICAS DOS TIMES</h2>
                        <div className="flex justify-between text-sm">

                            <div className="text-left text-lg space-y-2">
                                <p>{partidas.chutesMandante}</p>
                                <p>{partidas.chutesAGolMandante}</p>
                                <p>{partidas.posseDeBolaMandante}</p>
                                <p>{partidas.passesMandante}</p>
                                <p>{partidas.precisaoPassesMandante}</p>
                                <p>{partidas.faltasMandante}</p>
                                <p>{partidas.impedimentosMandante}</p>
                                <p>{partidas.escanteiosMandante}</p>
                            </div>


                            <div className="text-center text-lg space-y-2 ">
                                <p>Chutes</p>
                                <p>Chutes a gol</p>
                                <p>Posse de bola</p>
                                <p>Passes</p>
                                <p>Precisão de passe</p>
                                <p>Faltas</p>
                                <p>Impedimentos</p>
                                <p>Escanteios</p>
                            </div>


                            <div className="text-right text-lg space-y-2">
                                <p>{partidas.chutesVisitante}</p>
                                <p>{partidas.chutesAGolVisitante}</p>
                                <p>{partidas.posseDeBolaVisitante}</p>
                                <p>{partidas.passesVisitante}</p>
                                <p>{partidas.precisaoPassesVisitante}</p>
                                <p>{partidas.faltasVisitante}</p>
                                <p>{partidas.impedimentosVisitante}</p>
                                <p>{partidas.escanteiosVisitante}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

