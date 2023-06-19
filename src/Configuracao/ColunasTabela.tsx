import { Icon } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";


export function colunasTabelaCliente(clientes, handleDeleteCliente, handleUpdateCliente) {
    const colunas: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
            renderCell: (params) => {

                return (
                    <>
                        {clientes.indexOf(params.row) + 1}
                    </>
                );
            },
        },
        {
            field: 'nome',
            headerName: 'Nome',
            width: 250,
            editable: false,

        },
        {
            field: 'cpf',
            headerName: 'CPF',
            width: 100,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: false,
        },
        {
            field: 'telefone',
            headerName: 'Telefone',
            width: 250,
            editable: false,
        },
        {
            field: 'endereco',
            headerName: 'Endereço',
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
                const excluirCliente = () => {
                    handleDeleteCliente(params.row);
                };

                const editarCliente = () => {
                    console.log(params)
                    handleUpdateCliente(params.row);
                };

                return (
                    <>
                        <Icon className="icon-action" onClick={editarCliente}>
                            edit
                        </Icon>
                        <Icon className="icon-action" onClick={excluirCliente}>
                            delete
                        </Icon>
                    </>
                );
            },
        }
    ]

    return colunas
}

export function colunasTabelaPecas(pecas, handleDeletePeca, handleUpdatePeca) {
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
            headerName: 'Quantidade Disponível',
            width: 100,
            editable: false,
        },
        {
            field: 'valor',
            headerName: 'Valor Unitário',
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

    return colunas
}


