import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchStr = ''

  constructor(private postsService: PostService) { }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    })
  }

}
