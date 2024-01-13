import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Service, ServiceDTO } from '../../interfaces/servicio.interface';
import { ServiciosState } from '../../states/servicios.state';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesGridComponent } from 'src/app/pages/shared/images-grid/images-grid.component';

@Component({
  selector: 'app-create-edit-servicio',
  standalone: true,
  imports: [CommonModule, ImagesGridComponent, FormsModule],
  templateUrl: './create-edit-servicio.component.html',
  styleUrls: ['./create-edit-servicio.component.scss'],
})
export class CreateEditServicioComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private serviceStore = inject(ServiciosState);
  private Router = inject(Router);
  private ActivatedRoute = inject(ActivatedRoute);
  @Input('service') service!: Service;

  loading = false;
  name: string = '';
  iconFile: File | null = null;
  localIconFile: { src: SafeUrl | string } | null = null;

  imgFiles: File[] = [];
  localImgFiles: { src: string | SafeUrl; id: string }[] = [];
  deletingImg = { state: false, id: '' };
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe({
      next: (params) => {
        this.serviceStore.getServiceChanges(params['id']).subscribe({
          next: (service) => {
            if (service) {
              this.service = service;
              this.name = service.name;
              this.localIconFile = { src: service.icon.secure_url };
              this.localImgFiles = service.images.map((e) => ({
                src: e.secure_url,
                id: e.asset_id,
              }));
            }
          },
        });
      },
    });
  }

  deleteImg(id: string) {
    this.deletingImg = { state: true, id };
    const isLocalImg = this.imgFiles.find((e) => e.name === id);
    if (isLocalImg) {
      console.log(`Es una imagen local [${id}]`);
      this.imgFiles = this.imgFiles.filter((e) => e.name !== id);
      this.localImgFiles = this.localImgFiles.filter((e) => e.id !== id);
      this.deletingImg = { state: false, id: '' };
      return;
    }

    this.serviceStore.removeImgFromService(this.service._id!, id).subscribe({
      next: (res) => {
        console.log(res.message);
        this.deletingImg = { state: false, id: '' };
      },
    });
  }

  loadImg(event: any) {
    if (event.target.name === 'icon') {
      this.iconFile = event.target.files[0];
      const blobURL = window.URL.createObjectURL(this.iconFile!);
      this.localIconFile = {
        src: this.sanitizer.bypassSecurityTrustUrl(blobURL),
      };
      return;
    }
    for (const f of event.target.files) {
      this.imgFiles.unshift(f);
      const blobURL = window.URL.createObjectURL(f);
      this.localImgFiles.unshift({
        src: this.sanitizer.bypassSecurityTrustUrl(blobURL),
        id: f.name,
      });
    }
    event.target.value = '';
  }

  saveService() {
    if (!this.service) {
      if (!this.name) {
        console.log('necesita un nombre');
        return;
      }
      if (!this.iconFile) {
        console.log('necesita un icono');
        return;
      }
      const serviceDTO: ServiceDTO = {
        name: this.name,
        icon: this.iconFile,
        images: this.imgFiles,
      };
      this.loading = true;
      this.serviceStore.addService(serviceDTO).subscribe({
        next: (res) => {
          if (res) {
            this.loading = false;
            this.Router.navigate(['servicios', 'servicio', this.name]);
            return;
          }
        },
      });
      return;
    }
    const serviceDTO: ServiceDTO = {
      _id: this.service._id,
      name: this.name,
      icon: this.iconFile!,
      images: this.imgFiles,
    };
    this.loading = true;

    this.serviceStore.updateService(serviceDTO).subscribe({
      next: (res) => {
        console.log(res);
        this.loading = false;
      },
    });
  }
}
