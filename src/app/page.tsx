'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
    <div>
      <div className="buttons">
        <button
          className="btn-classificacao"
          onClick={() => {
            refetch();
            window.location.href = '/';
          }}
        >
          Classificação
        </button>
        <button
          className="btn-partida"
          onClick={() => {
            refetch();
            window.location.href = '/partida';
          }}
        >
          Partidas
        </button>
      </div>

      <table className="tabela-classificacao">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Time</th>
            <th>Pts</th>
            <th>PJ</th>
            <th>VIT</th>
            <th>DER</th>
            <th>E</th>
            <th>GM</th>
            <th>GC</th>
            <th>SG</th>
          </tr>
        </thead>
        <tbody>
          {classificacao.map((time: ClassificacaoTime, index: number) => (
            <tr key={time.time.nome}>
              <td>{index + 1}</td>
              <td>
                <img src={time.time.escudo} alt={time.time.nome} style={{ width: 20, height: 20, marginRight: 8 }} />
                {time.time.nome}
              </td>
              <td>{time.pontos}</td>
              <td>{time.jogos}</td>
              <td>{time.vitorias}</td>
              <td>{time.derrotas}</td>
              <td>{time.empates}</td>
              <td>{time.golsMarcados}</td>
              <td>{time.golsSofridos}</td>
              <td>{time.saldoGols}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
