#!/bin/sh
if [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
  pip install --upgrade pip
  pip install awscli --upgrade --user;
  awscli --version;
  export PATH="$PATH:$HOME/.local/bin";
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin;
  docker build -t "$DOCKER_REPO:latest" .;
  docker push "$DOCKER_REPO:latest";
  aws ecs update-service --service online --force-new-deployment;
else
  echo "Pull Request skips deploy";
fi