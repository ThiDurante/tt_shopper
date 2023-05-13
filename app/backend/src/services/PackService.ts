import PackI from '../interfaces/PackI';
import PackModelI from '../interfaces/PackModelI';
import PackServiceI from '../interfaces/PackServiceI';

export default class PackService implements PackServiceI {
  constructor(private packModel: PackModelI) {
    this.packModel = packModel;
  }

  async getAllPacks(): Promise<PackI[]> {
    const packs = await this.packModel.getAllPacks();
    return packs;
  }
}
