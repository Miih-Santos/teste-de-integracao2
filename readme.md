# 🔐 Sistema de Autenticação e Cadastro (API REST)

Este repositório contém a infraestrutura de backend para um sistema completo de login, cadastro de usuários e gestão de perfis (incluindo endereços e telefones). Desenvolvido com foco em segurança e escalabilidade, este módulo servirá como o motor de autenticação e acesso principal para o nosso futuro Trabalho de Conclusão de Curso (TCC).

Desenvolvido por **Vinícius** e **Mirela**.

---

## 🛠️ Tecnologias e Dependências

O projeto foi construído utilizando Node.js e ecossistema JavaScript, com as seguintes bibliotecas principais:

* **express**: Framework minimalista responsável pela estruturação do servidor, rotas e middlewares.
* **mysql2**: Driver assíncrono para comunicação e transações relacionais com o banco de dados MySQL.
* **jsonwebtoken (JWT)**: Responsável pela geração e validação de tokens de acesso, garantindo rotas privadas seguras.
* **passport** & **passport-google-oauth20**: Implementação da estratégia de autenticação OAuth2 para permitir o login social integrado à conta do Google.
* **cors**: Middleware para liberar e gerenciar o acesso à API a partir de domínios externos (Frontend).
* **helmet**: Adiciona camadas de segurança automáticas aos cabeçalhos HTTP da aplicação.
* **express-rate-limit**: Previne ataques de força bruta ou sobrecarga, limitando a quantidade de requisições que um mesmo IP pode fazer em um intervalo de tempo.

**Dependências de Desenvolvimento (Testes):**
* **jest**: Framework de testes utilizado para garantir o funcionamento correto das regras de negócio e inserções no banco (Testes Unitários).
* **supertest**: Biblioteca para simular requisições HTTP locais, validando as respostas completas das rotas (Testes de Integração).

---

## 📂 Arquitetura e Estrutura de Pastas

A aplicação segue uma divisão clara de responsabilidades (Design Pattern baseado em DAO e MVC) para facilitar a manutenção e a escalabilidade do código.

* **`/DAO` (Data Access Object):** Contém os arquivos responsáveis exclusivamente pela comunicação direta com o banco de dados. Organizado em subpastas (`doador`, `endereco_doador`, `telefone_doador`), centraliza todas as *queries* e comandos SQL (INSERT, SELECT, UPDATE, DELETE).
* **`/routes`:** Atua como a camada de controladores (Controllers). Define os endpoints da API (ex: `/login`, `/cadastro`, `/auth/google`), recebe as requisições HTTP, chama os serviços adequados e devolve as respostas em JSON para o cliente.
* **`/src/config`:** Guarda as configurações globais de bibliotecas externas, como a inicialização da estratégia OAuth2 do Google no Passport.
* **`/src/middleware`:** Contém funções interceptadoras que rodam antes da requisição chegar à rota final. Utilizado para regras como a verificação de existência de Token JWT em rotas protegidas ou validações de payload de cadastro.
* **`/src/service`:** Responsável pelas regras de negócio e orquestração. Guarda o pool de conexão do MySQL e gerencia rotinas complexas, como transações de banco de dados (`beginTransaction`, `commit`, `rollback`) para garantir a integridade dos dados durante um cadastro completo.
* **`/tests`:** Abriga o ecossistema de testes automatizados da aplicação.
  * `/unit`: Testes isolados para as funções do `/DAO`, simulando as conexões de banco de dados (mocks).
  * `/integration`: Testes ponta a ponta dos endpoints HTTP, verificando o fluxo real de requisição, processamento e resposta, como o fluxo de login e suas validações de erro.

*Tudo posso naquele que me fortalece - Filipenses 4:13*