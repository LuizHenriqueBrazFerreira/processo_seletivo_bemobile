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

## Iniciando a aplicação

 Para dar início a aplicação deve-se inicialmente iniciar os containers, para isso,
 basta usar o comando:

```:
  docker-compose up -d --build
```

 Este comando irá iniciar os container da aplicação, os quais são:

```:
├── db -> responsável por instanciar o MySQL
├── backend -> responsável por instanciar a aplicação em si
```

 Feito a inicialização dos contâiners, deve-se então usar o seguinte comando:

```:
  npm run start:db
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

- **GET /clients/**: Lista todos os clientes cadastrados na aplicação. Esta rota retorna uma lista com todos os clientes, incluindo seus dados como nome, dados
de onde mora, número de telefone, CEP e ID.

- **GET /clients/info**: Detalha as informações de um cliente específico pelo seu ID. Esta rota é útil para obter todas as informações de um cliente, incluindo dados de contato e histórico de compras. O formato de requisição nessa rota é pela URL, assim caso queira buscar um cliente especifico a rota usada é `clients/info?id=`, é
possível tambem filtrar por data (mês e ano), assim como por datas maiores ou menores que a informada, seguindo o padrão: `clients/info?id={id}&filter_by={ano-mes}`
para ter uma busca pelas compras feitas por aquele cliente exatamente no mês e ano informados ou `clients/info?id={id}&filter_by={ano-mes}&value={less/greater}`, onde
less é para datas menores que a informada e greater para datas maiores

- **POST /clients/register**: Permite o cadastro de um novo cliente na aplicação. É necessário enviar no corpo da requisição os dados do cliente, como nome, email, e informações de contato.

- **PUT /clients/update/:id**: Atualiza os dados de um cliente específico pelo seu ID. Esta rota requer que sejam enviados no corpo da requisição os dados do cliente que se deseja atualizar.

- **DELETE /clients/delete/:id**: Realiza a exclusão lógica (soft delete) de um cliente pelo seu ID. Esta rota não remove os dados do cliente permanentemente do banco de dados, mas marca o cliente como inativo, preservando seu histórico para referências futuras.

### Produtos

- **GET /products/**: Lista todos os produtos disponíveis.
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

## English Version

Hello, my name is Luiz Henrique, this repository contains the solution proposed for the selection process. It
consists of a back-end application, made in Adonisjs, v.6, associated with Lucid and using a MySQL database
to store the data. The repository structure is as follows:

``` Application Structure
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

## Starting the application

To start the application, you must first initiate the containers by using the command:

```:
 docker-compose up -d --build
```

This command will start the application's containers, which are:

├── db -> responsible for instantiating MySQL
├── backend -> responsible for instantiating the application itself

After initializing the containers, you should then use the following command:

```:
 npm run db:start

```

Having completed these steps, the application is ready for use. As requested, the routes
for the application are:

```:
  (USERS):
  
  User system registration (signup);

  Login with JWT for registered users (login);
```

```:
  (CLIENTS):

  List all registered clients (index)
  only main data should be here;
  order by id;

  Detail a client and sales to them (show):
  bring the most recent sales first;
  possibility to filter sales by month + year;
  add a client (store);

  Edit a client (update);

  Delete a client and sales to them (delete);
```

```:
  (PRODUCTS):
  List all registered products (index):
  only main data should be here;
  order alphabetically.
  Detail a product (show);
  Create a product (store);
  Edit a product (update);
  Logical deletion ("soft delete") of a product (delete);
```

```:
  (SALES):

  register sale of 1 product to 1 client (store).

  P.S: routes for sales were also developed:
  show all sales (index);
  show a specific sale (show);
  update a sale (update);
  delete a sale (delete)

  These routes, however, are commented out but functional,
  if there is interest in evaluating their operation, it
  is necessary to uncomment the lines (remove the "//" before
  each route and also from each method in sales_controller.ts)
```

>Note: routes in clients, products, and sales should only be accessible by logged-in users.

## Application Routes

### Clients

Client routes allow managing the application's client information.

- **GET /clients/index**: Lists all clients registered in the application.
  This route returns a list of all clients, including their data such as name, address, phone number, ZIP code, and ID.

- **GET /clients/info**: Details the information of a specific client by their ID. This route is useful for obtaining all the information of a client, including contact data and purchase history. The request format on this route is through the URL, so if you want to search for a specific client the route used is `clients/info?id=`, it is also possible to filter by date (month and year), as well as by dates greater or less than the one provided, following the standard: `clients/info?id={id}&filter_by={year-month}` to have a search for purchases made by that client exactly in the month and year informed or `clients/info?id={id}&filter_by={year-month}&value={less/greater}`, where less is for dates less than the one informed and greater for dates greater.

- **POST /clients/create**: Allows the registration of a new client in the application. It is necessary to send in the request body the client's data, such as name, email, and contact information.

-**PUT /clients/update/:id**: Updates the data of a specific client by their ID. This route requires that the client's data to be updated be sent in the request body.

-**DELETE /clients/delete/:id**: Performs a logical deletion (soft delete) of a client by their ID. This route does not permanently remove the client's data from the database but marks the client as inactive, preserving their history for future references.

### Products

-**GET /products/index**: Lists all available products.
-**GET /products/:id**: Details a specific product by its ID.
-**POST /products/register**: Creates a new product. Necessary to send in the request body the product's data.
-**PUT /products/update/:id**: Updates the data of a specific product by its ID.
-**DELETE /products/delete/:id**: Performs a logical deletion (soft delete) of a product by its ID.

### Sales

-**POST /sales/register**: Registers the sale of a product to a client. Necessary to send in the request body the sale's data.

>Note: The routes for sales are currently commented out in the code but are fully functional. To use them, remove the comments (//) from the lines corresponding to the sales routes and the methods in sales_controller.ts. Validations when registering the sale are done in the middleware.

### Users

-**POST /users/register-user**: To start using the application, the user must register, providing an email and password. Each email must be unique, and the application does not allow duplicates.

-**POST /users/login**: After registration, the user must log in to the application. If the user exists, a Bearer token will be returned and must be used in the Authorization header of subsequent requests.
Authentication

All routes, except /users/register and /users/login, require authentication. The token obtained at login must be included in the Authorization header of the requests, in the format `Bearer <token>`.

### How to Uncomment the Sales Routes

To evaluate the operation of the sales routes, follow these steps:

1. Open the routes.ts file.
2. Look for the sales routes, which are commented out.
3. Remove the // from the beginning of each line corresponding to the sales routes and the methods in sales_controller.ts.

### Observations

- Routes for clients, products, and sales can only be accessed by logged-in users.
- Remember to follow good security practices, such as not exposing sensitive information and using secure connections.
