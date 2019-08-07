if [ "$ENV" = "development" ]
then
  npm run docker
else
  npm start
fi