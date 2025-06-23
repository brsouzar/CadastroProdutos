import { Button,  CircularProgress, Grid, IconButton, styled, Table, TableBody, 
  TableContainer, TableHead, TableRow, 
  Tooltip,
  Typography} from "@mui/material"

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { gql, useMutation, useQuery } from "@apollo/client";
import {  useEffect, useState } from "react";
import { pink } from "@mui/material/colors";
import { CategoriaDialog } from "./CategoriaDialog";




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'start',
  display: 'flex',
  justifyContent: 'space-between',    
  flexDirection: "row",  
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

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


export type Categoria = {
  id: string,
  nome: string,
  imageUrl: string
}

export const Categorias = () => {   
    
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({
    id: '0',
    nome: '',
    imageUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

   const queryCategorias = gql`
     query {
        categorias {
              id
              nome
              imageUrl
          }
     }
    `
   const { loading, error, data, refetch } = useQuery(queryCategorias);

   const EXCLUIR_CATEGORIA_MUTATION = gql`
         mutation ExcluirCategoria($id: Int!) {
              excluirCategoria(id: $id)  
          }      
      `
      const [excluirCategoria] = useMutation(EXCLUIR_CATEGORIA_MUTATION);
      const excluiCategoria = async (e: any, categoria: Categoria) => {
           e.preventDefault();
           try {
              const id =  parseInt(categoria.id);
              const { data } = await excluirCategoria({
                                variables: { id: id } 
                      });
              if (data.excluirCategoria !== undefined) {
                 alert(data.excluirCategoria.toString());
                 refetch(); 
              }        
                      
           } catch (error) {
               alert("error " + error);
           }           
      }


   useEffect(() => {
      if (loading) return setIsLoading(true);
      if (error) return alert(error.message.toString());
      setIsLoading(false);
      return setCategorias(data!.categorias);
   }, [data, error, isLoading, loading])
    
   const AbreDialog = () => {
      setCategoria({
        id: '0',
        nome: '',
        imageUrl: ''
      })
      setOpenDialog(true);
   }

   const UpdateCategorias = (categoria: Categoria ) => {
       setCategoria(categoria)
       setOpenDialog(true);
   }

   return <Grid container spacing={1}>      
       <Grid size={12}>
           <Item>
              <Typography variant="h5">
                 <strong>Categorias</strong>
              </Typography>
              <Button variant="contained" onClick={AbreDialog}>Incluir</Button>                            
           </Item>
       </Grid>
       <Grid size={12}>
         <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} size="small" aria-label="customized table">
              <TableHead>                              
                  <StyledTableCell width={25}>Id</StyledTableCell>
                  <StyledTableCell>Nome</StyledTableCell>                     
                  <StyledTableCell width={70}>Image</StyledTableCell>   
                  <StyledTableCell width={100}>Ações</StyledTableCell>                 
              </TableHead>
              <TableBody>                
                {isLoading ? <CircularProgress /> : categorias.map((categoria, index) => (
                   <StyledTableRow key={index}>                   
                       <StyledTableCell width={25}>{categoria.id}</StyledTableCell>
                       <StyledTableCell width={500}>{categoria.nome}</StyledTableCell>
                       <StyledTableCell width={70}>{categoria.imageUrl}</StyledTableCell>
                       <StyledTableCell>
                          <Tooltip title="Delete">
                             <IconButton aria-label="Excluir" onClick={(e) => excluiCategoria(e, categoria)}><DeleteIcon  sx={{ color: pink[500] }}/></IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                             <IconButton aria-label="Editar" onClick={() => UpdateCategorias(categoria) }><UpdateIcon color="primary"/></IconButton>        
                          </Tooltip>
                           
                       </StyledTableCell>                    
                  </StyledTableRow>
                ))}                
              </TableBody>
          </Table>
           </TableContainer>
       </Grid>    
       {openDialog && (<CategoriaDialog open={openDialog} 
                          categoria={categoria!} 
                          refetch={() => refetch} 
                          onClose={() => setOpenDialog(!openDialog) as unknown as boolean} />)}   
   </Grid>
   
}
    

