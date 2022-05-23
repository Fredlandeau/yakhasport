import { HttpClient } from '@angular/common/http';
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

  addNews(content: News): Observable<News> {
    return this.http.post<News>(`${ApiUrl}/news`, content);
  }

  updateNews(id: number, content: News): Observable<News> {
    return this.http.put<News>(`${ApiUrl}/news/${id}`, content);
  }

  deleteNews(id: number): Observable<any> {
    return this.http.delete<News>(`${ApiUrl}/news/${id}`);
  }
}
