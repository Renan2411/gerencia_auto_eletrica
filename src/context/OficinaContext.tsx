import { createContext, useEffect, useState } from 'react'
import PecaInterface from '../Interfaces/PecaInterface'
import ClienteInterface from '../Interfaces/ClienteInterface'

interface ContextProps {
    pecas: PecaInterface[],
    clientes: ClienteInterface[],

    handleAdicionarPeca: (peca: PecaInterface) => void;
    handleEditarPeca: (peca: PecaInterface) => void;
    handleDeletarPeca: (idPeca: string) => void;

    handleAdicionarCliente: (cliente: ClienteInterface) => void;
    handleEditarCliente: (cliente: ClienteInterface) => void;
    handleDeletarCliente: (idCliente: string) => void;
}

export const OficinaContext = createContext<Partial<ContextProps>>({})

export const OficinaProvider = ({ children }) => {
    const [pecas, setPecas] = useState<PecaInterface[]>([])
    const [clientes, setClientes] = useState<ClienteInterface[]>([])

    const handleAdicionarPeca = (novaPeca: PecaInterface) => {
        setPecas(pecas => [novaPeca, ...pecas])
        console.log(pecas)
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

    return (
        <OficinaContext.Provider
            value={{
                pecas, 
                clientes, 
                handleAdicionarPeca, 
                handleEditarPeca, 
                handleDeletarPeca, 
                handleAdicionarCliente, 
                handleDeletarCliente, 
                handleEditarCliente
            }}>
            {children}
        </OficinaContext.Provider>
    )
}
