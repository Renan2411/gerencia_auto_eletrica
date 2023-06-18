import { useEffect, useState } from "react";
import { Box, Grid, Modal, TextField, Button } from "@mui/material";
import uuid from "react-uuid";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function ClienteFormulario({
    open,
    clienteEdicao,
    handleCloseModal,
    handleOnStoreCliente,
    handleOnUpdateCliente
}) {

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cpf, setCpf] = useState('')
    const [endereco, setEndereco] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setNome(clienteEdicao.nome)
        setTelefone(clienteEdicao.telefone)
        setCpf(clienteEdicao.cpf)
        setEndereco(clienteEdicao.endereco)
        setEmail(clienteEdicao.email)
    }, [clienteEdicao])


    function resetarDados() {
        setNome('')
        setTelefone('')
        setCpf('')
        setEndereco('')
        setEmail('')
    }

    function fecharModal() {
        handleCloseModal()
    }

    function salvarPeca() {
        if (clienteEdicao.id.length > 0) {
            handleOnUpdateCliente({ id: clienteEdicao.id, nome, endereco, email, cpf, telefone })
            resetarDados()
            return
        }

        handleOnStoreCliente({ id: uuid(),nome, endereco, email, cpf, telefone })
        resetarDados()
    }

    return (
        <>
            <Modal
                open={open}
                onClose={fecharModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <form>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    className="campo-texto"
                                    variant="standard"
                                    label="Nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="campo-texto"
                                    variant="standard"
                                    label="CPF"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="campo-texto"
                                    variant="standard"
                                    label="Telefone"
                                    type="tel"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="campo-texto"
                                    variant="standard"
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="campo-texto"
                                    variant="standard"
                                    label="Endereço"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    className="botao"
                                    variant="contained"
                                    color="success"
                                    onClick={salvarPeca}
                                >
                                    {clienteEdicao.id === '' ? 'Cadastrar' : 'Editar'}

                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>

            </Modal>


        </>
    )

}