import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  latitude: number;
  longitude: number;
  center: any;

  options: google.maps.MapOptions = {
    center: { lat: 44.48493, lng: 0.95125 },
    zoom: 18,
    clickableIcons: true,
  };

  markeroptions: google.maps.MarkerOptions = {
    position: { lat: 44.48493, lng: 0.95125 },
    title: 'Yakhasport',
    // label: { color: 'red', text: 'yakhasport' }
  };

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBK1pSARrL2T8_OJddZ1s-kNExeKxRZfRg',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
  ngOnInit(): void {}

  openInfoWindow(marker: MapMarker): void {
    // console.log(marker);
    this.infoWindow.open(marker);
  }
}
