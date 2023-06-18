import { Box, Grid, Modal, TextField, Button } from "@mui/material";
import './index.css'
import { useEffect, useState } from "react";

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

export default function PecasFormulario({ open, handleCloseModal, handleOnStorePeca, pecaEdicao, handleOnUpdatePeca }) {

    const [nome, setNome] = useState('')
    const [marca, setMarca] = useState('')
    const [quantidade, setQuantidade] = useState(0)
    const [descricao, setDescricao] = useState('')


    useEffect(() => {
        setNome(pecaEdicao.nome)
        setMarca(pecaEdicao.marca)
        setDescricao(pecaEdicao.descricao)
        setQuantidade(pecaEdicao.quantidade)
    }, [pecaEdicao])


    function resetarDados(){
        setNome('')
        setDescricao('')
        setMarca('')
        setQuantidade(0)
    }

    function fecharModal() {
        handleCloseModal()
    }

    function salvarPeca(){

        if(pecaEdicao.id > 0){
            handleOnUpdatePeca({id: pecaEdicao.id, nome, marca, quantidade, descricao})
            resetarDados()
            return
        }

        handleOnStorePeca({nome, marca, quantidade, descricao})
        resetarDados()
    }

    return (
        <>

            <h1>Cadastro de Peças</h1>

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
                                    label="Marca"
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="campo-texto"
                                    variant="standard"
                                    label="Quantidade"
                                    type="number"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="campo-texto"
                                    variant="standard"
                                    label="Descrição"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    className="botao"
                                    variant="contained"
                                    color="success"
                                    onClick={salvarPeca}
                                >
                                    {pecaEdicao.id === 0 ? 'Cadastrar' : 'Editar'}

                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>

            </Modal>


        </>
    )
}