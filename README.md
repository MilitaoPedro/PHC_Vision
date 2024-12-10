# PHC Vision

Será desenvolvido um software capaz de prover CRUDs para projetos, tarefas, usuário, gerente e possíveis outras demandas da empresa. Esse sistema  possuirá um interface simples e intuitiva que prioriza a experiência do usuário e o torna capaz de gerir um projeto e alocar outras pessoas para determinadas tarefas. Além disso, será possível criar uma lista de tarefas pessoal, sem a necessidade da criação de um projeto e/ou envolvimento de outros usuários. O sistema possuirá autorização e autenticação para permitir que apenas pessoas autorizadas consigam realizar o acesso e alteração dos dados. Já os dados referente ao login e senha estarão criptografados no banco de dados. Toda comunicação entre o frontend e backend deverá ser criptografada, tornando assim a aplicação segura.

## Motivação

Em diversas empresas, as funções são divididas entre os funcionários a partir de planilhas passadas semanalmente. Tal modus operandi, é um tanto quanto desorganizado e torna necessário a alocação de um funcionário para a criação e gerenciamento das planilhas. Além disso, muitos negócios utilizam softwares de gestão de tempo/pessoas. Porém, essas soluções geralmente não estão adaptadas às necessidades reais da empresa, sendo muito generalistas. Ademais, a partir de uma pesquisa de mercado, descobrimos que, por diversas vezes, esses softwares foram rotulados como não intuitivos para novos funcionários, fazendo com que, a cada nova contratação, seja necessário um longo tempo de adaptação ao nosso sistema de gestão. 

## Autores

[Pedro Militão Mello Reis](https://github.com/MilitaoPedro)
[Henrique César Silva Soares]((https://github.com/henriqueecss))
[Clarisse Lacerda Pimentel](https://github.com/Clarisse-Pimentel)
## Ferramentas

 - Node.js (v22.12.0)
 - React Framework
 - Express
 - Docker
 - FireBase (NoSQL Database)

## Iniciando o desenvolvimento

Para conseguir rodar na sua máquina, siga o passo a passo a seguir.

### Pré-requisitos

- Node.js

```sh
https://nodejs.org/en/download/
```

> [!TIP]
> - Recomendamos [nvm](https://github.com/nvm-sh/nvm) para gerenciar as versões do Node (Linux e Mac)
> - Se está utilizando Windows, existe a opção do [nvm-windows](https://github.com/coreybutler/nvm-windows)

- [PNPM](https://pnpm.io/installation) - se algum dos comandos abaixo não funcionar, consulte a [documentação da ferramenta](https://pnpm.io/)

   - Linux/OSX

      ```sh
      curl -fsSL https://get.pnpm.io/install.sh | sh -
      ```

   - Windows

      ```sh
      iwr https://get.pnpm.io/install.ps1 -useb | iex
      ```

- Docker (será utilizado principalmente para banco de dados para desenvolvimento)

   ```sh
   https://www.docker.com/get-started/
   ```

## Instalação

Clone o repositório

```sh
git clone https://github.com/MilitaoPedro/PHC_Vision
```

1. Instale as dependências

   ```sh
   pnpm install
   ```

2. Rode os containers (ou pare-os, se necessário):
  
   ```sh
   pnpm compose:up
   ```

3. Rode o script de configuração

   ```sh
   pnpm config:local
   ```

4. Rode os projetos

   ```sh
   pnpm start:dev
   ```


## Design PHC Vision

Este documento descreverá o design técnico do projeto PHC Vision, incluindo a arquitetura geral, organização de código e diagrama de entidade. O objetivo é fornecer uma visão geral do projeto.

## Modelagem de Dados

O projeto PHC Vision é uma plataforma de gestão de tarefas/projetos pessoais e/ou em grupo. A modelagem de dados é essencial para garantir a integridade e consistência dos dados da aplicação, bem como para facilitar a interação entre os diferentes componentes do sistema.

### Diagrama de Caso de Uso



---
