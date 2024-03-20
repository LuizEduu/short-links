### Short-Link
Short-Link é uma aplicação backend desenvolvida em Node.js e TypeScript que permite a criação e gerenciamento de links curtos, além de oferecer redirecionamento para URLs originais.
A aplicação utiliza Fastify para roteamento de requisições, PostgreSQL como banco de dados relacional para armazenamento dos links e Redis para o rankeamento de dados, fornecendo métricas sobre os links mais acessados.

Pré-requisitos
Node.js 20.x
Docker

### uso
na raiz do projeto execute o comando docker-compose up -d
com o ambiente configurado execute o comando npm run dev
utilize um client http de sua preferencia para acessar as rotas
