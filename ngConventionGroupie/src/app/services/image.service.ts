import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Image } from '../models/image'
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url: string = environment.baseUrl + 'api/conventions/'
  url2: string = environment.baseUrl + 'api/images/'


  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  index(): Observable<Image[]> {
    return this.http.get<Image[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todo: ' + err)
        );
      })
    );
  }
  indexForConvention(convId: number): Observable<Image[]> {
    return this.http.get<Image[]>(this.url2 + convId + '/conventions').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('indexForConvention: ' + err)
        );
      })
    );
  }

  create(convId: number, image: Image): Observable<Image> {
    return this.http.post<Image>(this.url2 + convId + '/conventions', image).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('creating image: ' + err)
        );
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

