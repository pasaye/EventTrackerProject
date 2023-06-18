import { Category } from "./category";
import { Image } from '../models/image';
import { Location } from 'src/app/models/location'

export class Convention {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  locations: Location[];
  category: Category | null;
  images: Image[];

  constructor(id = 0, name = '', description = '', date = '', time = '', locations = [], category = null, images = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.time = time;
    this.locations = locations;
    this.category = category;
    this.images = images;

  }
}
