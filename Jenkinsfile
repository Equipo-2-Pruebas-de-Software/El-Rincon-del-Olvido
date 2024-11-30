pipeline {
    agent any 
    tools {
        nodejs 'nodejs'
    }
    environment {
        CHROME_BIN = '/usr/bin/google-chrome'
        SELENIUM_CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
        PATH = "${env.PATH}:/usr/local/bin"
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
        stage('Diagnóstico') {
            steps {
                echo 'Ejecutando diagnóstico...'
                sh '''#!/bin/bash
                    set -x
                    echo "Versión de Node.js:"
                    node -v
                    echo "Variables de entorno:"
                    printenv
                    echo "Directorio actual:"
                    pwd
                    echo "Lista de archivos:"
                    ls -la
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias del backend, frontend y testing...'
                sh '''#!/bin/bash
                    set -x
                    cd backend
                    npm install
                    cd ../frontend
                    npm install
                    cd ../testing
                    npm install
                '''
            }
        }
        stage('Initialize App') {
            steps {
                echo 'Inicializando backend y frontend...'
                sh '''#!/bin/bash
                    set -x
                    cd backend
                    nohup npm run start &
                    cd ../frontend
                    nohup npm run start &
                '''
                // Espera unos segundos para asegurar que los servicios estén iniciados
                sh 'sleep 10'
            }
        }
        stage('Check Selenium Setup') {
            steps {
                sh '''#!/bin/bash
                    set -x
                    export PATH=$PATH:$(pwd)/selenium
                    echo "PATH actualizado: $PATH"
                    chromedriver --version
                    node -v
                    google-chrome --version
                '''
            }
        }
        stage('Print Environment Variables') {
            steps {
                sh '''#!/bin/bash
                    set -x
                    echo "CHROME_BIN: $CHROME_BIN"
                    echo "SELENIUM_CHROMEDRIVER_PATH: $SELENIUM_CHROMEDRIVER_PATH"
                    echo "PATH: $PATH"
                '''
            }
        }
        stage('Run Selenium Tests') {
            steps {
                echo 'Ejecutando pruebas de Selenium...'
                sh '''#!/bin/bash
                    set -x
                    export PATH=$PATH:$(pwd)/selenium
                    cd selenium
                    node register.test.js
                    node login.test.js
                    node cart.test.js
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Desplegando la aplicación...'
                // Aquí puedes agregar tus pasos de despliegue
            }
        }
    }
    
    post {
        always {
            slackSend message: "Pipeline ejecutado: ${currentBuild.currentResult} - ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${env.BUILD_URL}"
        }
    }
}
