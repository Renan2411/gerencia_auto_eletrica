import { Box, Icon } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import './index.css'
import { useContext } from "react";
import { OficinaContext } from "../../../context/OficinaContext";

export default function PecasTabela({ pecas, handleUpdatePeca, handleDeletePeca }) {

    const colunas: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
            renderCell: (params) => {

                return (
                    <>
                        {pecas.indexOf(params.row) + 1}
                    </>
                );
            },
        },
        {
            field: 'nome',
            headerName: 'Nome',
            width: 350,
            editable: false,

        },
        {
            field: 'quantidade',
            headerName: 'Quantidade',
            width: 100,
            editable: false,
        },
        {
            field: 'marca',
            headerName: 'Marca',
            width: 250,
            editable: false,
        },
        {
            field: 'descricao',
            headerName: 'Descrição',
            width: 350,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            editable: false,
            renderCell: (params) => {
                const excluirPeca = () => {
                    handleDeletePeca(params.row);
                };

                const editarPeca = () => {
                    console.log(params)
                    handleUpdatePeca(params.row);
                };

                return (
                    <>
                        <Icon className="icon-action" onClick={editarPeca}>
                            edit
                        </Icon>
                        <Icon className="icon-action" onClick={excluirPeca}>
                            delete
                        </Icon>
                    </>
                );
            },
        }
    ]

    return <>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                className='tabela'
                rows={pecas}
                columns={colunas}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    </>
}

