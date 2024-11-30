pipeline {
    agent any 
    tools {
        nodejs 'nodejs'
    }
    environment {
        // Define variables de entorno si es necesario
        CHROME_BIN = '/usr/bin/google-chrome'
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
        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias del backend, frontend y testing...'
                sh '''
                    cd backend
                    npm install
                '''
                sh '''
                    cd frontend
                    npm install
                '''
                sh '''
                    cd testing
                    npm install
                '''
            }
        }
        stage('Initialize App') {
            steps {
                echo 'Inicializando backend y frontend'
                sh '''
                    cd backend
                    nohup npm run start &
                '''
                sh '''
                    cd frontend
                    nohup npm run start &
                '''
            }
        }
        stage('Check Selenium Setup') {
            steps {
                sh 'chromedriver --version'
                sh 'node -v'
            }
        }
        stage('Run Selenium Tests') {
            steps {
                echo 'Ejecutando pruebas de Selenium...'
                sh '''
                    node selenium/register.test.js
                    node selenium/login.test.js
                    node selenium/cart.test.js
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
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
