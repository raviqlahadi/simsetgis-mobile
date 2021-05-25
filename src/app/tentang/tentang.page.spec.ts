import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TentangPage } from './tentang.page';

describe('TentangPage', () => {
  let component: TentangPage;
  let fixture: ComponentFixture<TentangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TentangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TentangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
