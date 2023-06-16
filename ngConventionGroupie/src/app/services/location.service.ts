import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'http://localhost:8082/';
  private url = this.baseUrl + 'api/locations';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  index(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todo: ' + err)
        );
      })
    );
  }
  show(id: number): Observable<Location> {
    return this.http.get<Location>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('TodoService.show ' + err));
      })
    );
  }

  create(location: Location): Observable<Location> {
    return this.http.post<Location>(this.url, location).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  update(id: number, location: Location): Observable<Location> {
    return this.http.put<Location>(this.url + '/' + id, location).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error('TodoService.update():' + err));
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

