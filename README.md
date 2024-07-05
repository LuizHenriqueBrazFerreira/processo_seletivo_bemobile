# Repositório - Processo Seletivo BeMobile Desenvolvedor Back-end Jr

Olá, me chamo Luiz Henrique, este repositório contém a solução para o que foi proposto
para o processo seletivo, ele consiste numa aplicação back-end, feita em Adonisjs, v.6
associada com o Lucid e possuindo uma base MySQL para guardar o dados. A estruturação
do repositório encontra-se da seguinte forma:

``` Estrutura da aplicação
 ├── app/
 │ ├── controller/
 │ ├── model/
 │ └── middleware/
 ├── database/
 │ ├── migrations/
 │ └── seeders/
 ├── enum/
 │ ├── client.ts
 │ ├── product.ts
 │ └── user.ts
 ├── start/
 │ └── routes.ts
 ├── tests/
 ├──Dockerfile
 ├──docker-compose.yaml

```

 -- Iniciando a aplicação --

 Para dar início a aplicação deve-se inicialemnte iniciar os containers, para isso,
 basta usar o comando:

```docker-compose up -d --build
```

 Este comando irá iniciar os container da aplicação, os quais são:

  |-- db -> responsável por instanciar o MySQL
  |-- backend -> responsável por instanciar a aplicação em si

 Feito a inicialização dos contâiners, deve-se então usar o seguinte comando:

```npm run start:db
```

Realizado essas etapas, a aplicação está pronta para uso, conforme solicitado, as rotas
para a aplicação são:

```:
  
  (USERS):
  
  cadastro de usuário do sistema (signup);

  login com JWT de usuário cadastrado (login);
```

```:

    (CLIENTS):

    listar todos os clientes cadastrados (index)
    apenas dados principais devem vir aqui;
    ordenar pelo id;

    detalhar um(a) cliente e vendas a ele(a) (show):
    trazer as vendas mais recentes primeiro;
    possibilidade de filtrar as vendas por mês + ano;
    adicionar um(a) cliente (store);

    editar um(a) cliente (update);

    excluir um(a) cliente e vendas a ele(a) (delete);
```

```:

    (PRODUTOS):

    listar todos os produtos cadastrados (index):
    apenas dados principais devem vir aqui;
    ordenar alfabeticamente.
    detalhar um produto (show);
    criar um produto (store);
    editar um produto (update);
    exclusão lógica ("soft delete") de um produto (delete);
```

```:
    (VENDAS):

    registrar venda de 1 produto a 1 cliente (store).

    P.S: foi desenvolvido também as rotas para vendas:
    mostrar todas as vendas (index);
    mostrar uma venda específica (show);
    atualizar uma venda (update);
    deletar uma venda (delete)

    Estas rotas no entanto estão comentadas, mas funcionais,
    caso seja do interesse avaliar o funcionamento delas, é
    preciso descomentar as linhas (remover o "//" antes de
    cada rota e também de cada método na sales_controller.ts)
```

>Nota: as rotas em clientes, produtos e vendas só devem poder ser acessadas por usuário logado.

## Rotas da Aplicação

### Clientes

As rotas de clientes permitem gerenciar as informações dos clientes da aplicação.

- **GET /clients/index**: Lista todos os clientes cadastrados na aplicação. Esta rota retorna uma lista com todos os clientes, incluindo seus dados como nome, dados
de onde mora, número de telefone, CEP e ID.

- **GET /clients/info**: Detalha as informações de um cliente específico pelo seu ID. Esta rota é útil para obter todas as informações de um cliente, incluindo dados de contato e histórico de compras. O formato de requisição nessa rota é pela URL, assim caso queira buscar um cliente especifico a rota usada é `clients/info?id=`, é
possível tambem filtrar por data (mês e ano), assim como por datas maiores ou menores que a informada, seguindo o padrão: `clients/info?id={id}&filter_by={ano-mes}`
para ter uma busca pelas compras feitas por aquele cliente exatamente no mês e ano informados ou `clients/info?id={id}&filter_by={ano-mes}&value={less/greater}`, onde
less é para datas menores que a informada e greater para datas maiores

- **POST /clients/create**: Permite o cadastro de um novo cliente na aplicação. É necessário enviar no corpo da requisição os dados do cliente, como nome, email, e informações de contato.

- **PUT /clients/update/:id**: Atualiza os dados de um cliente específico pelo seu ID. Esta rota requer que sejam enviados no corpo da requisição os dados do cliente que se deseja atualizar.

- **DELETE /clients/delete/:id**: Realiza a exclusão lógica (soft delete) de um cliente pelo seu ID. Esta rota não remove os dados do cliente permanentemente do banco de dados, mas marca o cliente como inativo, preservando seu histórico para referências futuras.

### Produtos

- **GET /products/index**: Lista todos os produtos disponíveis.
- **GET /products/:id**: Detalha um produto específico pelo seu ID.
- **POST /products/register**: Cria um novo produto. Necessário enviar no corpo da requisição os dados do produto.
- **PUT /products/update/:id**: Atualiza os dados de um produto específico pelo seu ID.
- **DELETE /products/delete/:id**: Realiza a exclusão lógica (soft delete) de um produto pelo seu ID.

### Vendas

- **POST /sales/register**: Registra a venda de um produto para um cliente. Necessário enviar no corpo da requisição os dados da venda.

> **Nota**: As rotas para vendas estão atualmente comentadas no código, mas são totalmente funcionais. Para utilizá-las, remova os comentários (`//`) das linhas correspondentes nas definições de rotas e nos métodos em `sales_controller.ts`. As validações na hora de realizar o cadastro da venda estão feitas no middleware.

### Usuários

- **POST /users/register-user**: Para começar a usar a aplicação, o usuário deve se registrar, fornecendo um email e senha. Cada email deve ser único, e a aplicação não permite duplicatas.
- **POST /users/login**: Após o registro, o usuário deve fazer login na aplicação. Se o usuário existir, um token no padrão Bearer será retornado e deve ser usado no cabeçalho `Authorization` das requisições subsequentes.

## Autenticação

Todas as rotas, exceto `/users/register` e `/users/login`, requerem autenticação. O token obtido no login deve ser incluído no cabeçalho `Authorization` das requisições, no formato `Bearer <token>`.

## Como Descomentar as Rotas de Vendas

Para avaliar o funcionamento das rotas de vendas, siga estes passos:

1. Abra o arquivo `routes.ts`.
2. Procure pelas rotas de vendas, que estão comentadas.
3. Remova o `//` do início de cada linha correspondente às rotas de vendas e aos métodos em `sales_controller.ts`.

## Observações

- As rotas de clientes, produtos e vendas só podem ser acessadas por usuários logados.
- Lembre-se de seguir as boas práticas de segurança, como não expor informações sensíveis e utilizar conexões seguras.
