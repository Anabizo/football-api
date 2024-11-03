// src/app/partidaId/[id]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PartidaId } from '../../../types/interPartidaId';

async function fetchPartidas(id: string) {
    const response = await axios.get(`/api/partida/${id}`);
    return response.data;
}

export default function PartidasId() {
    const { id } = useParams() as { id: string };

    const { data: partidas, isLoading, isError } = useQuery<PartidaId | null>(
        ['partidasId', id],
        () => fetchPartidas(id),
        {
            enabled: !!id,
        }
    );

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Erro ao carregar os dados da partida</p>;

    return (
        <div>
            <h1>Detalhes da Partida</h1>
            {partidas && (
                <div>
                    <h2>{partidas.timeMandanteNome} vs {partidas.timeVisitanteNome}</h2>
                    <p>Placar: {partidas.placarMandante} - {partidas.placarVisitante}</p>
                </div>
            )}
        </div>
    );
}

