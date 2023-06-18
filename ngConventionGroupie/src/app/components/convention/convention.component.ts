import { ConventionService } from './../../services/convention.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Category } from 'src/app/models/category';
import { Convention } from 'src/app/models/convention';

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css']
})
export class ConventionComponent implements OnInit {
  selected: Convention | null = null;
  newConvention: Convention = new Convention();
  editConvention: Convention | null = null;
  conventions: Convention[] = [];


  constructor(private conventionService: ConventionService, private route: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
    this.reload();
    // this.route.paramMap.subscribe({
    //   next: (params) => {
    //     let cateIdString = params.get('categoryId')
    //     if (cateIdString) {
    //       let categoryId = parseInt(cateIdString);
    //       if (!isNaN(categoryId)) {
    //         this.loadCategoryConventions(categoryId);
    //       }
    //     }
    //   }
    // })
  }

  reload() {
    this.conventionService.index().subscribe({
      next: (conventionList) => {
        this.conventions = conventionList;
      },
      error: (error) => {
        console.error('Error' + error);
      }
    })

  }

  displayConvention(convention: Convention) {
    this.selected = convention;
  }

  // loadCategoryConventions(categoryId: number) {
  //   this.conventionService.indexForCategory(categoryId).subscribe({
  //     next: (conventionListByCategory) => {
  //       this.conventions = conventionListByCategory;

  //     },
  //     error: (theError) => {
  //       console.error('Error' + theError);
  //     },
  //   });
  // }

  addConvention(newConvention: Convention) {
    this.conventionService.create(newConvention).subscribe({
      next: (convention) => {
        this.selected = convention;
        this.reload();
      },
      error: (error) => {
        console.error('Error' + error);
      },
    });
  }

  updateConvention(id: number, editConvention: Convention) {
    this.conventionService.update(id, editConvention).subscribe({
      next: (category) => {
        this.reload();
        this.editConvention = null;
        this.selected = null;
      },
      error: (error) => {
        console.error('Error' + error);
      },
    });
  }

  deleteConvention(id: number) {
    this.conventionService.destory(id).subscribe({
      next: () => {
        this.reload();
      },
      error: (error) => {
        console.error('Error' + error);
      }
    })

  }
}


