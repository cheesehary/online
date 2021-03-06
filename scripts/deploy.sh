#!/bin/sh
if [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
  sudo pip install --upgrade pip
  pip --version
  pip install awscli --upgrade --user;
  aws --version;
  export PATH="$PATH:$HOME/.local/bin";
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin;
  openssl aes-256-cbc -K $encrypted_516640d2e185_key -iv $encrypted_516640d2e185_iv -in .env.enc -out .env -d;
  docker build -t "$DOCKER_REPO:latest" .;
  docker push "$DOCKER_REPO:latest";
  aws ecs update-service --service online --force-new-deployment;
else
  echo "Pull Request skips deploy";
fi