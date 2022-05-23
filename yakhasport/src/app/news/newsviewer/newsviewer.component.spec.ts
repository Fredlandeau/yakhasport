import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsviewerComponent } from './newsviewer.component';

describe('NewsviewerComponent', () => {
  let component: NewsviewerComponent;
  let fixture: ComponentFixture<NewsviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
