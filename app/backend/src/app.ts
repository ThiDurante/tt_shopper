import express from 'express';
import cors from 'cors';
import sequelizeCon from './database/connection';
import productsRouter from './router/productsRouter';
import packsRouter from './router/packsRouter';
import updatePriceRouter from './router/updatePriceRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    // set middlewares and routers
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
      })
    );
    this.app.use(productsRouter);
    this.app.use(packsRouter);
    this.app.use(updatePriceRouter);
  }

  public start(PORT: number): void {
    this.app.listen(PORT, async () => {
      //check if database connection is successful
      try {
        await sequelizeCon.authenticate();
        console.log('Conexão com o DB feita com sucesso!');
      } catch (error) {
        console.error('Não foi possível conectar com o DB: ', error);
      }
      console.log(`Servidor aberto na porta: ${PORT}`);
    });
  }
}

export { App };
