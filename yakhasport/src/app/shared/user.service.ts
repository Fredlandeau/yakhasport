import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commentaires } from '../commentaires/commentaires.service';
import jwt_decode from 'jwt-decode';

const ApiUrl = environment.apiUrl;

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  pouvoir: string;
  createdat: Date;
  updatedat: Date;
  commentaires: Commentaires[];
}

export interface JWT {
  id?: string;
  iat?: number;
  exp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  isLogged(): any | undefined {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      return undefined;
    }
    const decoded: JWT = jwt_decode(token);
    const tokenIsNotExpired = decoded.exp > new Date().getTime() / 1000;
    if (!tokenIsNotExpired) {
      localStorage.removeItem('ACCESS_TOKEN');
    }
    return tokenIsNotExpired ? token : undefined;
  }

  getProlfile(): Observable<User> {
    const httpOtions = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<User>(`${ApiUrl}/auth/profile`, {
      headers: httpOtions.Headers,
    });
  }
}
