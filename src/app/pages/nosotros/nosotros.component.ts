import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NosotrosService } from './services/nosotros.service';
import { Nosotros } from './interfaces/nosotros.interface';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
})
export class NosotrosComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private NosotrosService = inject(NosotrosService);
  NosotrosData: Nosotros | undefined = undefined;

  frase: string = '';
  onEditFrase = false;
  onEditPresentacion = false;
  presentacion: string = '';
  imageFile: File | undefined = undefined;
  locaImgUrl: SafeUrl | string | undefined = undefined;
  loadingSection = '';

  ngOnInit(): void {
    this.NosotrosService.getNosotrosData().subscribe({
      next: (res) => {
        this.NosotrosData = res;
        this.frase = res.frase;
        this.presentacion = res.presentacion;
        this.locaImgUrl = res.imageUrl.secure_url;
      },
    });
  }

  loadImg(event: any) {
    this.imageFile = event.target.files[0];
    const blobURL = window.URL.createObjectURL(this.imageFile!);
    this.locaImgUrl = this.sanitizer.bypassSecurityTrustUrl(blobURL);
  }

  saveSection(section: string) {
    section === 'frase'
      ? (this.loadingSection = 'frase')
      : (this.loadingSection = 'presentacion');

    const value = section === 'frase' ? this.frase : this.presentacion;

    this.NosotrosService.editProperty(
      this.NosotrosData?._id!,
      section,
      value
    ).subscribe({
      next: (res) => {
        section === 'frase'
          ? (this.onEditFrase = false)
          : (this.onEditPresentacion = false);
        this.loadingSection = '';
        console.log(res);
      },
    });
  }

  saveImg() {
    if (!this.imageFile) {
      console.log('no hay imagen para guardar');
      return;
    }
    this.loadingSection = 'Image';
    this.NosotrosService.updateImg(
      this.imageFile,
      this.NosotrosData?._id!
    ).subscribe({
      next: (res) => {
        this.loadingSection = '';
        console.log(res);
      },
    });
  }
}
