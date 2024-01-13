import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditServicioComponent } from './create-edit-servicio.component';

describe('CreateEditServicioComponent', () => {
  let component: CreateEditServicioComponent;
  let fixture: ComponentFixture<CreateEditServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateEditServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
