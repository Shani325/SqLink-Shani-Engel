import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDocComponent } from './excel-doc.component';

describe('ExcelDocComponent', () => {
  let component: ExcelDocComponent;
  let fixture: ComponentFixture<ExcelDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
