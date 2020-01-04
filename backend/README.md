# Portuguse Instructions

# Gympoint
Aplicativo Gympoint

# Instruções
### Para executar este projeto, você precisará do nodejs e yarn pré-instalado em sua máquina.

## 1- Clone o repositório
git clone https://github.com/marcelloti/bootcamp-rocketseat-docker.git

## 2- Instale os pacotes
cd bootcamp-rocketseat-docker/developer/code/Bootcamp/gympoint && yarn install

## 3- Crie o banco de dados no postgres
Crie um banco de dados com o nome de gympoint no postgres

## 4- Configure as variáveis de ambiente
Crie uma cópia do arquivo .env-example para .env dentro do diretório do projeto
e edite as variáveis

## 5- Rode os comandos de migração e seed
yarn sequelize db:migrate
yarn sequelize db:seed:all

## 6- Acesse a homepage da aplicação
http://127.0.0.1:3333/

##########################
# English instructions

# Gympoint
Gympoint aapp

# Instructions
### To run this project, you will need the nodejs and yarn preinstalled on your machine (or use docker containers available with docker-compose.yml in this repository).

## 1- Clone the repository

## 2- Instale os pacotes
cd bootcamp-rocketseat-docker/developer/code/Bootcamp/gympoint && yarn install

## 3- Create the database on postgres
Create a database with the name gympoint in postgres

## 4- Configure the enviroment variables
Create an copy of .env-example file to .env (put it inside the project directory) and edit the file as you wich

## 5- Run the commands for migration and seed
yarn sequelize db:migrate
yarn sequelize db:seed:all

## 6- Visit the homepage of the app
http://127.0.0.1:3333/

