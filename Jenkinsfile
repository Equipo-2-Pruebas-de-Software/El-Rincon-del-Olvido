pipeline {
    agent any 
    tools {
        nodejs 'nodejs'
    }
    environment {
        CHROME_BIN = '/usr/bin/google-chrome'
        SELENIUM_CHROMEDRIVER_PATH = './selenium/chromedriver'
        PATH = "${env.PATH}:/usr/local/bin:./selenium"
    }

    stages {
        stage('Preparation') {
            steps {
                cleanWs()
                sh 'git config --global http.postBuffer 1572864000'
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://github.com/Equipo-2-Pruebas-de-Software/Moda-Virtual-Neon-Threads.git'
            }
        }
        stage('Initialize App') {
            steps {
                echo 'Inicializando backend y frontend...'
                sh '''#!/bin/bash
                    set -x
                    cd backend
                    npm install
                    nohup npm start &
                    cd ../frontend
                    npm install
                    nohup npm start &
                    sleep 10
                '''
            }
        }
        stage('Install Selenium Dependencies') {
            steps {
                echo 'Instalando dependencias de Selenium...'
                sh '''#!/bin/bash
                    set -x
                    cd selenium
                    npm install
                '''
            }
        }
        stage('Check Selenium Setup') {
            steps {
                sh '''#!/bin/bash
                    set -x
                    chmod +x selenium/chromedriver
                    export PATH=$PATH:$(pwd)/selenium
                    echo "PATH actualizado: $PATH"
                    chromedriver --version
                    node -v
                    google-chrome --version
                '''
            }
        }
        stage('Run Selenium Tests') {
            steps {
                echo 'Ejecutando pruebas de Selenium...'
                sh '''#!/bin/bash
                    set -x
                    cd selenium
                    node login.test.js || { echo "login.test.js falló"; exit 1; }
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Desplegando la aplicación...'
                // Pasos de despliegue si es necesario
            }
        }
    }
    
    post {
        always {
            slackSend message: "Pipeline ejecutado: ${currentBuild.currentResult} - ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${env.BUILD_URL}"
        }
    }
}
