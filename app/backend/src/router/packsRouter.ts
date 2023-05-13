import { Router } from 'express';
import PackController from '../controllers/PackController';
import PackService from '../services/PackService';
import PackModel from '../models/PackModel';

const packsRouter = Router();

const packModel = new PackModel();
const packService = new PackService(packModel);
const packController = new PackController(packService);

packsRouter.get('/packs', packController.getAllPacks.bind(packController));

export default packsRouter;
