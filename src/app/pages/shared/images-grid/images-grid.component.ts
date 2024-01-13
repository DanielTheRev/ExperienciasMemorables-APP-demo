import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImgBG } from '../../images-fondo/interface/imgBackground.interface';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-images-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.scss'],
})
export class ImagesGridComponent implements OnInit, OnChanges {
  images: { src: string; id: string }[] = [];
  @Input('loadImgs') loadImgs: any[] = [];
  @Input('deletingImg') deletingImg = { state: false, id: '' };
  @Input('showBorder') showBorder = false;
  @Output('deleteImageID') deleteImageID = new EventEmitter<{ id: string }>();
  ngOnInit(): void {
    this.images = this.loadImgs.map((e) => {
      return {
        src: e.src.secure_url || e.src,
        id: e.id || e._id,
      };
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loadImgs'] !== undefined) {
      this.images = changes['loadImgs'].currentValue.map((e: any) => {
        return {
          src: e.src.secure_url || e.src,
          id: e.id || e._id,
        };
      });
    }
  }
  deleteImage(id: string) {
    this.deleteImageID.emit({ id });
  }
}
