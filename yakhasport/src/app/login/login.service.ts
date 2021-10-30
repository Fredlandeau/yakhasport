import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const ApiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  login(username, mdp): Observable<any> {
    const httpOtions = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(
      `${ApiUrl}/auth/login`,
      {
        username,
        password: mdp,
      },
      { headers: httpOtions.Headers }
    );
  }

  createUser(username, mdp, nom, prenom, email): Observable<any> {
    const httpOtions = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(
      `${ApiUrl}/auth/creatuser`,
      {
        username,
        password: mdp,
        nom,
        prenom,
        email,
      },
      { headers: httpOtions.Headers }
    );
  }
}
