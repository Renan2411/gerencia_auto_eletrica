import { Box, Icon } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import './index.css'
import { colunasTabelaPecas } from "../../../Configuracao/ColunasTabela";

export default function PecasTabela({ pecas, handleUpdatePeca, handleDeletePeca }) {

    return <>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                className='tabela'
                rows={pecas}
                columns={colunasTabelaPecas(pecas, handleDeletePeca, handleUpdatePeca)}
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

