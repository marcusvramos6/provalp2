import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

export default function TabelaProdutos(props) {
  const [quantidadesEditadas, setQuantidadesEditadas] = useState({});
  const [produtoQuantidadeEditada, setProdutoQuantidadeEditada] = useState({});
  const [edicaoAtiva, setEdicaoAtiva] = useState({});

  function editarQuantidade(produto, novaQuantidade) {
    const quantidadeAtualizada = { ...produtoQuantidadeEditada };
    quantidadeAtualizada[produto.id] = novaQuantidade;
    setProdutoQuantidadeEditada(quantidadeAtualizada);

    const updatedProdutosAdicionados = props.produtosAdicionados.map((p) => {
      if (p.id === produto.id) {
        return { ...p, quantidade: novaQuantidade };
      }
      return p;
    });
    
    props.setProdutosAdicionados(updatedProdutosAdicionados);
  }

  function iniciarEdicao(produto) {
    const edicaoAtualizada = { ...edicaoAtiva };
    edicaoAtualizada[produto.id] = true;
    setEdicaoAtiva(edicaoAtualizada);
  }

  function encerrarEdicao(produto) {
    const edicaoAtualizada = { ...edicaoAtiva };
    edicaoAtualizada[produto.id] = false;
    setEdicaoAtiva(edicaoAtualizada);
    setQuantidadesEditadas({});
  }

  return (
    <Container>
      <Button
        type="button"
        style={{ backgroundColor: "rgb(255, 60, 60)" }}
        className="mb-3"
        onClick={() => {
          props.setShowTabela(false);
        }}
      >
        Ver mais produtos
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th style={{ width: "150px" }}></th>
          </tr>
        </thead>
        <tbody>
          {props.produtosAdicionados.map((produto) => {
            const quantidadeEditada = quantidadesEditadas[produto.id] || produto.quantidade;
            const estaSendoEditado = edicaoAtiva[produto.id];

            return (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.price}</td>
                <td>{produto.description}</td>
                <td>{produto.category}</td>
                <td>
                    {estaSendoEditado ? (
                        <input
                        type="number"
                        style={{ width: "100px" }}
                        value={quantidadeEditada}
                        onChange={(e) => editarQuantidade(produto, parseInt(e.target.value))}
                        />
                    ) : (
                        quantidadeEditada
                    )}
                </td>
                <td>
                  {estaSendoEditado ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => encerrarEdicao(produto)}
                      >
                        <FaCheck />
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => encerrarEdicao(produto)}
                      >
                        <FaTimes />
                      </Button>{" "}
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        onClick={() => iniciarEdicao(produto)}
                      >
                        <FaEdit />
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => {
                          props.excluirProduto(produto);
                        }}
                      >
                        <FaTrash />
                      </Button>{" "}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
