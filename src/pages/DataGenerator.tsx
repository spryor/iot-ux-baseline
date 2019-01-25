
export interface FakeData {
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  grade: number,
  status: string
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const names = [
  'Noah',
  'Liam',
  'Benjamin',
  'Oliver',
  'William',
  'James',
  'Elijah',
  'Lucas',
  'Mason',
  'Michael'
];

const status = [
  'Happy',
  'Sad',
  'Neutral',
  'Pissed'
];

export class DataGenerator {

  static idCounter: number = 0;

  generateData(): FakeData {
    return {
      id: DataGenerator.idCounter++,
      firstName: names[getRandomInt(names.length)],
      lastName: names[getRandomInt(names.length)],
      age: getRandomInt(70),
      grade: getRandomInt(10),
      status: status[getRandomInt(status.length)]
    };
  }

  generateDatas(amount: number): FakeData[] {
    const datas = [];
    for(let i = 0; i < amount; i++) {
      datas.push(this.generateData());
    }
    return datas;
  }

  generateDatasAsync(amount: number = 20, delayMs: number = 3000): Promise<FakeData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.generateDatas(amount));
      }, delayMs);
    });
  }

}
