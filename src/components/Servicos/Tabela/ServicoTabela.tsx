import { Box, Icon } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {  colunasTabelaServicos } from "../../../Configuracao/ColunasTabela";

export default function ServicosTabela({ servicos, handleUpdateServico, handleDeleteServico, handleImprimirServico }) {

    return <>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                className='tabela'
                rows={servicos}
                columns={colunasTabelaServicos(servicos, handleDeleteServico, handleUpdateServico, handleImprimirServico)}
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

