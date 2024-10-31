// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    var options = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/teams/countries',
        qs: {},
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': 'XxXxXxXxXxXxXxXxXxXxXxXx'
        }
      };
      fetch('https://v3.football.api-sports.io/leagues?id=71&type=league', {
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': 'XxXxXxXxXxXxXxXxXxXxXxXx'
        }
      })
  if (req.method === 'GET') {
    const times = await prisma.time.findMany();
    res.status(200).json(times);
  } else {
    res.status(405).end(); // Método não permitido
  }
}