# TFE-Tarefa4

Projeto desenvolvido em React, TypeScript, Vite e Bootstrap 5 para a **Tarefa 4** da disciplina **Tecnologias Front-End**, evoluindo o Sistema de Monitorias da Tarefa 3 com um **formulário de inscrição em monitoria** e comunicação entre componentes.

## Funcionalidades

- Formulário controlado (`useState`) para inscrição de alunos em editais abertos
- `onSubmit` para capturar o envio dos dados da candidatura
- Comunicação via **callback por props**: o formulário envia a candidatura para o componente pai (`App`)
- Interface TypeScript (`Candidatura`) separando os dados da inscrição das props do componente
- `useEffect` para ações reativas:
  - pré-seleção automática do primeiro edital aberto ao carregar a lista
  - atualização do título da aba conforme o nome do aluno é digitado
  - exibição temporária da mensagem de sucesso após o envio (com limpeza do timer)
- Estilização com Bootstrap 5 (`card`, `form-control`, `row`/`col`, `alert`, etc.)
- Organização do código em pastas (`components/`, `types/`)

## Estrutura de Arquivos

```
src/
├── types/
│   ├── Edital.ts                  # Interface de dados do Edital
│   └── Candidatura.ts             # Interface de dados da Candidatura
├── data/
│   └── editais.ts                 # Lista inicial de editais
├── components/
│   ├── EditalCard.tsx             # Card individual de edital
│   ├── BuscaEdital.tsx            # Campo de busca
│   ├── NovoEditalForm.tsx         # Formulário de cadastro de edital
│   └── InscricaoMonitoriaForm.tsx # Formulário de inscrição em monitoria (Tarefa 4)
└── App.tsx                        # Gerenciamento de estado central
```

## Como Executar

```
npm install
npm run dev
```

## Vídeo explicativo no YouTube (não listado):

<link do vídeo aqui>

## Autor

- **Nome**: Tadeu dos Santos Jerônimo
- **Matrícula**: 2026202194
- **E-mail**: tadeus.jeronimo@gmail.com
- **Disciplina**: Tecnologias Front-End - IF Sudeste/MG
