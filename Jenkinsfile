pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        APP_NAME = "admin_tool"
        APP_DIR  = "/var/www/admin_tool"
    }

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
                npm install
                npx playwright install --with-deps
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                npx playwright test
                '''
            }
        }

        stage('Deploy with PM2') {
            steps {
                sh '''
                mkdir -p /var/www/admin_tool
                rsync -av --delete ./ /var/www/admin_tool/

                cd /var/www/admin_tool
                pm2 start ecosystem.config.js || pm2 restart admin_tool
                pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline completed successfully'
        }
        failure {
            echo '❌ CI/CD Pipeline failed'
        }
    }
}
