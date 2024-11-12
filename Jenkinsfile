pipeline {
    agent any 
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Preparation') {
            steps {
                cleanWs()
                sh 'git config --global http.postBuffer 1048576000'
            }
        }
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'develop']], userRemoteConfigs: [[url: 'https://github.com/Equipo-2-Pruebas-de-Software/Moda-Virtual-Neon-Threads.git']]])
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'cd backend && npm install'
                sh 'cd ../frontend && npm install'
                sh 'cd ../testing && npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'cd testing && npx cypress run'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }}
