export class Impressao {

    constructor(dadosParaImpressao) {
        this.dadosParaImpressao = dadosParaImpressao;
    }

    PrepararDocumento() {
        const corpoDocumento = this.CriaCorpoDocumento();
        const documento = this.GerarDocumento(corpoDocumento, this.TituloDocumento());
        return documento;
    }

    TituloDocumento() {
        console.log(this.dadosParaImpressao.cliente ? `Relatório Serviço ${this.dadosParaImpressao.cliente.nome}` : `Relatório Serviço`);
        return this.dadosParaImpressao.cliente ? `Relatório Serviço ${this.dadosParaImpressao.cliente.nome}` : `Relatório Serviço`
    }

    CriaCorpoDocumento() {
        const header = [
            { text: 'Nome', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Marca', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Quantidade', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Valor Unitário', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Valor Total', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
        ];

        const body = []

        this.dadosParaImpressao.pecas.map((peca) => {

            const quantidadePeca = this.dadosParaImpressao.quantidades.find(quantidade => quantidade.idPeca === peca.id)

            body.push([
                { text: peca.nome, fontSize: 8 },
                { text: peca.marca, fontSize: 8 },
                { text: quantidadePeca.quantidade, fontSize: 8 },
                { text: peca.valor, fontSize: 8 },
                { text: (Number(peca.valor) * Number(quantidadePeca.quantidade)), fontSize: 8 },
            ]);
        });

        body.push([
            { text: 'Valor Total', fontSize: 8 },
            { text: '', fontSize: 8 },
            { text: '', fontSize: 8 },
            { text: '', fontSize: 8 },
            { text: this.dadosParaImpressao.valorTotal, fontSize: 8 }
        ])

        console.log(body)

        const lineHeader = [
            {
                text:
                    '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                alignment: 'center',
                fontSize: 5,
                colSpan: 5,
            },
            {},
            {},
        ];

        let content = [header, lineHeader];
        content = [...content, ...body];
        return content;
    }

    GerarDocumento(corpoDocumento, tituloDocumento) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'noBorders',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloDocumento, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 1,
                        widths: ['*', 55, 55, 55, 55, 55],

                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'noBorders',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© Lojinha de TI',
                                        fontSize: 7,
                                        alignment: 'center',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }
}