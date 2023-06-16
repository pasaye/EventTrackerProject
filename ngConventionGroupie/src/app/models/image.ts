export class Image {
  id: number;
  name: string;
  imageUrl: string;

  constructor(id = 0, name = '', imageUrl = '') {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }
}
