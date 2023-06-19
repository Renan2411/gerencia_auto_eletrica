import ClienteInterface from "./ClienteInterface";
import PecaInterface from "./PecaInterface";
import { Dayjs } from 'dayjs';

export default interface ServicoInterface {
    id: string,
    data: Dayjs,
    valorTotal: number,
    cliente: ClienteInterface,
    pecas: PecaInterface[],
    descricao: string,
    quantidade: []
}