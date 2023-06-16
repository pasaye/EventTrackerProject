import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  selected: Category | null = null;
  newCategory: Category = new Category();
  editCategory: Category | null = null;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.categoryService.index().subscribe({
      next: (categoryList) => {
        this.categories = categoryList;
      },
      error: (theError) => {
        console.error('Error' + theError);
      },
    });
  }

  addTodo(newCategory: Category) {
    this.categoryService.create(newCategory).subscribe({
      next: (category) => {
        this.reload();
        this.selected = category;
      },
      error: (error) => {
        console.error('Error' + error);
      },
    });
  }


  updateTodo(id: number, category: Category) {
    this.categoryService.update(id, category).subscribe({
      next: (category) => {

        this.reload();
        this.editCategory = null;
      },
      error: (error) => {
        console.error('Error' + error);
      },
    });
  }
}
