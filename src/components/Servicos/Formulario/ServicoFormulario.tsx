import { Box, Button, FormControl, Grid, Icon, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import ClienteInterface from "../../../Interfaces/ClienteInterface";
import PecaInterface from "../../../Interfaces/PecaInterface";
import { OficinaContext } from "../../../context/OficinaContext";
import uuid from "react-uuid";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


interface PecaUtilizadaInterface{
    index: string,
    idPeca: string,
    quantidade: string
}

export default function ServicoFormulario({ open, handleCloseModal }) {

    const { pecas, clientes } = useContext(OficinaContext)

    const [data, setData] = useState<Dayjs | null>(null)
    const [descricao, setDescricao] = useState<string | null>()
    const [idCliente, setIdCliente] = useState<string>('')
    const [pecasUtilizadas, setPecasUtilizadas] = useState<PecaUtilizadaInterface[]>([])
    const [quantidades, setQuantidades] = useState<[] | null>()

    function fecharModal() {
        handleCloseModal()
    }

    function editarPecaUtilizada({ idPeca, quantidade, index }) {
        setPecasUtilizadas(pecasUtilizadas => pecasUtilizadas.map((peca) => {
            if (peca.index === index) {
                return { idPeca, quantidade, index }
            }

            return peca
        }))
    }

    function adicionarPecaUtilizada() {
        setPecasUtilizadas(pecasUtilizadas => [
            ...pecasUtilizadas,
            {
                index: uuid(),
                idPeca: '',
                quantidade: ''
            },
        ])
    }

    function removerPecaUtilizada(index: string) {
        setPecasUtilizadas(pecasUtilizadas => pecasUtilizadas.filter(peca => peca.index !== index))
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
                                    label="Descrição"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <DatePicker
                                    className="campo-texto"
                                    value={data}
                                    onChange={(value) => setData(value)} />
                            </Grid>



                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Cliente</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        label="Cliente"
                                        value={idCliente}
                                        className="campo-texto"
                                        onChange={(e) => setIdCliente(e.target.value)}
                                    >
                                        {clientes?.map((cliente, index) => {
                                            return (<MenuItem value={cliente.id} key={index}>
                                                <span>{cliente.nome}</span>
                                            </MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="contained" color="success" onClick={adicionarPecaUtilizada}>Adicionar Peça</Button>
                            </Grid>


                            {pecasUtilizadas?.map(pecaUtilizada => {

                                function deletePeca(){
                                    removerPecaUtilizada(pecaUtilizada.index)
                                }

                                return (
                                    <>
                                        <Grid item xs={5}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-name-label">Cliente</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    label="Cliente"
                                                    value={pecaUtilizada.idPeca}
                                                    className="campo-texto"
                                                    onChange={(e) => editarPecaUtilizada({
                                                        idPeca: e.target.value,
                                                        quantidade: pecaUtilizada.quantidade,
                                                        index: pecaUtilizada.index
                                                    })}
                                                >
                                                    {pecas?.map((peca, index) => {
                                                        return (<MenuItem value={peca.id} key={index}>
                                                            <span>{peca.nome}</span>
                                                        </MenuItem>)
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                className="campo-texto"
                                                variant="standard"
                                                label="Quantidade"
                                                type="number"
                                                value={pecaUtilizada.quantidade}
                                                onChange={(e) => editarPecaUtilizada({
                                                    idPeca: pecaUtilizada.idPeca,
                                                    quantidade: e.target.value,
                                                    index: pecaUtilizada.index
                                                })}
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <a onClick={deletePeca}>
                                                <Icon>delete</Icon>
                                            </a>
                                        </Grid>
                                    </>
                                )
                            })}

                            <Grid item xs={12}>
                                <Button
                                    className="botao"
                                    variant="contained"
                                    color="success"
                                >
                                    cadastrar

                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>

            </Modal>


        </>
    )
}