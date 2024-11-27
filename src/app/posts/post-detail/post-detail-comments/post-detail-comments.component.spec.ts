import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailCommentsComponent } from './post-detail-comments.component';

describe('PostDetailCommentsComponent', () => {
  let component: PostDetailCommentsComponent;
  let fixture: ComponentFixture<PostDetailCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
