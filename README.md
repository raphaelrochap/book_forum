# Book Fórum

## Description

Book Forum é uma rede social bem simples, que permite criar publicações e interagir comentando.
A idéia é que simule of antigos fóruns que dominavam a internet nos anos 90 e 2000.
Nesse caso a ideia do tema, é um fórum para discutir sobre livros em que os usuários estejam lendo.

## Stack utilizada

Para este projeto foi utilizada a Stack:

- Typescript  
- React
- NextJS
- NestJS
- SQLite

Para começar, ambos os projetos, back e front, foram desenvolvidos em Typescript, de forma a otimizar o tempo não tendo que lidar com erros difíceis de mapear e assim mantendo um código mais limpo e legível.
O backend foi desenvolvido em NestJS com TypeORM e Banco de Dados SQLite. O NestJS é um ótima ferramenta, que permite o desenvolvimentos de API REST de forma bem rápida, e foi bem útil. Como ORM, escolhi o TypeORM que é também bem simples de usar, e para esse caso atenderia muito bem. O SQLite foi o Banco de Dados escolhido pois é um banco feito para ser utilizado em pequenas aplicações, é bem leve, e não precisa que o desenvolvedor instale muitas coisas, por isso, creio que será simples para você utilizá-lo. :D

No frontend foi usada a Stack: React, NextJS e ChakraUI. O React é uma biblioteca que facilita muito a criação de Componentes Web e permite um bom uso dos mesmos, e quando integrado ao NextJS, temos ums ótima ferramenta nas mãos, com ele é possível criar rotas de um jeito fácil, e incusives rotas dinâmicas. O ChakraUI é uma bibliotexa de componentes que facilita bastante o processo de desenvolvimento e permite utilizar porps como se fossem atributos CSS, bem similar ao TailwindCSS.

## Bibliotecas utilizadas

Para o desenvolvimento deste projeto foram utilizadas algumas bibliotecas, como:

- Zustand

O Zustand é um gerenciador de estados muito simples de utilizar, com ele consegui guardar informações do usuário, token de autenticação da API e ainda persistir esses dados no navegador, para que qualquer refresh permite que a nevegação continue normalmente.

- Axios

O Axios te dá ferramentas que permitem se comunicar com APIs REST, com ela fiz todas as requisições ao backend do sistema.

- sqlite3

O sqlite3 permite a interação com o Banco de Dados SQLite, com ele que foi possível fazer o TypeORM se comunicar com este Banco de Dados.

- nodemailer

O NodeMailer é uma biblioteca que permite o envio de emails via código, dessa maneira pude configurar para que envie um email ao dono do Post quando um comentário for adicionado ao seu Post.

- react-icons

O React Icons é uma biblioteca que disponibiliza diversos ícones para serem utilizadas na aplicação, com elas é possível melhorar o aspecto do site.

## Versões

Foram utilizadas as versões: 11 do NestJS, 0.3.20 do TypeORM, 5.1.7 do sqlite3, 19 do React, 15 do NextJS, 1.7.9 do axios, 2 do ChakraUI, 5 do Zustand, 5 do React Icons e 5 do Typescript.


## Baixar dependências

Para ambos projetos, backend e frontend, basta rodar este comando em suas respectivas pastas:

```bash
$ npm install
```

## Compilando e rodando o projeto

### Backend

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

### Frontend

```bash
# development
$ npm run dev

# build
$ npm run build

# production
$ npm run start
```