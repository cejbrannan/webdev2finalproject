import { Component, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  isAnonymous: boolean = false;
  username: string = '';
  content: string = '';
  rating: number = 0;

  @Output() postCreated = new EventEmitter<void>(); // Change EventEmitter type to void

  constructor(private postService: PostService) {}

  getStarIconSrc(index: number): string {
    return index < this.rating ? 'assets/filled-star.svg' : 'assets/empty-star.svg';
  }
  onAddPost() {
    if (this.isAnonymous) {
      console.log('Anonymous user submitted');
    } else {
      console.log('Username:', this.username);
    }
    this.postService.saveContent(this.isAnonymous, this.username, this.content, this.rating).subscribe(() => {
      console.log('Content saved successfully');
      this.postCreated.emit();
      this.isAnonymous= false,
      this.username= '',
      this.content= '',
      this.rating= 0
    });
  }

  onStarClicked(index: number) {
    this.rating = index + 1;
  }
}
