import 'dotenv/config';
import { App } from './app';
import config from './env/config';

const app = new App()
app.start(Number(config.BACKEND_PORT))