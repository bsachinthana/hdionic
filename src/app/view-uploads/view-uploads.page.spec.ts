import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUploadsPage } from './view-uploads.page';

describe('ViewUploadsPage', () => {
  let component: ViewUploadsPage;
  let fixture: ComponentFixture<ViewUploadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUploadsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUploadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
