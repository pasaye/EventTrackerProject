import { Convention } from "./convention";

export class Location {
  id: number;
  state: string;
  city: string;
  address: string;
  convention: Convention | null;

  constructor(id = 0, state = '', city = '', address = '', convention = null) {
    this.id = id;
    this.state = state;
    this.city = city;
    this.address = address;
    this.convention = convention
  }
}
