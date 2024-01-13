import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { faImages, faUser, faNewspaper, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  navs = [
    {
      link: 'Imagenes-fondo',
      activeClass: 'active',
      name: 'Fondo de imagenes',
      icon: faImages
    },
    {
      link: 'nosotros',
      activeClass: 'active',
      name: 'Nosotros',
      icon: faUser
    },
    {
      link: 'servicios',
      activeClass: 'active',
      name: 'Servicios',
      icon: faNewspaper
    },
    {
      link: 'contacto',
      activeClass: 'active',
      name: 'Consultas',
      icon: faIdCard
    },
  ]
}
