import cron from 'node-cron';
import axios from 'axios';

export async function fetchClassificacao() {
    try {
        await axios.get('http://localhost:3000/api/reqClassificacao');
        console.log('Requisição de classificação concluída com sucesso.');
    } catch (error) {
        console.error('Erro na requisição de classificação:', error);
    }
}

export async function fetchPartidaId() {
    try {
        await axios.get('http://localhost:3000/api/reqPartidaId');
        console.log('Requisição de partida por ID concluída com sucesso.');
    } catch (error) {
        console.error('Erro na requisição de partida por ID:', error);
    }
}

export async function fetchPartidas() {
    try {
        await axios.get('http://localhost:3000/api/reqPartidas');
        console.log('Requisição de partidas concluída com sucesso.');
    } catch (error) {
        console.error('Erro na requisição de partidas:', error);
    }
}

export function startCronJobs() {
    cron.schedule('0 3 * * *', fetchClassificacao);
    cron.schedule('5 3 * * *', fetchPartidas);
    cron.schedule('10 3 * * *', fetchPartidaId);


    console.log('Cron jobs configurados para as APIs.');
}
