# Arquitetura

![Diagrama da arquietura](https://github.com/jhonatan98rios/naive-bayes-classifier-infra/blob/main/diagram.png?raw=true)

## [Nodejs](https://github.com/jhonatan98rios/naive-bayes-classifier-runner-ts)
- Recebe a requisição com sample e id
- Lê o classifier do mongodb baseado no id
- Consome o modelo do S3 baseado no path presente no documento
- Recupera o algoritmo do arquivo
- Realiza a classificação
- Responde com a classificação
