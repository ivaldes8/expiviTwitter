import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailLikesComponent } from './post-detail-likes.component';

describe('PostDetailLikesComponent', () => {
  let component: PostDetailLikesComponent;
  let fixture: ComponentFixture<PostDetailLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailLikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
