import { Convention } from 'src/app/models/convention';
import { Component, OnInit } from '@angular/core';
import { Image } from './../../models/image';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  images: Image[] = [];
  selected: Image | null = null;
  newImage: Image = new Image();
  editImage: Image | null = null;


  constructor(private imageService: ImageService, private route: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        let convIdString = params.get('conventionId')
        if (convIdString) {
          let conventionId = parseInt(convIdString);
          if (!isNaN(conventionId)) {
            this.loadImagesForConventions(conventionId);

          }
        }
      }
    })
  }

  loadImagesForConventions(conventionId: number) {
    this.imageService.indexForConvention(conventionId).subscribe({
      next: (imageList) => {
        this.images = imageList;
      },
      error: (theError) => {
        console.log('Error' + theError);
      }
    })
  }

  addImage(newImage: Image) {
    const conventionId = this.getConventionIdFromParams();
    if (conventionId) {
      this.images.push(newImage);
      this.imageService.create(conventionId, newImage).subscribe({
        next: (image) => {
          this.selected = image;
        },
        error: (error) => {
          console.error('Error' + error);
        },
      });
    }
  }


  getConventionIdFromParams(): number | null {
    const convIdString = this.route.snapshot.paramMap.get('conventionId');
    if (convIdString) {
      const conventionId = parseInt(convIdString);
      if (!isNaN(conventionId)) {
        return conventionId;
      }
    }
    return null;
  }

  deleteImage(id: number) {
    this.imageService.destory(id).subscribe({
      next: () => {

      },
      error: (error) => {
        console.error('Error' + error);
      },
    });
  }
}
