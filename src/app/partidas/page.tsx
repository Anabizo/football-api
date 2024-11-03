'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';


async function fetchPartidas() {
    const response = await axios.get('/api/partidas');
    return response.data
}

interface Partida {
    partida_id: number;
    time_mandante_id: number;
    time_mandante_nome: string;
    time_mandante_sigla: string;
    time_mandante_escudo: string;
    time_visitante_id: number;
    time_visitante_nome: string;
    time_visitante_sigla: string;
    time_visitante_escudo: string;
    status: string;
    slug: string;
    data_realizacao: Date;
}

export default function Partidas() {

    const { data: partidas, isLoading, isError, refetch } = useQuery<Partida[]>(['partidas'], fetchPartidas);

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Erro ao carregar os dados da classificação</p>

    return (

        <div className="bg-purple-400 min-h-screen">
            <div className="pt-10 flex items-center justify-center gap-10 px-60">
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
            <div className="pt-1 pb-8 flex justify-center items-center">
                <div className="p-10 rounded-3xl bg-cover text-white bg-gray-700 w-full max-w-3xl">
                    <h2 className="text-white text-lg mb-4 text-center">10 Últimas Partidas</h2>
                    <ul className="grid grid-cols-2 gap-x-12 gap-y-4">
                        {partidas.map((partida: Partida) => (
                            <Link href={`/partidaId/${partida.partida_id}`} key={partida.partida_id}>
                                <li className="py-4 px-2 flex flex-col justify-start items-start hover:bg-gray-500 rounded-2xl">
                                    <div className="flex">
                                        <div className="flex-col">
                                            <div className="flex pr-5">
                                                <img src={partida.time_mandante_escudo} alt={partida.time_mandante_nome} style={{ width: 20, height: 20, marginRight: 8 }} />
                                                {partida.time_mandante_nome}
                                            </div>
                                            <div className="flex pr-5">
                                                <img src={partida.time_visitante_escudo} alt={partida.time_visitante_nome} style={{ width: 20, height: 20, marginRight: 8 }} />
                                                {partida.time_visitante_nome}
                                            </div>
                                        </div>
                                        <div className="flex-col">
                                            <div className="flex">
                                                {format(new Date(partida.data_realizacao), 'dd/MM/yyyy HH:mm')}
                                            </div>
                                            <div className="flex">
                                                {partida.status}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
