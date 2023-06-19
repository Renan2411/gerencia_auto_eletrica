import { Button } from "@mui/material";
import ServicoFormulario from "./Formulario/ServicoFormulario";
import { useContext, useEffect, useState } from "react";
import { OficinaContext } from "../../context/OficinaContext";

export default function Servico(){
    const {clientes} = useContext(OficinaContext)

    const [exibirModal, setExibirModal] = useState(false)

    function abrirModal(){
        setExibirModal(true)
    }

    function fecharModal(){
        setExibirModal(false)
    }

    useEffect(() => {
        console.log(clientes)
    }, [])

    return (
        <>
            <Button onClick={abrirModal}>Cadastrar Serviço</Button>

            <ServicoFormulario open={exibirModal} handleCloseModal={fecharModal}></ServicoFormulario>
        </>
    )
}