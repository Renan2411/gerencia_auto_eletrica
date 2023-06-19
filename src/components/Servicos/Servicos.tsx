import { Button } from "@mui/material";
import ServicoFormulario from "./Formulario/ServicoFormulario";
import { useContext, useEffect, useState } from "react";
import { OficinaContext } from "../../context/OficinaContext";
import ServicoInterface from "../../Interfaces/ServicoInterface";
import ServicosTabela from "./Tabela/ServicoTabela";

export default function Servico() {
    const { handleAdicionarServico, servicos } = useContext(OficinaContext)

    const [exibirModal, setExibirModal] = useState(false)
    const [servicoEdicao, setServicoEdicao] = useState<ServicoInterface>()

    function abrirModal() {
        setExibirModal(true)
    }

    function fecharModal() {
        setExibirModal(false)
    }

    function excluirServico(){}

    function editarServico(servico: ServicoInterface){
        setServicoEdicao(servico)
    }

    function salvarServico(servico: ServicoInterface) {
        handleAdicionarServico!(servico)
        
    }

    return (
        <>
            <Button onClick={abrirModal}>Cadastrar Serviço</Button>

            <ServicoFormulario 
                servicoEdicao={servicoEdicao}
                handleSalvarServico={salvarServico} 
                open={exibirModal} 
                handleCloseModal={fecharModal}></ServicoFormulario>

            <ServicosTabela
                servicos={servicos}
                handleDeleteServico={excluirServico}
                handleUpdateServico={editarServico}
                ></ServicosTabela>
        </>
    )
}