'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

async function fetchClassificacao() {
  const response = await axios.get('/api/classificacao');
  return response.data
}

interface Time {
  time_id: number;
  nome: string;
  sigla: string;
  escudo: string;
}

interface ClassificacaoTime {
  posicao: number;
  pontos: number;
  time: Time;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsMarcados: number;
  golsSofridos: number;
  saldoGols: number;
  aproveitamento: number;
  variacao_posicao: number;
  ultimos_jogos: string[];
}


export default function ClassificacaoPage() {

  const { data: classificacao, isLoading, isError, refetch } = useQuery(['classificacao'], fetchClassificacao);

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar os dados da classificação</p>

  return (
    <div className="bg-purple-400  ">
      <div className="pt-10 flex items-center justify-center gap-10 px-60">
        <button
          className="text-lg bg-purple-950 text-white border-gray-950 hover:bg-pink-700 rounded-3xl border-3 h-9 w-36"
          onClick={() => {
            refetch();
            window.location.href = '/';
          }}
        >
          Classificação
        </button>
        <button
          className="text-lg bg-purple-950 text-white border-gray-950 hover:bg-pink-700 rounded-3xl border-3 h-9 w-36"
          onClick={() => {
            refetch();
            window.location.href = '/partida';
          }}
        >
          Partidas
        </button>
      </div>

      <div className='pt-2 pb-8 flex justify-center items-center'>
        <table className="tabela-classificacao rounded-3xl bg-gray-700 font-sans text-white ">
          <thead>
            <tr>
              <th className="px-6 py-2">Posição</th>
              <th className="px-6 py-2">Time</th>
              <th className="px-6 py-2">Pts</th>
              <th className="px-6 py-2">PJ</th>
              <th className="px-6 py-2">VIT</th>
              <th className="px-6 py-2">DER</th>
              <th className="px-6 py-2">E</th>
              <th className="px-6 py-2">GM</th>
              <th className="px-6 py-2">GC</th>
              <th className="px-6 py-2">SG</th>
            </tr>
          </thead>
          <tbody>
            {classificacao.map((time: ClassificacaoTime, index: number) => (
              <tr key={time.time.nome}>
                <td className="px-6 py-2">{index + 1}</td>
                <td className="px-6 py-2 flex items-center"> {/* Flex para alinhar a imagem e o texto */}
                  <img src={time.time.escudo} alt={time.time.nome} style={{ width: 20, height: 20, marginRight: 8 }} />
                  {time.time.nome}
                </td>
                <td className="px-6 py-2">{time.pontos}</td>
                <td className="px-6 py-2">{time.jogos}</td>
                <td className="px-6 py-2">{time.vitorias}</td>
                <td className="px-6 py-2">{time.derrotas}</td>
                <td className="px-6 py-2">{time.empates}</td>
                <td className="px-6 py-2">{time.golsMarcados}</td>
                <td className="px-6 py-2">{time.golsSofridos}</td>
                <td className="px-6 py-2">{time.saldoGols}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
