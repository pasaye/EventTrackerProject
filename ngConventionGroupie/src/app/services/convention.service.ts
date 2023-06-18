import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Convention } from '../models/convention';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {

  url: string = environment.baseUrl + 'api/conventions'
  // url2: string = environment.baseUrl + 'api/categories'

  // url2: string = environment.baseUrl + 'api/categories/'

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  index(): Observable<Convention[]> {
    return this.http.get<Convention[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('index: ' + err)
        );
      })
    );
  }
  // indexForCategory(categoryId: number): Observable<Convention[]> {
  //   return this.http.get<Convention[]>(this.url2 + categoryId + '/conventions').pipe(
  //     catchError((err: any) => {
  //       console.log(err);
  //       return throwError(
  //         () => new Error('indexForCategory: ' + err)
  //       );
  //     })
  //   );
  // }
  show(id: number): Observable<Convention> {
    return this.http.get<Convention>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('show ' + err));
      })
    );
  }

  create(convention: Convention): Observable<Convention> {
    return this.http.post<Convention>(this.url, convention).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error(' error creating convention: ' + err)
        );
      })
    );
  }

  update(id: number, convention: Convention): Observable<Convention> {
    return this.http.put<Convention>(this.url + '/' + id, convention).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error('conventionService.update():' + err));
      })
    );
  }

  destory(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error('TodoService.delete():' + err));
      })
    );
  }
}

