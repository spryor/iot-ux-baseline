import { DataGenerator, FakeData } from './DataGenerator';

export class Database {
  private data: FakeData[];
  private generator: DataGenerator;

  constructor(size: number) {
    this.generator = new DataGenerator();
    this.data = this.generator.generateDatas(size);
  }

  request(start: number, pageSize: number, delayMs: number = 3000): Promise<FakeData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const slicedData = this.data.slice(start, start + pageSize);
        console.log(start, start + pageSize, slicedData, this.data);
        resolve(slicedData);
      }, delayMs);
    });
  }
}
