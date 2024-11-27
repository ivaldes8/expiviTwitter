import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsHeaderComponent } from './posts-header.component';

describe('PostsHeaderComponent', () => {
  let component: PostsHeaderComponent;
  let fixture: ComponentFixture<PostsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
