import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; 

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa: ElementRef;

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit(){
    const latLng = this.coords.split(',');
    // console.log({ latLng });
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    (mapboxgl as typeof mapboxgl).accessToken =
      'pk.eyJ1IjoiYnJva2VuMTQ1MSIsImEiOiJja2RtYXU1N3QwMDh2MnhveXByOWNrY3p5In0.7oJDNkU0mBNMhQOe0kq7Og';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15,
    });
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }

  ionViewWillEnter() {
  }
}
