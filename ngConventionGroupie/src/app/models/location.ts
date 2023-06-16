export class Location {
  id: number;
  state: string;
  city: string;
  address: string;

  constructor(id = 0, state = '', city = '', address = '') {
    this.id = id;
    this.state = state;
    this.city = city;
    this.address = address;
  }
}
