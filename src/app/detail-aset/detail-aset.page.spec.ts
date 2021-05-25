import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAsetPage } from './detail-aset.page';

describe('DetailAsetPage', () => {
  let component: DetailAsetPage;
  let fixture: ComponentFixture<DetailAsetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAsetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAsetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
