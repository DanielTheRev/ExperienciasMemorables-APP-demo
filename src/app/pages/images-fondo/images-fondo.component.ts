import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImgBgService } from './service/img-bg.service';
import { ImgBG } from './interface/imgBackground.interface';
import { ImagesGridComponent } from '../shared/images-grid/images-grid.component';

@Component({
  selector: 'app-images-fondo',
  standalone: true,
  imports: [CommonModule, ImagesGridComponent, NgOptimizedImage],
  templateUrl: './images-fondo.component.html',
  styleUrls: ['./images-fondo.component.scss'],
})
export class ImagesFondoComponent implements OnInit {
  imgs: ImgBG[] = [];
  ImgBGService = inject(ImgBgService);
  files: File[] = [];
  canSubmit: number = 0;
  isLoading = '';
  deletingImg = { state: false, id: '' };
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.isLoading = 'load Images';
    this.ImgBGService.getImgBackground().subscribe({
      next: (res) => {
        if (res.success) {
          this.imgs = res.data;
          this.canSubmit = 8 - res.data.length;
          this.isLoading = '';
          return;
        }
      },
    });
  }

  inputImgHandler(event: any) {
    if (this.canSubmit <= 0) {
      alert('Ya estan las 8 imagenes completas');
      this.files = [];
      event.target.value = '';
      return;
    }
    if (this.files.length > this.canSubmit) {
      alert(`Solo puedes subir ${this.canSubmit} imagenes`);
      this.files = [];
      event.target.value = '';
      return;
    }
    for (const f of event.target.files) {
      this.files.unshift(f);
    }
    event.target.value = '';
  }

  deleteImg(imgID: string) {
    this.deletingImg = { state: true, id: imgID };
    this.ImgBGService.deleteImg(imgID).subscribe({
      next: (res) => {
        if (res.success) {
          this.imgs = this.imgs.filter((e) => e._id !== imgID);
          this.canSubmit = 8 - this.imgs.length;
          this.deletingImg = { state: false, id: '' };
          alert(res.message);
          return;
        }
        alert(res.message);
        return;
      },
    });
  }

  submitData() {
    if (this.canSubmit <= 0) {
      alert('Ya estan las 8 imagenes completas');
      this.files = [];
      return;
    }
    if (this.files.length > this.canSubmit) {
      alert(`Solo puedes subir ${this.canSubmit} imagenes`);
      this.files = [];
      return;
    }
    this.isLoading = 'submiting images';
    this.ImgBGService.addImgs(this.files).subscribe({
      next: (res) => {
        if (res.success) {
          this.imgs = [...this.imgs, ...res.data];
          this.canSubmit = 8 - this.imgs.length;
          this.files = [];
          this.isLoading = '';
          return;
        }
        alert(res.message);
      },
    });
  }
}
