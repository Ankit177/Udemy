import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Url } from '../../classes/url';

const URL = new Url().getUrl();

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });
  constructor() {}

  ngOnInit() {}
  onFileSelected(event) {
    console.log(event);
  }
  Upload() {}
  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.addEventListener('error', event => {
        reject(event);
      });
      reader.readAsDataURL(file);
    });
    return fileValue;
  }
}
