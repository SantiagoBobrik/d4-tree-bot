import express from 'express';

const app = express();

app.all('/', (req, res) => {
  console.log('Bot is running!');
  res.send('Bot is running!');
});

export const keepAlive = (): void => {
  app.listen(3000, () => {
    console.log('Server is ready!');
  });
};
