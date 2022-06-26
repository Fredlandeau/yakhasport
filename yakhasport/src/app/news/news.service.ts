import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const ApiUrl = environment.apiUrl;

export interface News {
  id?: number;
  date?: Date;
  content?: string;
  type?: string;
  order?: number;
  publie?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private readonly http: HttpClient) {}

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${ApiUrl}/news`);
  }

  getPublicNews(): Observable<News[]> {
    return this.http.get<News[]>(`${ApiUrl}/news/public`);
  }

  getAllImages(): Observable<Blob> {
    return this.http.get(`${ApiUrl}/news/images`, { responseType: 'blob' });
  }

  getAllImages2(): Observable<any> {
    console.log('images');
    return this.http.get(`${ApiUrl}/news/allimages`);
  }

  getOneImage(imagename): Observable<any> {
    return this.http.get(`${ApiUrl}/news/image/` + imagename);
  }

  addNews(content: News): Observable<News> {
    const httpOtions = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      }),
    };

    return this.http.post<News>(`${ApiUrl}/news`, content, {
      headers: httpOtions.Headers,
    });
  }

  updateNews(id: number, content: News): Observable<News> {
    const httpOtions = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      }),
    };

    return this.http.put<News>(`${ApiUrl}/news/${id}`, content, {
      headers: httpOtions.Headers,
    });
  }

  deleteNews(id: number): Observable<any> {
    const httpOtions = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      }),
    };

    return this.http.delete<News>(`${ApiUrl}/news/${id}`, {
      headers: httpOtions.Headers,
    });
  }

  addFile(file: File): Observable<Response> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(`${ApiUrl}/news/upload`, formData);
  }
}
