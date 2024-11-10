pipeline {
    agent any 
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out...'
                checkout scmGit(branches: [[name: 'develop']])
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh ''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }post { 
        always { 
            echo 'I will always run whether job is success or not'
        }
        success{
            echo 'I will run only when job is success'
        }
        failure{
            echo 'I will run when failure'
        }
    }}
