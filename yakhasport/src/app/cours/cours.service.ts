import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const ApiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  constructor(private readonly http: HttpClient) {}

  addFile(file: File): Observable<Response> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(`${ApiUrl}/upload/planning`, formData);
  }

  getPlanning(): Observable<Blob> {
    return this.http.get(`${ApiUrl}/planning`, { responseType: 'blob' });
  }
}
