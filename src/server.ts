import app from './app';

const PORT = process.env.PORT;

const main = () => {
  try {
    if (!PORT) {
      throw new Error('No Port Specified. Please include a PORT for the app to run on');
    }
    
    console.log(process.env.DATABASE_URL)

    app.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();

