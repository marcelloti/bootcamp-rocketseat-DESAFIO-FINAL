# bootcamp-rocketseat-DESAFIO-FINAL
Código do desafio final do bootcamp Rocketseat 2019

# Desafio Final

<h1 align="center">
<br>
<a name="top" href="https://github.com/marcelloti/bootcamp-rocketseat-DESAFIO-FINAL.git"><img src="./frontend/src/assets/logo.svg"></a>
<br>
<br>
</h1>

# Pré-requisitos
                
1. NodeJS (Foi utilizada a versão 10.13.0 neste projeto)
2. Nodemon instalado globalmente
3. Docker / Docker-compose
4. React instalado na máquina (create-react-app)
5. Ambiente react native configurado (<https://docs.rocketseat.dev/ambiente-react-native/introducao>)
6. Conta no mailtrap (<https://mailtrap.io/>)
7. Conta no sentry (https://sentry.io)
8. yarn ou npm 
9. Ambiente Linux (projeto desenvolvido no Debian)
10. Celular com Android (O projeto mobile foi desenvolvido APENAS para este sistema)
----
                
# Instruções
## 1. Clonar repositório

```
$ git clone https://github.com/marcelloti/bootcamp-rocketseat-DESAFIO-FINAL

```

## 2. Entrar no diretório do repositório clonado e criar os containers
```
$ cd bootcamp-rocketseat-DESAFIO-FINAL
$ docker-compose up -d

```

## 3. Baixar as dependências de cada projeto
```
$ cd backend
$ yarn
$ cd ../frontend
$ yarn
$ cd ../mobile
$ yarn
```

## 4. Criar aquivo **.env** baseado no arquivo **.env-example** na pasta backend e preenchê-lo de acordo
```
$ cd ../backend 
$ cp .env-example .env
$ vim .env
```

## 5. Executar as migrations e seeders do backend
```
$ cd ../backend
$ yarn sequelize db:migrate
$ yarn sequelize db:seed:all

```

## 6. Inicializar o backend
```
$ yarn dev

```

Em outro terminal (dentro do diretório backend do projeto) execute:
```
$ yarn queue

```

## 7. Inicializar o frontend
Em outro terminal (dentro do diretório frontend do projeto) execute:
```
$ yarn start

```

## 8. Acesse a área administrativa no navegador:
    URL: http://localhost:3000/
    Usuário: admin@gympoint.com
    Senha: 123456789

## 9. Modifique o IP do Reactotron
Caso queira usar o Reactotron nos testes, modifique o IP nos arquivos:

    /mobile/src/config/ReactotronConfig.js
    
    /frontend/src/config/ReactotronConfig.js
    
## 10. Modifique o IP do backend para o serviço do mobile e inicialize o serviço
Edite os seguintes arquivos, colocando o IP da máquina que está rodando a api do backend:

    /mobile/src/services/api.js (exemplo de preenchimento: http://192.168.0.1:3333)
    
    /frontend/src/services/api.js (neste arquivo também o possível deixar como está, mantendo http://localhost:3333)

Em seguida, no diretório mobile, execute:
    
```
$ yarn start

```

Em outro terminal (dentro do diretório mobile do projeto), como um celular Android conectado à porta USB,  execute o seguinte comando para instalar o app:
```
$ yarn android
```

# Observações

Em algumas rotas (tanto no web quanto no mobile) a listagem de registros
não é atualizada quando a rota/tela é acessada, mas apenas quando
algum evento ocorre (create/update/delete). Exemplo: Se um um novo pedido de
auxílio é respondido no app da web, o app mobile só irá exibir a resposta
na próxima vez que for aberto.
Isto foi feito para exemplificar o uso da arquetura Flux/Redux com os stores/states
e este mecanismo poderá ser melhorado em futuras versões.
