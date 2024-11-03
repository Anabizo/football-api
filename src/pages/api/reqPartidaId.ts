import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.FUTEBOL_API_KEY;




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get('https://api.api-futebol.com.br/v1/partidas/17300', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            const partida = response.data;

            const filePath = path.join(process.cwd(), 'partidasId.json');
            fs.writeFileSync(filePath, JSON.stringify(partida, null, 2), 'utf-8');

            res.status(200).json({ message: 'partidas atualizadas com sucesso' });
        } catch (error) {
            console.error('Erro ao buscar dados da fase:', error);
            res.status(500).json({ error: 'Erro ao buscar dados' });
        }
    } else {
        res.status(405).end();
    }
}

