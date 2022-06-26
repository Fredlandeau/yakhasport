import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsimagesComponent } from './newsimages.component';

describe('NewsimagesComponent', () => {
  let component: NewsimagesComponent;
  let fixture: ComponentFixture<NewsimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsimagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
