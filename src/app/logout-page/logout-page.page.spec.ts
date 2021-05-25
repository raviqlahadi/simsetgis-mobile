import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPagePage } from './logout-page.page';

describe('LogoutPagePage', () => {
  let component: LogoutPagePage;
  let fixture: ComponentFixture<LogoutPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
