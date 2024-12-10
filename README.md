# PHC Vision

## Índice

<details>
   <summary>Índice</summary>
   <ol>
   <li><a href="#modelagem-de-dados">Modelagem de Dados</a>
      <ul>
         <li><a href="#diagrama-de-entidade">Diagrama de Entidade</a></li>
         <li><a href="#entidades">Entidades</a></li>
         <li><a href="#relacionamentos">Relacionamentos</a></li>
      </ul>
   </li>
   </ol>
</details>

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
