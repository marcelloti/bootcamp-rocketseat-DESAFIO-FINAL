# Portuguse Instructions

# React Native App
Aplicativo React Native

# Instruções
### Para executar este projeto, você precisará do nodejs, yarn, android studio e react-native pré-instalado em sua máquina.

## 1- Clone o repositório
git clone https://github.com/marcelloti/bootcamp-rocketseat-docker.git

## 2- Instale os pacotes
cd bootcamp-rocketseat-docker/developer/code/Bootcamp/gympoint && yarn install

## 3- Instale e rode o aplicativo em seu Android/iOS
yarn android (ou yarn ios)

Depois da primeira instalação, você poderá rodar o projeto como comando:
yarn start

## Dicas

# Abrindo o menu de debug
adb shell input keyevent 82 - Se seu dispositivo não abre o menu de opções do aplicativo, rode este comando via terminal

# Listando devices e criando proxy
adb devices - Lista os dispositivos conectados via usb
adb -s MY_DEVICE reverse tcp:8081 tcp:8081 - Cria um caminho para debugar via Wifi

# Exportando o SDK do Android
Após baixar o SDK do android, é necessário exportar variáveis para que seu ambiente reconheça o SDK.
Para isso ocorrer é necessário inserir algumas linhas em ~/.bash_profile, ~/.profile, ~/.zshrc ou ~/.bashrc

No exemplo abaixo o SDK foi colocado em /opt/android-sdk-linux:
export ANDROID_HOME=/opt/android-sdk-linux
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

Depois disso, reinicie seu computador ou recarrega as variáveis de ambiente.

##########################
# English instructions

# React Native App
React Native App

# Instructions
### To run this project, you will need the nodejs, yarn, android studio and react-native preinstalled on your machine.

## 1- Clone the repository
git clone https://github.com/marcelloti/bootcamp-rocketseat-docker.git

## 2- Install the packages
cd bootcamp-rocketseat-docker/developer/code/Bootcamp/gympoint && yarn install

## 3- Install and run the app in your Android/iOS
yarn android (or yarn ios)

After the first install, you will be able to run the app with:
yarn start

## Tips

# Opening the debug menu
adb shell input keyevent 82 - If your device cannot open the debug menu with shaking, you can run this in your terminal

# Listing devices and making a proxy
adb devices - List ao devices connect on usb port
adb -s MY_DEVICE reverse tcp:8081 tcp:8081 - Creates a path to debug with Wifi

# Exporting the Android SDK
After downloading the Android SDK, you must export the variables to be able to use the SDK.
To do this, you must insert a few lines in ~/.bash_profile, ~/.profile, ~/.zshrc or ~/.bashrc

In the example below, the SDK is in /opt/android-sdk-linux directory:
export ANDROID_HOME=/opt/android-sdk-linux
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

After that, you must reboot or reload your enviroments variables.
