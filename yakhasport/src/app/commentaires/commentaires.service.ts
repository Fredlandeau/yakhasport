import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/user.service';

const ApiUrl = environment.apiUrl;

export interface Commentaires {
  id?: number;
  userid?: number;
  user?: User;
  date?: Date;
  coments?: string;
  type?: string;
  publie?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CommentairesService {
  constructor(private readonly http: HttpClient) {}

  getComments(): Observable<Commentaires[]> {
    return this.http.get<Commentaires[]>(`${ApiUrl}/commentaires/general`);
  }
}
