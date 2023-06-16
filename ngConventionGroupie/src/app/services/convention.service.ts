import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Convention } from '../models/convention';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private baseUrl = 'http://localhost:8082/';
  private url = this.baseUrl + 'api/conventions';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  index(): Observable<Convention[]> {
    return this.http.get<Convention[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todo: ' + err)
        );
      })
    );
  }
  show(id: number): Observable<Convention> {
    return this.http.get<Convention>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('TodoService.show ' + err));
      })
    );
  }

  create(convention: Convention): Observable<Convention> {
    return this.http.post<Convention>(this.url, convention).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  update(id: number, convention: Convention): Observable<Convention> {
    return this.http.put<Convention>(this.url + '/' + id, convention).pipe(
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

