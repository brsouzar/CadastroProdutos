import { gql, useMutation } from "@apollo/client";
import {  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { NumericFormat } from 'react-number-format';
import { Produto } from "./TabelaProdutos";




type Props = { 
 onClose: () => boolean;   
 refetch: () => void;   
 open: boolean; 
 id: number;
 produto: Produto;
}

export const ProdutoDialog = (props: Props) => {
    const dataCad = new Date(props.produto.dataCadastro);
    const formattedDate = format(dataCad, 'yyyy/MM/dd', { locale: ptBR });  
    const { register, handleSubmit, formState: { errors }, control }  = useForm<Produto>({defaultValues: {
            id: props.produto.id,
            nome: props.produto.nome,
            descricao: props.produto.descricao,
            preco: props.produto.preco.toString(),
            dataCadastro: formattedDate
    } });
    const [open, setOpen] = useState(props.open);

    const REGISTER_MUTATION = gql`
              mutation registrarProdutoService($id:Int!, $categoriaId:Int!, $nome: String!,
                   $descricao: String!, $preco: Decimal!, $dataCadastro: DateTime!) {
                         registrarProdutoService(produto: {
                           id: $id  
                           categoriaId: $categoriaId
                           nome: $nome,
                           descricao: $descricao
                           preco: $preco
                           dataCadastro: $dataCadastro
                         }
                         ) {    
                              id
                              nome
                              descricao
                              preco
                              dataCadastro
                            }                         
             }`

   const [registerProduto] = useMutation(REGISTER_MUTATION);       

   const onSubmition = async (value: any) => {
       try {         
         var preco = value.preco.split('R$')[1];
         const formattedDate = format(value.dataCadastro, 'yyyy/MM/dd', { locale: ptBR });
         const precoConvert =  parseFloat(preco); 
         
         const { data } = await registerProduto({
                          variables: { id: 0, 
                                       categoriaId: props.id,
                                       nome: value.nome, 
                                       descricao: value.descricao, 
                                       preco: precoConvert, 
                                       dataCadastro: formattedDate}
                      });
            debugger;          
            if (data !== undefined) {               
                props.refetch();         
                alert('Produto cadastrado com sucesso!');
            }
            handleClose();
       } catch (err) {
          alert('Erro ao cadastrar Produto: ' + err);
       }

   }

    const handleClose = () => {
        setOpen(() => props.onClose());
     };    


  return (
          <Dialog
             open={open}
             onClose={handleClose}
             slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSubmit(onSubmition),
                },
                }}>                  
              <DialogTitle>
                <Typography variant="h5" component="h5">Cadastro Produtos</Typography>
              </DialogTitle>  
              <DialogContent>
               <Stack spacing={1}>
                <Stack direction={'row'} spacing={2}>
                <Grid size={8}>
                    <Controller 
                       render={() => {
                           return <TextField
                                        {...register("nome", { required: true})} 
                                        id="nome" 
                                        label="Nome" 
                                        size="small"                     
                                        error={errors.nome?.type === 'required'}
                                        helperText={errors.nome?.type === 'required' ? 'nome é requerido' : ''}
                                        variant="outlined" />   
                       }}
                       name='nome'
                       control={control}                        
                    />
                </Grid>
                <Grid size={4}>
                  <Controller 
                     {...register("dataCadastro", { required: true})} 
                     name="dataCadastro"
                     control={control}
                     render={({field}) => {
                        return  <TextField
                              {...field}
                              type="date"     
                              defaultValue={new Date(props.produto.dataCadastro)}                 
                              size="small"                                                                     
                              variant="outlined"
                              error={errors.dataCadastro?.type === 'required'}
                              helperText={errors.dataCadastro?.type === 'required' ? 'Data do cadastro é requerido' : ''}
                            />						
                           }}                        
                   />                    
                </Grid>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                    <Grid size={8}>
                        <TextField
                        {...register("descricao", { required: true })} 
                        id="descricao" 
                        label="Descricao"  
                        size="small"                     
                        error={errors.descricao?.type === 'required'}
                        helperText={errors.descricao?.type === 'required' ? 'Descricao é requerido' : ''}
                        variant="outlined" />
                    </Grid>
                    <Grid size={4}>
                        <Controller 
                           {...register("preco", { required: true })}                                              
                            render={({field}) => {
                                return  <NumericFormat 
                                           {...field}                                   
                                            customInput={TextField}
                                            decimalSeparator=","
                                            decimalScale={2}
                                            prefix="R$"
                                            size="small"
                                            variant="outlined"
                                            label="Preço"
                                            error={errors.preco?.type === 'required'}
                                            helperText={errors.preco?.type === 'required' ? 'Preço é requerido' : ''}                                            
                                        />
                                    }}
                             name="preco"
                             control={control}                               
                        />                       
                    </Grid>
                </Stack>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
              </DialogActions>
        </Dialog> 
         
      ); 
}