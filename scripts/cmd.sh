if [ "$ENV" = "production" ]
then
  npm start
else
  npm run docker
fi