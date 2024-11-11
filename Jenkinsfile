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
