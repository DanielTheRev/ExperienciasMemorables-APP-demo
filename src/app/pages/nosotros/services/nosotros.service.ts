import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Nosotros } from '../interfaces/nosotros.interface';
import { ImgCL } from '../../images-fondo/interface/imgBackground.interface';

@Injectable({
  providedIn: 'root',
})
export class NosotrosService {
  private URI = `${environment.server_uri}/api/NosotrosPage`;
  private _http = inject(HttpClient);

  getNosotrosData() {
    return this._http.get<Nosotros>(`${this.URI}/getNosotrosData`);
  }

  editProperty(id: string, property: string, value: string) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this.URI}/editProperty`,
      { id, property, value }
    );
  }

  editFrase(frase: string, id: string) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this.URI}/editFrase`,
      { frase, id }
    );
  }

  editPresentacion(presentacion: string, id: string) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this.URI}/editPresentacion`,
      { presentacion, id }
    );
  }

  updateImg(imgFile: File, id: string) {
    const Formdata = new FormData();

    Formdata.append('id', id);
    Formdata.append('image', imgFile);
    return this._http.post<{
      success: boolean;
      message: string;
      imageRef: ImgCL;
    }>(`${this.URI}/editImage`, Formdata);
  }
}
