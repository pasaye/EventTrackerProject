
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = environment.baseUrl + 'api/categories'

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  index(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todo: ' + err)
        );
      })
    );
  }
  show(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('TodoService.show ' + err));
      })
    );
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url, category).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  update(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(this.url + '/' + id, category).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error('TodoService.update():' + err));
      })
    );
  }

  // destory(id: number): Observable<void> {
  //   return this.http.delete<void>(this.url + '/' + id).pipe(
  //     catchError((err: any) => {
  //       console.error(err);
  //       return throwError(() => new Error('TodoService.delete():' + err));
  //     })
  //   );
  // }
}

