import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';
import { DataService } from '../service/data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Movies } from '../models/req-resp';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  films!:Movies[]
  mapa!:Mapboxgl.Map;
  titleMovie:string = "";

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  index: any;

  constructor(private _dataService:DataService, private fb:FormBuilder, ) {

  }


  ngOnInit() {
     this.getTitle();

    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
      map(value => this._filter(value || '')),
    );

  //build maps
  (Mapboxgl as any).accessToken = environment.mapKey;
   this.mapa = new Mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center:[-106.40179186858848,31.70510448913584], //Longitud,Latitud
  zoom: 10,
});
  }

  private _filter(value: string): string[] {
    const movieChosen = value.toLowerCase();
    this.titleMovie = movieChosen;
    return this.options.filter(option => option.toLowerCase().includes(movieChosen));
  }

  //Data complete
  getDataService(){
     this._dataService.getData().subscribe(
    (resp)=>{ this.films = resp;
    console.log('Data completa:',this.films)},
    (err)=> {console.log(err)})
 };

  //Data only with title.
  getTitle(){
    this._dataService.getTitleAndLocation().subscribe( resp => {
      this.options = resp;
      this.options = this.options.filter((item,index)=>{
        return this.options.indexOf(item) === index;
      })}
     );
  };

  //Tittle movie chose
  ChosenMovie(index:any):void{
    this._dataService.chosenMovie(index).subscribe(data => {this.films = data})
  }

}
