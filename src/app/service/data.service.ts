import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../models/req-resp';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http:HttpClient) {
  }

  Url:string =`https://data.sfgov.org/resource/yitu-d5am.json`;

  getData(){
    return this.http.get<any>(this.Url);
   }

  getTitleAndLocation(){
    return this.http.get<any>(this.Url)
      .pipe(
       map((response:[]) => response.map(item => item['title'],['locations'])))
      }

   chosenMovie(SelectedMovie:string):Observable<any>{
    let params1 = new HttpParams().set('title',SelectedMovie);
    return this.http.get("https://data.sfgov.org/resource/yitu-d5am.json",{params:params1})
   }


  }
