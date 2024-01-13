import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesFondoComponent } from './images-fondo.component';

describe('ImagesFondoComponent', () => {
  let component: ImagesFondoComponent;
  let fixture: ComponentFixture<ImagesFondoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ImagesFondoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesFondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
