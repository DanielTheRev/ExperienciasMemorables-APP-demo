import { ImgCL } from '../../images-fondo/interface/imgBackground.interface';

export interface ServiceData {
  isEmpty: boolean;
  data: Service[];
}

export interface Service {
  _id?: string;
  name: string;
  icon: ImgCL;
  images: ImgCL[];
}

export interface ServiceDTO {
  _id?: string;
  name: string;
  icon: File;
  images: File[];
}
