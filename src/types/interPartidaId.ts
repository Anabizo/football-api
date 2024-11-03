export interface Campeonato {
    campeonato_id: number;
    nome: string;
    slug: string;
    nome_popular: string;
    fase_atual: FaseAtual;
    rodada_atual: RodadaAtual;
    edicao: Edicao;
}

export interface FaseAtual {
    fase_id: number;
    nome: string;
    slug: string;
    tipo: string;
    _link: string;
}

export interface RodadaAtual {
    nome: string;
    slug: string;
    rodada: number;
    status: string;
}

export interface Edicao {
    edicao_id: number;
    temporada: string;
    nome: string;
    nome_popular: string;
    slug: string;
}

export interface Partida {
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

export interface Time {
    time_id: number;
    nome_popular: string;
    sigla: string;
    escudo: string;
}

export interface Estadio {
    estadio_id: number;
    nome_popular: string;
}

export interface Estatisticas {
    mandante: EstatisticasTime;
    visitante: EstatisticasTime;
}

export interface EstatisticasTime {
    posse_de_bola: string;
    escanteios: number;
    impedimentos: number;
    faltas: number;
    passes: Passes;
    finalizacao: Finalizacao;
    defensivo: Defensivo;
    desarmes: number;
}

export interface Passes {
    total: number;
    completos: number;
    errados: number;
    precisao: string;
}

export interface Finalizacao {
    total: number;
    no_gol: number;
    pra_fora: number;
    na_trave: number;
    bloqueado: number;
    precisao: string;
}

export interface Defensivo {
    defesas: number;
}

export interface Escalacoes {
    mandante: Escalacao;
    visitante: Escalacao;
}

export interface Escalacao {
    esquema_tatico: string;
    tecnico: Tecnico;
    titulares: Titular[];
}

export interface Tecnico {
    tecnico_id: number;
    nome_popular: string;
}

export interface Titular {
    atleta: Atleta;
    camisa: string;
    ordem: number;
    posicao: Posicao;
}

export interface Atleta {
    atleta_id: number;
    nome_popular: string;
}

export interface Posicao {
    nome: string;
    sigla: string;
}

export interface Gols {
    mandante: Gol[];
    visitante: Gol[];
}


export interface Atleta {
    atleta_id: number;
    nome_popular: string;
}

export interface JogadorTitular {
    atleta: {
        atleta_id: number;
        nome_popular: string;
    };
    camisa: string;
    posicao: {
        nome: string;
        sigla: string;
    };
}

export interface Posicao {
    nome: string;
    sigla: string;
}

export interface Gol {
    atleta: Atleta;
    minuto: String;
    periodo: string;
}

export interface PartidaData {
    partida_id: number;
    gols: {
        mandante: Gol[];
        visitante: Gol[];
    };
}

export interface Cartoes {
    amarelo: Cartao[];
    vermelho: Cartao[];
}

export interface Tecnico {
    tecnico_id: number;
    nome_popular: string;
}

export type Cartao = {
    cartao_id: number;
    atleta: {
        atleta_id: number;
        nome_popular: string;
    } | null;
    minuto: string | null;
    periodo: string;
};

export interface PartidaId {
    id: number;
    timeMandanteId: number;
    timeVisitanteId: number;
    timeMandanteNome: string;
    timeVisitanteNome: string;
    placarMandante: number;
    placarVisitante: number;
    nomeEstadio: string;
    status: string;
    chutesMandante: number;
    chutesVisitante: number;
    chutesAGolMandante: number;
    chutesAGolVisitante: number;
    posseDeBolaMandante: string;
    posseDeBolaVisitante: string;
    passesMandante: number;
    passesVisitante: number;
    precisaoPassesMandante: string;
    precisaoPassesVisitante: string;
    faltasMandante: number;
    faltasVisitante: number;
    impedimentosMandante: number;
    impedimentosVisitante: number;
    escanteiosMandante: number;
    escanteiosVisitante: number;
    dataRealizacao?: Date;
}
