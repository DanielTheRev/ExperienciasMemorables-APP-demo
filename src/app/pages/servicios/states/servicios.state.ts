import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, from, map, of } from 'rxjs';
import {
  Service,
  ServiceDTO,
  ServiceData,
} from '../interfaces/servicio.interface';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root',
})
export class ServiciosState {
  private readonly _servicesSource = new BehaviorSubject<ServiceData>({
    isEmpty: false,
    data: [],
  });

  readonly services$ = this._servicesSource.asObservable();
  private ServiciosService = inject(ServiciosService);
  constructor() {
    //* trayendo todos los servios
    this.ServiciosService.getServices().subscribe({
      next: (res) => this.setServices(res),
    });
  }

  private getServiceValue() {
    return this._servicesSource.getValue();
  }

  private setServices(services: ServiceData) {
    this._servicesSource.next(services);
    return;
  }

  getServiceChanges(_id: string) {
    return this.services$.pipe(
      map((ser) => {
        return ser.data.find((e) => e._id === _id);
      })
    );
  }

  addService(service: ServiceDTO) {
    return this.ServiciosService.addService(service).pipe(
      map((res) => {
        if (res.success) {
          const services = [res.data, ...this.getServiceValue().data];
          const data: ServiceData = {
            isEmpty: services.length <= 0,
            data: services,
          };
          this.setServices(data);
        }
        return res.success;
      })
    );
  }

  updateService(service: ServiceDTO) {
    return this.ServiciosService.updateService(service).pipe(
      map((service) => {
        if (service.success) {
          const services = this.getServiceValue().data.map((s) => {
            if (s._id === service.data._id) {
              s = service.data;
            }
            return s;
          });

          this.setServices({ data: services, isEmpty: services.length <= 0 });
        }

        return { success: service.success, message: service.message };
      })
    );
  }

  removeImgFromService(serviceID: string, imgID: string) {
    return this.ServiciosService.deleteImgFromService(serviceID, imgID).pipe(
      map((e) => {
        if (e.success) {
          const services = this.getServiceValue().data.map((service) => {
            if (service._id === serviceID) {
              service.images = service.images.filter(
                (img) => img.asset_id !== imgID
              );
            }
            return service;
          });
          this.setServices({ data: services, isEmpty: services.length <= 0 });
        }
        return e;
      })
    );
  }

  removeService(_id: string) {
    this.ServiciosService.deleteService(_id).subscribe({
      next: (res) => {
        if (res.success) {
          const services = this.getServiceValue().data.filter(
            (e) => e._id !== _id
          );
          const data: ServiceData = {
            isEmpty: services.length <= 0,
            data: services,
          };
          this.setServices(data);
        }
      },
    });
  }
}
