# Master-Flow

Aplicativo central de automação unificando módulos existentes.

## Objetivo

O Master-Flow será a camada principal para gerenciamento dos projetos:

- automation-cloud
- master-ibo

## Regra principal

Os motores e automações existentes não serão alterados nesta primeira fase.

A integração será feita através de módulos independentes para evitar quebra de funcionamento.

## Estrutura

```
Master-Flow
├── app/
├── core/
├── modules/
│   ├── automation-cloud/
│   └── master-ibo/
├── launcher/
├── dashboard/
└── config/
```

## Fases

1. Criar núcleo do aplicativo.
2. Integrar módulos existentes.
3. Criar painel único.
4. Criar gerenciamento e atualizações.
