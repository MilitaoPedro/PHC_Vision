# PHC Vision

Será desenvolvido um software capaz de prover CRUDs para projetos, tarefas, usuário, gerente e possíveis outras demandas da empresa. Esse sistema  possuirá um interface simples e intuitiva que prioriza a experiência do usuário e o torna capaz de gerir um projeto e alocar outras pessoas para determinadas tarefas. Além disso, será possível criar uma lista de tarefas pessoal, sem a necessidade da criação de um projeto e/ou envolvimento de outros usuários. O sistema possuirá autorização e autenticação para permitir que apenas pessoas autorizadas consigam realizar o acesso e alteração dos dados. Já os dados referente ao login e senha estarão criptografados no banco de dados. Toda comunicação entre o frontend e backend deverá ser criptografada, tornando assim a aplicação segura.

## Motivação

Em diversas empresas, as funções são divididas entre os funcionários a partir de planilhas passadas semanalmente. Tal modus operandi, é um tanto quanto desorganizado e torna necessário a alocação de um funcionário para a criação e gerenciamento das planilhas. Além disso, muitos negócios utilizam softwares de gestão de tempo/pessoas. Porém, essas soluções geralmente não estão adaptadas às necessidades reais da empresa, sendo muito generalistas. Ademais, a partir de uma pesquisa de mercado, descobrimos que, por diversas vezes, esses softwares foram rotulados como não intuitivos para novos funcionários, fazendo com que, a cada nova contratação, seja necessário um longo tempo de adaptação ao nosso sistema de gestão. 

## Autores

[Pedro Militão Mello Reis](https://github.com/MilitaoPedro)

[Henrique César Silva Soares](https://github.com/henriqueecss)

[Clarisse Lacerda Pimentel](https://github.com/Clarisse-Pimentel)

## Ferramentas

 - Node.js (v20.17.0)
 - NextJs (v15.1.6)
 - React Framework (v19.0)
 - Express (v4.21.2)
 - Prisma (v6.3.0)
 - Postgres (v8.14)

## Documentação e Requisitos


* Padrões Adotados: Diretório contendo regras de verificação e análise de requisitos.
* Requisitos: Inclui diagramas, documento de requisitos, e outros artefatos necessários para o desenvolvimento do projeto.
* DiagramaDeSequência: Contém diagramas de sequência em formato JPEG.
* DiagramaDeClasses: Contém diagramas de classes.
* DiagramaDeImplantação: Contém diagramas de implantação.
* DiagramaDePacotes: Contém diagramas pacotes.
* Documentação de Requisitos: Inclui documentos de requisitos em formato PDF.


## Regras de Clean Code


* Funções Pequenas e Coesas: Cada função deve realizar apenas uma tarefa específica.
* Nomes Claros e Descritivos: Utilizar nomes que reflitam claramente o propósito de variáveis, funções e classes.
* Evitar Comentários Desnecessários: O código deve ser autoexplicativo; comentários devem ser usados apenas quando realmente necessários para clarificação.
* Retorno Direto de Funções: Evitar o uso de variáveis temporárias desnecessárias ao retornar valores.
* Uso de Objetos para Agrupar Parâmetros: Facilita a leitura e manutenção de funções com múltiplos parâmetros relacionados.
* Evitar Código Duplicado: Reutilizar código através de funções e componentes reutilizáveis para manter a consistência e facilitar manutenção.


## Mensagens de Commit

#### Mensagens curtas e autoexplicativas.

Utilizar um prefixo que indica o tipo de mudança: 
- create: Adição de novas funcionalidades e/ou linhas de código.
- fix: Correção de bug.
- docs: Mudanças na documentação.
- style: Mudanças que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula faltando, etc).

## Iniciando o desenvolvimento

Para conseguir rodar na sua máquina, siga o passo a passo a seguir.

### Pré-requisitos

- Node.js

```sh
https://nodejs.org/en/download/
```
      
## Instalação

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- **Node.js** (versão mínima recomendada: 14.x)
- **npm** ou **yarn** como gerenciador de pacotes
- **PostgreSQL** ou outro banco de dados compatível, se necessário

### Clone o repositório

1. Clone o repositório em sua máquina local usando o seguinte comando:

```sh
git clone https://github.com/MilitaoPedro/PHC_Vision
````

## Front-End

2. Navegue para a pasta do front-end
   
```sh
cd phc_vision
````
3. Instale as dependências:
   
```sh
npm install
````
4. Inicie o servidor de desenvolvimento
   
```sh
npm run dev
````

## Back-End

5. Navegue para a pasta do back-end:
   
```sh
cd PHC_Vision/back-end
````

6. Instale as dependências:
   
```sh
npm install
````

7. Configure o banco de dado
   
```sh
npx prisma migrate dev
````

8. Inicie o servidor

```sh
npm start
````
