import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KondisiAsetPage } from './kondisi-aset.page';

describe('KondisiAsetPage', () => {
  let component: KondisiAsetPage;
  let fixture: ComponentFixture<KondisiAsetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KondisiAsetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KondisiAsetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
