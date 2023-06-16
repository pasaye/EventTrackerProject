export class Convention {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;

  constructor(id = 0, name = '', description = '', date = '', time = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.time = time;
  }
}
