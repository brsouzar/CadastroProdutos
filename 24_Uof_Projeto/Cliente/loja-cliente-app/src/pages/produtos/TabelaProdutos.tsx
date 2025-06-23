import { gql, useQuery } from "@apollo/client";
import { Button, CircularProgress, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { pink } from "@mui/material/colors";
import { ProdutoDialog } from "./ProdutosDialog";



export type Produto = {
   id:number,
   nome: string,
   descricao: string,
   preco: string,
   dataCadastro: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    component: "th",
    scope: "row"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0   
  },
}));

type Props = {
    id: number;    
}

export const TabelaProdutos = (props:Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
     const [produto, setProduto] = useState<Produto>();
    
    const [openDialog, setOpenDialog] = useState(false);     

      const categoriaId  = props.id;
      const queryProdutos = gql`
         query ProdutosGetAll($id: Int!){
            produtosGetAll(id:$id) {
                  id
                  nome
                  descricao
                  preco
                  dataCadastro
              }
         }
        `
       const { loading, error, data, refetch  } = useQuery(queryProdutos, {
           variables: { id: categoriaId } 
       });
        useEffect(() => {
              if (loading) return setIsLoading(true);
             if (error) return alert(error.message.toString());
             setIsLoading(false);

             return setProdutos(data!.produtosGetAll);
          }, [data, error, loading])   
      
        const AbreDialog = () => {
          setProduto({
            id: 0,
            nome: '',
            descricao: '',
            preco: '',
            dataCadastro: ''
          })
          setOpenDialog(true);
        }

    const handelEditar = (produto: Produto) => {       
       setProduto(produto);
       setOpenDialog(true);
    } 

    return <>
             <Button variant="contained" onClick={() => AbreDialog()}>Incluir</Button>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} size="small" aria-label="customized table">
                    <TableHead>                              
                        <StyledTableCell width={20}>Id</StyledTableCell>
                        <StyledTableCell width={100}>Nome</StyledTableCell>                     
                        <StyledTableCell  width={200}>Descricao</StyledTableCell>   
                        <StyledTableCell width={50}>Preco</StyledTableCell>   
                        <StyledTableCell width={70}>Data Cadastro</StyledTableCell>   
                        <StyledTableCell width={70}>Ações</StyledTableCell>                 
                    </TableHead>
                    <TableBody>
                        {isLoading ? <CircularProgress /> : produtos.map((produto, index) => ( 
                                                     
                        <StyledTableRow key={index}>                   
                            <StyledTableCell width={20}>{produto.id}</StyledTableCell>
                            <StyledTableCell width={100}>{produto.nome}</StyledTableCell>
                            <StyledTableCell  width={200}>{produto.descricao}</StyledTableCell>
                             <StyledTableCell width={50}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(produto.preco))}</StyledTableCell>
                             <StyledTableCell width={100}>{produto.dataCadastro.split('T')[0]}</StyledTableCell>
                            <StyledTableCell width={70}>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="Excluir"><DeleteIcon  sx={{ color: pink[500] }}/></IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                    <IconButton aria-label="Editar" onClick={() => handelEditar(produto)}><UpdateIcon color="primary"/></IconButton>        
                                </Tooltip>                                
                            </StyledTableCell>                    
                        </StyledTableRow>
                     ))}                
                    </TableBody>        
                </Table>
          </TableContainer>
           {openDialog && <ProdutoDialog id={props.id} open={openDialog}   
                                  produto={produto!}                                
                                  refetch={() => refetch()} 
                                  onClose={() =>  setOpenDialog(!openDialog) as unknown as boolean}/>} 
         </>
}