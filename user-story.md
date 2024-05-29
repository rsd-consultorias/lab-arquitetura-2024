# User stories e planejamento das tarefas

## Template User Story

**[ID]** - Como **<i>[persona]</i>**, eu **<i>[quero]</i>**, **<i>[portanto]</i>**.

Exemplos:

```
[US-001] Como **cliente**, eu quero adicionar produtos no carrinho, para comprar os produtos que quero.

DoD: itens adicionados ao carrinho devem estar persistido durante toda a sessão de navegação do cliente.
---

[US-002] Como cliente, eu quero visualizar os produtos do carrinho a qualquer momento, assim posso saber o valor total da compra.

DoD: quando o cliente clicar para ver o carrinho, todos os itens adicionados anteriormente deverão listar e exibir o valor total (a soma de todos os itens considerando a quantidade incluída para cada item)
---
```

Ou **Gherkin Syntax**

Exemplos:

```
CENÁRIO: Adicionar produto ao carrinho
 QUANDO o cliente adicionar um item ao carrinho
  ENTÃO o valor total da compra deve ser atualizado

CENÁRIO: Listar itens do carrinho
   DADO que o cliente não finalizou a compra
 QUANDO o cliente listar os itens do carrinho
  ENTÃO deverá listar todos os itens adicionados
      E o valor total da compra deverá ser a soma do valor de todos itens considerando a quantidade adicionada para cada item
```

## Subtarefas

Exemplo:

```
[US-001]
  - Criar endpoint para incluir/atualizar itens do carrinho
  - Criar DTO para enviar itens para incluir no carrinho
  - ...
  - ...
  - ...
```