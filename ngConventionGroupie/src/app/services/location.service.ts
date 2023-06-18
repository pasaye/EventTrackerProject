import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Location } from 'src/app/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url: string = environment.baseUrl + 'api/conventions/'
  url2: string = environment.baseUrl + 'api/locations/'

  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  index(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todo: ' + err)
        );
      })
    );
  }

  indexForConvention(convId: number): Observable<Location[]> {
    return this.http.get<Location[]>(this.url + convId + '/locations').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('indexForConvention: ' + err)
        );
      })
    );
  }

  create(convId: number, location: Location): Observable<Location> {
    return this.http.post<Location>(this.url + convId + '/locations', location,).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('location: ' + err)
        );
      })
    );
  }

  update(id: number, location: Location): Observable<Location> {
    return this.http.put<Location>(this.url + '/' + id, location).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error('update' + err));
      })
    );
  }

  destory(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => new Error('delete' + err));
      })
    );
  }
}

