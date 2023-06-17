import { Convention } from 'src/app/models/convention';
export class Image {
  id: number;
  name: string;
  imageUrl: string;
  convention: Convention | null;

  constructor(id = 0, name = '', imageUrl = '', convention = null) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.convention = convention;
  }
}
