import { gql, useQuery } from "@apollo/client";
import { Box,  Grid, InputLabel, MenuItem, 
        Paper, Select, styled,  Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Categoria } from "../Categorias";
import { TabelaProdutos } from "./TabelaProdutos";



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

export const Produtos = () => {

     const [categorias, setCategorias] = useState<Categoria[]>([]);
     const [selecionado, setSelecionado] = useState(1);
     
     const queryCategorias = gql`
         query Categorias{
            categorias {
                  id
                  nome                  
              }
         }
        `
     const { loading, error, data  } = useQuery(queryCategorias);

      useEffect(() => { 
           if (error) return alert(error.message.toString());           
           if (!loading) return setCategorias(data!.categorias);

        }, [data, error, loading])           
     
         const handleSelectChange = (event: any) => {
            setSelecionado(event.target.value);
           
         };
    
      
  
    return <Grid container spacing={0}> 
        <Grid size={12}>
           <Item>
              <Typography variant="h5">
                 <strong>Produtos</strong>
              </Typography>
               <Box >
                <InputLabel id="categoriasLbl">Categorias</InputLabel>
                <Select 
                        value={selecionado}
                        onChange={handleSelectChange}
                        size="small"                                       
                        labelId="categoriasLbl"
                        id="categorias"                                        
                        autoWidth
                        label="Categorias"
                    >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {categorias.map((categoria, index) => (
                        <MenuItem key={index} value={categoria.id}><em>{categoria.nome}</em></MenuItem>
                    ))}
                    </Select>              
                </Box>                           
                  
           </Item>           
       </Grid> 
       <Grid size={12}>
          <TabelaProdutos id={selecionado} />
       </Grid>          
    </Grid>     
   
}