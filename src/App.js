import GradeProdutos from "./componentes/GradeProdutos";
import TabelaProdutos from "./produtosCarrinho/produtosCarrinho";
import BarraBusca from "./templates/BarraBusca";
import Cabecalho from "./templates/Cabecalho";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtosSelecionados")) || [];
    setProdutosAdicionados(produtosSalvos);

    fetch("https://fakestoreapi.com/products")
      .then((resposta) => resposta.json())
      .then((produtos) => {
        setProdutos(produtos);
      });  
  },[]);

  const [produtos, setProdutos] = useState([]);
  const [produtosAdicionados, setProdutosAdicionados] = useState([]);
  const [showTabela, setShowTabela] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const addProduto = (produtoInfo) => {
    const { produto, quantidade } = produtoInfo;
    const produtoComQuantidade = { ...produto, quantidade: quantidade };
    setProdutosAdicionados([...produtosAdicionados, produtoComQuantidade]);
    localStorage.setItem("produtosSelecionados", JSON.stringify([...produtosAdicionados, produtoComQuantidade]));
  };

  function excluirProduto(produtoSel) {
    setProdutosAdicionados(produtosAdicionados.filter((produto) => produto.id !== produtoSel.id));
    localStorage.setItem("produtosSelecionados", JSON.stringify(produtosAdicionados.filter((produto) => produto.id !== produtoSel.id)));
  }

  return (
    <div className="App">

        <Cabecalho/>
        { showTabela ? 
          <TabelaProdutos 
            produtosAdicionados={produtosAdicionados} 
            setShowTabela={setShowTabela} 
            setProdutosAdicionados={setProdutosAdicionados}
            excluirProduto={excluirProduto}
            editMode={editMode}
            setEditMode={setEditMode}
          /> : 
          <>
            <BarraBusca produtosAdicionados={produtosAdicionados} setShowTabela={setShowTabela}/>
            <GradeProdutos 
              listaProdutos={produtos} 
              produtosAdicionados={produtosAdicionados} 
              setProdutosAdicionados={setProdutosAdicionados}
              addProduto={addProduto}
            />
        </>
        }
    </div>
  );
}

export default App;
