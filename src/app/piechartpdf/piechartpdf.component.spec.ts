import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartpdfComponent } from './piechartpdf.component';

describe('PiechartpdfComponent', () => {
  let component: PiechartpdfComponent;
  let fixture: ComponentFixture<PiechartpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiechartpdfComponent]
    });
    fixture = TestBed.createComponent(PiechartpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
