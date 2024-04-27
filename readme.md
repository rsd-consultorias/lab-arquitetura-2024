# Lab Arquitetura 2024

### Visão Geral da Solução

![Visão Geral](docs/c4-model.jpg)


### Arquitetura de Software

![Modelo](docs/arquitetura-software.jpg)

![Diagrama de Interação](docs/diagrama-interacao.jpg)

## Planejamento e Controle do Ciclo de Desenvolvimento

### Planejamento do desenvolvedor

### Controle da gestão/liderança

- Premissas
    - Deverá já ter definida a arquitetura do software no início do projeto
    - Deverá ter a definição de pronto para qualidade de código ANTES de iniciar o desenvolvimento
    - Desenho macro da solução já deverá ser fornecido e estar claro para todo o time
    - A arquitetura deve permitir a entrega do projeto em incrementos funcionais para que os milestones sejam alcançados

- O dev precisa minimamente se planejar antes de escrever código. Caso a história não disponibilize, deverá ser criado pelo menos:
    - Diagrama de caso de uso: ajuda no entendimento das regras e as interações com atores (aplicativos, arquétipos, api externas, etc)
    - Diagram de classes para atender a história. Deverá complementar o digrama de classes já fornecido no início do projeto
    - Se a regra se mostrar complexa, lance mão da criação de diagramas de interação ou de diagrama de sequência. Esse dará respaldo para refinar a história junto ao product owner ou analista responsável pela definição das regras de negócio
    - Essa análise guiará o planejamento de esforço/prazo para implementação

- Entregável
    - Após análise o desenvolvedor deverá definir pelo menos 3 milestones para o desenvolvimento da história:
        - Projeto rodando com a(s) controller(s) anotada(s) para gerar o Swagger
        - Repositories definidas e script para criação/alteração do banco de dados
        - Finalização da história e realização de teste integrado para liberar como concluída

## Auxílio na Estimativa

### Controller
> Atividades necessárias para definir um contrato para entrada e saída de dados dos endpoints da controller, implementação das DTO e ViewModels para atender os contratos e construção da lógica necessária para expor o endpoint funcionando retornando uma instância do objeto de retorno apenas para atender o caso de uso, portanto atender o teste unitário, desses endpoints.

### Models
> Atividades necessárias para desenvolvimento do código necessário para definir as classes que representam o modelo do contexto de negócio que a aplicação deve atender.

### Service
> Atividades necessárias para implementar as regras de negócios para atender os casos de uso definidos para a história, fazer a chamada da service pela controller e atender o teste de unidade dessa história.

### Repositories e Services Interfaces
> Atividades necessárias para persistência dos dados no banco de dados e implementação dos repositórios exigidos pela service.

### Implementação da infra
> Atividades necessárias para atender o desenvolvimento dos serviços externos à aplicação que são exigidos para atender os casos de uso da service.