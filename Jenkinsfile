pipeline {
    agent any 
    tools {
        nodejs 'nodejs'
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
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'cd backend && npm install'
                sh 'cd frontend && npm install'
                sh 'cd testing && npm install'
            }
        }
        stage('Xvfb-Test') {
            steps {
                script {
                    wrap([$class: 'Xvfb']) {
                        stage('Test') {
                                echo 'Testing...'
                                sh 'cd testing && npx cypress run'
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
    
    post {
        always {
            slackSend message: "Pipeline ejecutado:- ${currentBuild.currentResult} ${env.JOB_NAME} ${env.BUILD_NUMBER} ${BUILD_URL}"
        }
    }}
