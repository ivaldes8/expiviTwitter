import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailCommentsAddComponent } from './post-detail-comments-add.component';

describe('PostDetailCommentsAddComponent', () => {
  let component: PostDetailCommentsAddComponent;
  let fixture: ComponentFixture<PostDetailCommentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailCommentsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailCommentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
