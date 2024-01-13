import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContactMessage } from '../interfaces/conctactMesages.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private URI = `${environment.server_uri}/api/ContactMessages`;
  private _http = inject(HttpClient);

  getMessages() {
    return this._http.get<{ data: ContactMessage[]; isEmpty: boolean }>(
      `${this.URI}/getMessages`
    );
  }
}
