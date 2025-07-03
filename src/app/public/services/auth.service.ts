import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://tu-api.com/auth'; // Reemplaza con tu endpoint
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userDataSubject = new BehaviorSubject<any>(null);
  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthState();
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get userData$(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

  getUserData(): any {
    return this.userDataSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user));
          this.isAuthenticatedSubject.next(true);
          this.userDataSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.isAuthenticatedSubject.next(false);
    this.userDataSubject.next(null);
    this.router.navigate(['/login']);
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      this.isAuthenticatedSubject.next(true);
      this.userDataSubject.next(JSON.parse(userData));
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}