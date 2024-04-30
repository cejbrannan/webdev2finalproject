import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Review } from './review.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  reviewAdded = new EventEmitter<void>();

  private apiUrl = 'http://localhost:3000/api/reviews'; // URL of the backend API

  constructor(private http: HttpClient) {}

  saveContent(isAnonymous: boolean, username: string, content: string, rating: number): Observable<any> {
    // Send the title and content to the server
    //return this.http.post<any>(this.apiUrl, { title, content });
    return this.http.post<any>(this.apiUrl, { isAnonymous, username, content, rating }).pipe(
      tap(() => {
        this.reviewAdded.emit(); // Emit event after post creation
      })
    );
  }

  fetchReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error fetching reviews:', error);
        throw error; // Rethrow the error to be caught by the component
      })
    );
  }

}
