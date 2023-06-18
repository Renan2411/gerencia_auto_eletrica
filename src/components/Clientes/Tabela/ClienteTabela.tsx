import { Box, Icon } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { colunasTabelaCliente } from "../../../Configuracao/ColunasTabela";

export default function ClienteTabela({
    clientes,
    handleUpdateCliente,
    handleDeleteCliente
}) {

    return <>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                className='tabela'
                rows={clientes}
                columns={colunasTabelaCliente(clientes, handleDeleteCliente, handleUpdateCliente)}
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