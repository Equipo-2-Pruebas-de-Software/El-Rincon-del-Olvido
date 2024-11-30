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
                    echo "Lista de archivos en el nivel raíz:"
                    ls -la
                '''
            }
        }
        stage('Install Selenium Dependencies') {
            steps {
                echo 'Instalando dependencias de Selenium...'
                sh '''#!/bin/bash
                    set -x
                    if [ -d selenium ]; then
                        cd selenium
                        npm install
                    else
                        echo "Directorio selenium no encontrado."
                        exit 1
                    fi
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
                    cd selenium
                    node login.test.js || { echo "login.test.js falló"; exit 1; }
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
