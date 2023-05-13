import express from 'express';
import sequelizeCon from './database/connection';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    // set middlewares and routers
    this.app.use(express.json());
  }

  public start(PORT: number): void {
    this.app.listen(PORT, async () => {
      //check if database connection is successful
      try {
        await sequelizeCon.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      console.log(`Listening on port: ${PORT}`);
    });
  }
}

export { App };
