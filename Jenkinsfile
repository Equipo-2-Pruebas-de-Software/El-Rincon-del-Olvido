pipeline {
    agent any 
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'develop']], userRemoteConfigs: [[url: 'https://github.com/Equipo-2-Pruebas-de-Software/Moda-Virtual-Neon-Threads.git']]])
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'cd Testing'
                sh 'npx cypress run'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }}
