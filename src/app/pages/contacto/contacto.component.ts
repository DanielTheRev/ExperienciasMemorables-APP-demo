import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from './services/contact.service';
import { ContactMessage } from './interfaces/conctactMesages.interface';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  private ContactService = inject(ContactService);
  Messages: { data: ContactMessage[]; isEmpty: boolean } = {
    data: [],
    isEmpty: true,
  };

  ngOnInit(): void {
    this.ContactService.getMessages().subscribe({
      next: (res) => {
        this.Messages = res;
      },
    });
  }

  setActive(_id: string) {
    const activeItem = document.querySelector('.active');
    activeItem?.classList.remove('active');
    const element = document.getElementById(_id);
    element?.classList.add('active');
  }
}
