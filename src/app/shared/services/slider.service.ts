import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, retry, shareReplay } from 'rxjs';
import { Slider } from '../../shared/models/slider.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private apiUrl = `${environment.api}/sliders`; // Ajusta según tu API
  private slidersCache$?: Observable<Slider[]>;

  constructor(private http: HttpClient) { }

  getSliders(): Observable<Slider[]> {
    if (!this.slidersCache$) {
      this.slidersCache$ = this.http.get<Slider[]>(this.apiUrl).pipe(
        retry(2), // Reintentar en caso de fallo
        shareReplay(1), // Cachear la respuesta
        catchError(() => {
          console.error('Error al cargar sliders');
          return of([]); // Devuelve array vacío en caso de error
        })
      );
    }
    return this.slidersCache$;
  }
}