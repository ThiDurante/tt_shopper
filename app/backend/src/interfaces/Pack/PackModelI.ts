import PackI from './PackI';

export default interface PackModelI {
  getAllPacks(): Promise<PackI[]>;
  findByPackId(id: number): Promise<PackI>;
}
