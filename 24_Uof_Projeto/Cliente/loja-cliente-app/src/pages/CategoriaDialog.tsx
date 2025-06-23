
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, 
         DialogTitle, Grid, TextField, Typography } from "@mui/material"
import { gql, useMutation } from "@apollo/client";
import { Categoria } from "./Categorias";



type Props = {
    open: boolean; 
    onClose: () => boolean;   
    refetch: () => void;
    categoria: Categoria;
}

export const CategoriaDialog = (props: Props) => {
     const [open, setOpen] = useState(props.open);      
     
     const [nomeNew, setNomeNew] = useState('');   
     const [imageUrlNew, setImageUrlNew] = useState('');   
  
    // const { register } = useForm<Inputs>() 
   
     const handleClose = () => {
        setOpen(() => props.onClose());
     };

     const REGISTER_MUTATION = gql`
         mutation RegistrarCategoriasService($id:Int!, $nome: String!, $imageUrl: String!) {
                    registrarCategoria(categoria: {
                      id: $id  
                      nome: $nome,
                      imageUrl: $imageUrl
                    }
                    ) {    
                            id
                            nome
                            imageUrl    
                       }
                    
        }`

      const [registerCategoria] = useMutation(REGISTER_MUTATION);

      

     const handleSubmit = async (e: any) => {
         e.preventDefault();
            try { 
                const id =  parseInt(props.categoria.id);
                const { data } = await registerCategoria({
                                variables: { id: id, nome: nomeNew, imageUrl: imageUrlNew } 
                      });
                
                if  (data.registerCategoria) props.refetch();                
                setNomeNew('');
                setImageUrlNew('');            
                alert('Categoria cadastrado com sucesso!');
                handleClose();
            } catch (err) {
                alert('Erro ao cadastrar Categoria: ' + err);           
            }    
        }
      
        useEffect(() => {
            if (props.categoria.id !== '0') {
               setNomeNew(props.categoria.nome);
               setImageUrlNew(props.categoria.imageUrl);
            } else {
               setNomeNew('');
               setImageUrlNew('');
            }
        }, [props.categoria.id, props.categoria.imageUrl, props.categoria.nome])

    return (        
        <Grid container spacing={1}>           
         <Dialog 
                open={open}
                onClose={handleClose}
                slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSubmit,
                },
                }}>                     
              <DialogTitle><Typography variant="h5" component="h5">Cadastro Categorias</Typography></DialogTitle>
              <DialogContent>
                <Grid size={8}>
                   <TextField
                        value={nomeNew}
                        autoFocus
                        required
                        margin="dense"
                        id="nome"
                        name="nome"                        
                        label="Nome Categoria"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNomeNew(e.target.value)}
                    />
                </Grid>
                <Grid size={8}>
                   <TextField
                        value={imageUrlNew}
                        autoFocus
                        required
                        margin="dense"
                        id="imageUrl"
                        name="imageUrl"                        
                        label="caminho da imagem"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setImageUrlNew(e.target.value)}
                    />
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
              </DialogActions>
            </Dialog>
        </Grid>
     )
}


