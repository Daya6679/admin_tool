pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Daya6679/admin_tool.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                echo "Checking Node and npm versions"
                node -v
                npm -v

                echo "Installing dependencies"
                npm install

                echo "Installing Playwright dependencies"
                npx playwright install --with-deps
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                echo "Running Playwright tests"
                npx playwright test
                '''
            }
        }

        stage('Deploy with PM2') {
            steps {
                sh '''
                echo "Stopping old PM2 process if exists"
                pm2 delete admin_tool || true

                echo "Starting app using PM2 ecosystem"
                pm2 start ecosystem.config.js

                echo "Saving PM2 process list"
                pm2 save

                echo "Current PM2 status"
                pm2 list
                '''
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline SUCCESS'
        }
        failure {
            echo '❌ CI/CD Pipeline FAILED'
        }
    }
}
