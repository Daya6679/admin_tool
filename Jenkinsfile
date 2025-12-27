pipeline {
  agent any

  stages {

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Deploy with PM2') {
      steps {
        sh '''
          cd $WORKSPACE
          pm2 restart admin-tool || pm2 start index.js --name admin-tool
          pm2 save
        '''
      }
    }
  }

  post {
    success {
      echo 'Deployment successful 🎉'
    }
    failure {
      echo 'Deployment failed ❌'
    }
  }
}
