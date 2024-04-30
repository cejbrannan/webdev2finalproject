import { Component } from '@angular/core';
import { Review } from '../review.model';
import { PostService } from '../post.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  reviews: Review[] = [];
  reviewsCopy: Review[] = []; // Create a copy of the posts array

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
    this.postService.reviewAdded.subscribe(() => {
      this.fetchPosts(); // Fetch posts again when a new post is added
    });
  }

  getStarIcons(rating: number): string[] {
    const filledStars = Array(Math.floor(rating)).fill('assets/filled-star.svg');
    const emptyStars = Array(5 - Math.ceil(rating)).fill('assets/empty-star.svg');
    return [...filledStars, ...emptyStars];
  }
  getDisplayedUsername(review: any): string {
    return review.isAnonymous ? 'Anonymous' : review.username;
  }
  fetchPosts(): void {
    this.postService.fetchReviews().subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
}
