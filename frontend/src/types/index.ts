export interface Morador {
    id: number;
    nome: string;
    apartamento: string;
    telefone: string;
    email: string;
}

export interface Encomenda {
    id: number;
    dataRecebimento: string;
    morador: Morador | undefined;
    apartamento: string;
    retirada: boolean;
}

export interface Veiculo {
    id: number;
    placa: string;
    modelo: string;
    morador: Morador | null;
    apartamento: string;
}

export interface Acesso {
    id: number;
    dataHora: string;
    tipo: string;
    nome: string;
    documento: string;
    destino: string;
    observacao: string;
}
