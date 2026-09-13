# Module Interface

Define o contrato entre o Master-Flow e os módulos integrados.

Objetivo:
- manter automation-cloud isolado;
- manter master-ibo isolado;
- permitir comunicação sem alterar motores existentes.

Cada módulo deverá possuir:
- identificação;
- status;
- inicialização;
- encerramento;
- informações básicas.