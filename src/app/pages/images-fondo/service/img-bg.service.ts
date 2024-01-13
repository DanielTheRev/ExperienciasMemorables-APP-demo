import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImgBG } from '../interface/imgBackground.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImgBgService {
  private URI = `${environment.server_uri}/api/imgBackground`;
  private _http = inject(HttpClient);

  getImgBackground() {
    return this._http.get<{
      success: boolean;
      data: ImgBG[];
      isEmpty: boolean;
    }>(`${this.URI}/getImagesBackground`);
  }

  addImgs(imgs: File[]) {
    const formData = new FormData();
    for (const img of imgs) {
      formData.append('imgFile', img);
    }
    return this._http.post<{
      success: boolean;
      message: string;
      data: ImgBG[];
    }>(`${this.URI}/AddImagesBackground`, formData);
  }

  deleteImg(_id: string) {
    return this._http.delete<{ success: boolean; message: string }>(
      `${this.URI}/deleteImageBackgound/${_id}`
    );
  }
}
