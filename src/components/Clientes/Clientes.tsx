import { useContext, useState } from "react"
import { OficinaContext } from "../../context/OficinaContext"
import ClienteInterface from "../../Configuracao/ClienteInterface"
import uuid from "react-uuid"
import PecasFormulario from "../Pecas/Formulario/PecasFormulario"
import { Button } from "@mui/material"
import ClienteTabela from "./Tabela/ClienteTabela"
import ClienteFormulario from "./Formulario/ClienteFormulario"

export default function Clientes() {

    const { clientes, handleAdicionarCliente, handleDeletarCliente, handleEditarCliente } = useContext(OficinaContext)
    const [exibirModal, setExibirModal] = useState(false)
    const [clienteEdicao, setClienteEdicao] = useState<ClienteInterface>({
        id: '',
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        endereco: ''
    })

    function fecharModal() {
        setExibirModal(false)
    }

    function abrirModal() {
        setExibirModal(true)
    }

    function editarCliente(cliente: ClienteInterface) {
        handleEditarCliente!(cliente)
        resetarClienteEdicao()
        fecharModal()
    }

    function salvarCliente(novoCliente: ClienteInterface) {
        handleAdicionarCliente!(novoCliente)
        fecharModal()
    }

    function resetarClienteEdicao() {
        setClienteEdicao({
            id: '',
            nome: '',
            email: '',
            cpf: '',
            telefone: '',
            endereco: ''
        })
    }

    function tratarEventoEditarCliente(cliente: ClienteInterface) {
        setClienteEdicao(cliente)
        abrirModal()
    }

    function tratarEventoDeletarCliente(cliente: ClienteInterface) {
        handleDeletarCliente!(cliente.id)
    }

    return (
        <>

            <h1>Listagem de Clientes</h1>

            <ClienteFormulario open={exibirModal} handleCloseModal={fecharModal} handleOnStoreCliente={salvarCliente} clienteEdicao={clienteEdicao} handleOnUpdateCliente={editarCliente}></ClienteFormulario>

            <div>
                <Button
                    className="botao-cadastrar"
                    variant="contained"
                    color="success"
                    onClick={abrirModal}>
                    Cadastrar Cliente
                </Button>
            </div>

            <ClienteTabela handleUpdateCliente={tratarEventoEditarCliente} handleDeleteCliente={tratarEventoDeletarCliente} clientes={clientes}></ClienteTabela>
        </>
    )
}