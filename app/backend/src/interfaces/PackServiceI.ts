import PackI from './PackI';

export default interface PackServiceI {
  getAllPacks(): Promise<PackI[]>;
}
