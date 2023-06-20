import { Button } from "@mui/material";
import ServicoFormulario from "./Formulario/ServicoFormulario";
import { useContext, useEffect, useState } from "react";
import { OficinaContext } from "../../context/OficinaContext";
import ServicoInterface from "../../Interfaces/ServicoInterface";
import ServicosTabela from "./Tabela/ServicoTabela";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { Impressao } from '../../Configuracao/Impressao';

export default function Servico() {
    const { servicos, handleAdicionarServico, handleEditarServico, handleDeletarServico } = useContext(OficinaContext)

    const [exibirModal, setExibirModal] = useState(false)
    const [servicoEdicao, setServicoEdicao] = useState<ServicoInterface | null>(null)

    const visualizarImpressao = (servico) => {
        const classeImpressao = new Impressao(servico);
        const documento = classeImpressao.PrepararDocumento();
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }

    function abrirModal() {
        setExibirModal(true)
    }

    function fecharModal() {
        setExibirModal(false)
    }

    function excluirServico(servico: ServicoInterface) {
        handleDeletarServico!(servico.id)
    }

    function tratarEventoEditarServico(servico: ServicoInterface) {
        setServicoEdicao({
            id: servico.id,
            cliente: servico.cliente,
            data: servico.data,
            descricao: servico.descricao,
            pecas: servico.pecas,
            quantidades: servico.quantidades,
            valorTotal: servico.valorTotal
        })
        abrirModal()
    }

    function editarServico(servico: ServicoInterface) {
        console.log('aqui');

        handleEditarServico!(servico)
        setServicoEdicao(null)
        fecharModal()
    }

    function salvarServico(servico: ServicoInterface) {
        handleAdicionarServico!(servico)
        fecharModal()

    }

    return (
        <>
            <Button 
                onClick={abrirModal} 
                color="success" 
                variant="contained" 
                className="botao-cadastrar">Cadastrar Serviço</Button>

            <ServicoFormulario
                servicoEdicao={servicoEdicao}
                handleSalvarServico={salvarServico}
                handleEditarServico={editarServico}
                open={exibirModal}
                handleCloseModal={fecharModal}></ServicoFormulario>

            <ServicosTabela
                servicos={servicos}
                handleImprimirServico={visualizarImpressao}
                handleDeleteServico={excluirServico}
                handleUpdateServico={tratarEventoEditarServico}
            ></ServicosTabela>
        </>
    )
}