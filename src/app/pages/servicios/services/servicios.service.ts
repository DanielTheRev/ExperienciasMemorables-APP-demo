import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Service, ServiceDTO } from '../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private API_URL = `${environment.server_uri}/api/services`;
  private _http = inject(HttpClient);

  getServices() {
    return this._http.get<{ isEmpty: boolean; data: Service[] }>(
      `${this.API_URL}/getServices`
    );
  }

  addService(service: ServiceDTO) {
    const data = new FormData();
    data.append('name', service.name);
    data.append('icon', service.icon);
    if (service.images.length > 0) {
      service.images.forEach((e) => {
        data.append('images', e);
      });
    }
    return this._http.post<{ success: boolean; data: Service }>(
      `${this.API_URL}/addService`,
      data
    );
  }

  updateService(service: ServiceDTO) {
    const data = new FormData();
    data.append('name', service.name);
    data.append('icon', service.icon);
    data.append('_id', service._id!)
    if (service.images.length > 0) {
      service.images.forEach((e) => {
        data.append('images', e);
      });
    }
    return this._http.post<{
      success: boolean;
      message: string;
      data: Service;
    }>(`${this.API_URL}/updateService`, data);
  }

  deleteImgFromService(serviceID: string, imgID: string) {
    return this._http.delete<{ success: boolean; message: string }>(
      `${this.API_URL}/deleteImgFromService/${serviceID}/${imgID}`
    );
  }

  deleteService(_id: string) {
    return this._http.delete<{ success: boolean }>(
      `${this.API_URL}/deleteService/${_id}`
    );
  }
}
