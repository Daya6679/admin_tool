pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '📥 Checking out source code'
                git branch: 'main',
                    url: 'https://github.com/Daya6679/admin_tool.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                echo "🔍 Checking Node and npm versions"
                node -v
                npm -v

                echo "📦 Installing dependencies (clean install)"
                npm ci

                echo "🎭 Installing Playwright browsers and OS deps"
                npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                echo "🧪 Running Playwright tests"
                npx playwright test
                '''
            }
        }

        stage('Deploy with PM2') {
            steps {
                sh '''
                echo "🚀 Deploying application using PM2"

                echo "🔁 Reloading or starting PM2 app"
                pm2 start ecosystem.config.js --update-env

                echo "💾 Saving PM2 process list"
                pm2 save

                echo "📊 Current PM2 status"
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
        always {
            echo '📌 Pipeline execution completed'
        }
    }
}
