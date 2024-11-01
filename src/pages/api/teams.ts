// src/pages/api/fase.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import axios from 'axios';

const apiKey = process.env.FUTEBOL_API_KEY;

// Interface para o time
interface Time {
  time_id: number;
  nome_popular: string;
  sigla: string;
  escudo: string;
}

// Interface para a classificação de um time
interface ClassificacaoTime {
  posicao: number;
  pontos: number;
  time: Time;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gols_pro: number;
  gols_contra: number;
  saldo_gols: number;
  aproveitamento: number;
  variacao_posicao: number;
  ultimos_jogos: string[];
}

// Interface para o grupo
interface Grupo {
  [key: string]: ClassificacaoTime[];
  "grupo-principal": ClassificacaoTime[]
}


interface Edicao {
  edicao_id: number;
  temporada: string;
  nome: string;
  nome_popular: string;
  slug: string;
}

interface FaseAtual {
  fase_id: number;
  nome: string;
  slug: string;
  tipo: string;
  _link: string;
}

interface RodadaAtual {
  nome: string;
  slug: string;
  rodada: number;
  status: string;
}

interface Campeonato {
  campeonato_id: number;
  nome: string;
  slug: string;
  nome_popular: string;
  edicao_atual: Edicao;
  fase_atual: FaseAtual;
  rodada_atual: RodadaAtual;
  status: string;
  tipo: string;
  logo: string;
  regiao: string;
  _link: string;
}

interface Fase {
  fase_id: number;
  edicao: Edicao;
  campeonato: Campeonato;
  nome: string;
  slug: string;
  status: string;
  decisivo: boolean;
  eliminatorio: boolean;
  ida_e_volta: boolean;
  tipo: string;
  grupos: any[]; // Ajuste o tipo conforme a estrutura dos grupos, se necessário
  chaves: any[]; // Ajuste o tipo conforme a estrutura das chaves, se necessário
  rodadas: any[]; // Ajuste o tipo conforme a estrutura das rodadas, se necessário
  proxima_fase: null | any; // Ajuste o tipo conforme a estrutura da próxima fase, se necessário
  fase_anterior: null | any; // Ajuste o tipo conforme a estrutura da fase anterior, se necessário
}


//https://api.api-futebol.com.br/v1/campeonatos/10/fases/506


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get<ClassificacaoTime[]>('https://api.api-futebol.com.br/v1/campeonatos/10/tabela', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      const responseCampeonato = await axios.get<Fase>('https://api.api-futebol.com.br/v1/campeonatos/10/fases/506', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      console.log(responseCampeonato.data)

      const fase = response.data;
      const campeonatoi = responseCampeonato.data;

      const campeonato = await prisma.campeonato.create({
        data: {
          edicaoAtual: campeonatoi.edicao.temporada,
          nome: campeonatoi.campeonato.nome,
          status: true,
          slug: campeonatoi.edicao.slug,
          tipo: "pontos corridos",
          logo: campeonatoi.campeonato.logo,
        }
      })

      fase.map(async (item) => {
        const Time = await prisma.time.create({
          data: {
            nome: item.time.nome_popular,
            escudo: item.time.escudo,
            sigla: item.time.sigla,
            id: item.time.time_id,
          }
        })
        await prisma.estatisticas.create({
          data: {
            posicao: item.posicao,
            derrotas: item.derrotas,
            empates: item.empates,
            vitorias: item.vitorias,
            golsMarcados: item.gols_pro,
            golsSofridos: item.gols_contra,
            jogos: item.jogos,
            nomeTime: item.time.nome_popular,
            pontos: item.pontos,
            saldoGols: item.saldo_gols,
            escudo: item.time.escudo,
            campeonatoId: campeonato.id,
            timeId: Time.id,
          }
        })
      })

      res.status(200).json({ message: 'Fase e partidas atualizadas com sucesso' });
    } catch (error) {
      console.error('Erro ao buscar dados da fase:', error);
      res.status(500).json({ error: 'Erro ao buscar dados' });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}

