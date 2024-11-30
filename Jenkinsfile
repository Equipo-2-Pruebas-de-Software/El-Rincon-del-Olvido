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
        stage('Setup Selenium Environment') {
            steps {
                echo 'Instalando Google Chrome y chromedriver...'
                sh '''
                    # Actualizar el sistema
                    sudo apt-get update
                    # Instalar Google Chrome
                    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
                    sudo apt install -y ./google-chrome-stable_current_amd64.deb
                    # Instalar chromedriver
                    CHROME_VERSION=$(google-chrome --version | grep -oP '\\d+\\.\\d+\\.\\d+')
                    CHROMEDRIVER_VERSION=$(wget -qO- https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_VERSION})
                    wget https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip
                    unzip chromedriver_linux64.zip
                    sudo mv chromedriver /usr/local/bin/
                    sudo chmod +x /usr/local/bin/chromedriver
                    # Limpiar archivos descargados
                    rm google-chrome-stable_current_amd64.deb chromedriver_linux64.zip
                '''
            }
        }
        stage('Run Selenium Tests') {
            steps {
                echo 'Ejecutando pruebas de Selenium...'
                sh '''
                    export DISPLAY=:99
                    Xvfb :99 -ac &
                    node selenium/register.test.js
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
