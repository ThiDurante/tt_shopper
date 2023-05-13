import express from 'express';

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
      try {
        // await sequelizeCon.sync();
      } catch (error) {
        console.log(error);
      }
      console.log(`Listening on port: ${PORT}`);
    });
  }


}

export { App };