import { createContext, useEffect, useState } from 'react'
import PecaInterface from '../Interfaces/PecaInterface'
import ClienteInterface from '../Interfaces/ClienteInterface'
import ServicoInterface from '../Interfaces/ServicoInterface';
import uuid from 'react-uuid';

interface ContextProps {
    pecas: PecaInterface[],
    clientes: ClienteInterface[],
    servicos: ServicoInterface[],

    handleAdicionarPeca: (peca: PecaInterface) => void;
    handleEditarPeca: (peca: PecaInterface) => void;
    handleDeletarPeca: (idPeca: string) => void;
    handleFindPeca: (idPeca: string) => void;

    handleAdicionarCliente: (cliente: ClienteInterface) => void;
    handleEditarCliente: (cliente: ClienteInterface) => void;
    handleDeletarCliente: (idCliente: string) => void;
    handleFindCliente: (idCliente: string) => void;

    handleAdicionarServico: (servico: ServicoInterface) => void;
    handleEditarServico: (servico: ServicoInterface) => void;
    handleDeletarServico: (idServico: string) => void;
}

function setarLocalStorage(nomeObjeto: string, objeto: any){
    localStorage.setItem(nomeObjeto, objeto)
}

function getLocaStorage(nomeObjeto: string){
    const obj = localStorage.getItem(nomeObjeto)

    console.log( obj ? JSON.parse(obj) : [])

    return obj ? JSON.parse(obj) : []
}

export const OficinaContext = createContext<Partial<ContextProps>>({})

export const OficinaProvider = ({ children }) => {
    const [pecas, setPecas] = useState<PecaInterface[] | any>(getLocaStorage('pecas'))
    const [clientes, setClientes] = useState<ClienteInterface[] | any>(getLocaStorage('clientes'))
    const [servicos, setServicos] = useState<ServicoInterface[] | any>(getLocaStorage('servicos'))


    useEffect(() => {
        setarLocalStorage('clientes', JSON.stringify(clientes))
    }, [clientes])
    
    useEffect(() => {
        setarLocalStorage('pecas', JSON.stringify(pecas))
    }, [pecas])

    useEffect(() => {
        setarLocalStorage('servicos', JSON.stringify(servicos))
    }, [servicos])


    const handleAdicionarPeca = (novaPeca: PecaInterface) => {
        setPecas(pecas => [novaPeca, ...pecas])
    }

    const handleEditarPeca = (pecaEditada: PecaInterface) => {
        setPecas(pecas => pecas.map(peca => {
            if (peca.id === pecaEditada.id) {
                return { ...pecaEditada }
            }

            return peca
        }))
    }

    const handleDeletarPeca = (idPeca: string) => {
        setPecas(pecas => pecas.filter(peca => peca.id !== idPeca))
    }

    const handleFindPeca = (idPeca: string) => {
        return pecas.find((peca) => peca.id === idPeca)
    }

    const handleAdicionarCliente = (novoCliente: ClienteInterface) => {
        setClientes(clientes => [novoCliente, ...clientes])
    }

    const handleEditarCliente = (clienteEditado: ClienteInterface) => {
        setClientes(clientes => clientes.map(cliente => {
            if (cliente.id === clienteEditado.id) {
                return { ...clienteEditado }
            }

            return cliente
        }))
    }

    const handleDeletarCliente = (idCliente: string) => {
        setClientes(clientes => clientes.filter(cliente => cliente.id !== idCliente))
    }

    const handleFindCliente = (idCliente: string) => {
        return clientes.find(cliente => cliente.id === idCliente)
    }

    const handleAdicionarServico = (servico: ServicoInterface) => {
        setServicos(servicos => [...servicos, servico])
    }

    const handleEditarServico = (servicoEditado: ServicoInterface) => {
        console.log(servicoEditado);
        
        setServicos(servicos => servicos.map(servico => {
            if (servico.id === servicoEditado.id) {
                return { ...servicoEditado }
            }

            return servico
        }))
    }

    const handleDeletarServico = (idServico: string) => {
        setServicos(servicos => servicos.filter(servico => servico.id !== idServico))
    }

    return (
        <OficinaContext.Provider
            value={{
                pecas,
                clientes,
                servicos,
                handleAdicionarPeca,
                handleEditarPeca,
                handleDeletarPeca,
                handleFindPeca,
                handleAdicionarCliente,
                handleDeletarCliente,
                handleEditarCliente,
                handleFindCliente,
                handleAdicionarServico,
                handleEditarServico,
                handleDeletarServico
            }}>
            {children}
        </OficinaContext.Provider>
    )
}
