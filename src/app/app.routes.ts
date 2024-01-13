import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ImagesFondoComponent } from './pages/images-fondo/images-fondo.component';
import { CreateEditServicioComponent } from './pages/servicios/subpages/create-edit-servicio/create-edit-servicio.component';
import { AuthComponent } from './auth/auth.component';
import { RedirectUser } from './guards/RedirectUser.guard';

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    title: 'Iniciar sesion',
    canActivate: [RedirectUser],
  },
  {
    path: '',
    component: DashboardComponent,
    title: 'Experiencias Memorables App',
    canActivate: [RedirectUser],
    canActivateChild: [RedirectUser],
    children: [
      {
        path: 'Imagenes-fondo',
        component: ImagesFondoComponent,
        title: 'Editar imagenes de fondo',
      },
      {
        path: 'nosotros',
        component: NosotrosComponent,
        title: 'Editar Nosotros',
      },
      {
        path: 'servicios',
        component: ServiciosComponent,
        title: 'Editar Servicios',
        children: [
          {
            path: 'servicio/:name/:id',
            component: CreateEditServicioComponent,
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: '/servicios',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'crear-servicio',
        component: CreateEditServicioComponent,
        title: 'Crear nuevo servicio',
      },
      {
        path: 'contacto',
        component: ContactoComponent,
        title: 'Contacto',
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'Imagenes-fondo',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
