import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Cliente } from './graphql/Cliente';
import { NaviBarPrincipal } from './pages/NavBarPrincipal';
import { Route, Routes } from 'react-router-dom';
import { HomePrincipal } from './pages/HomePrincipal';
import { Categorias } from './pages/Categorias';
import { Produtos } from './pages/produtos/Produtos';

function App() {
  return (
    <div className="App">
        <ApolloProvider client={Cliente()}>        
            <NaviBarPrincipal />          
            <Routes>
              <Route path='/' element={<HomePrincipal />} />
              <Route path='/categorias' element={<Categorias />} />
              <Route path='/produtos' element={<Produtos />} />
            </Routes>
        </ApolloProvider>
      
    </div>
  );
}

export default App;
