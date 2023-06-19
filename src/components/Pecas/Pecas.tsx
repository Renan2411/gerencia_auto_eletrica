import { useContext, useState } from "react";
import PecasTabela from "./Tabela/PecasTabela";
import { Button } from "@mui/material";
import PecasFormulario from "./Formulario/PecasFormulario";
import './index.css'
import PecaInterface from "../../Interfaces/PecaInterface";
import { OficinaContext } from "../../context/OficinaContext";
import uuid from "react-uuid";

export default function Pecas() {
    const { pecas, handleAdicionarPeca, handleEditarPeca, handleDeletarPeca } = useContext(OficinaContext)
    const [exibirModal, setExibirModal] = useState(false)
    const [pecaEdicao, setPecaEdicao] = useState<PecaInterface>({ id: '', nome: '', descricao: '', quantidade: 0, marca: '', valor: 0 })

    function fecharModal() {
        setExibirModal(false)
    }

    function abrirModal() {
        setExibirModal(true)
    }

    function editarPeca(peca: PecaInterface) {
        handleEditarPeca!(peca)
        resetarPecaEdicao()
        fecharModal()
    }

    function salvarPeca(novaPeca: PecaInterface) {
        handleAdicionarPeca!({ ...novaPeca, id: uuid() })
        fecharModal()
    }


    function resetarPecaEdicao() {
        setPecaEdicao({
            id: '',
            nome: '',
            quantidade: 0,
            marca: '',
            descricao: '',
            valor: 0
        })
    }


    function tratarEventoEditarPeca(peca: PecaInterface) {
        setPecaEdicao(peca)
        abrirModal()
    }

    function tratarEventoDeletarPeca(peca: PecaInterface) {
        handleDeletarPeca!(peca.id)
    }

    return (
        <>
            <h1>Listagem de Peças</h1>

            <PecasFormulario open={exibirModal} handleCloseModal={fecharModal} handleOnStorePeca={salvarPeca} pecaEdicao={pecaEdicao} handleOnUpdatePeca={editarPeca}></PecasFormulario>

            <div>
                <Button
                    className="botao-cadastrar"
                    variant="contained"
                    color="success"
                    onClick={abrirModal}>
                    Cadastrar Peça
                </Button>
            </div>

            <PecasTabela handleUpdatePeca={tratarEventoEditarPeca} handleDeletePeca={tratarEventoDeletarPeca} pecas={pecas}></PecasTabela>
        </>
    )
}