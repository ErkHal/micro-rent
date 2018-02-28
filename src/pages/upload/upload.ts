import { Component, OnInit } from '@angular/core';
import { MediaService } from "../../services/media.service";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {File, FileEntry} from '@ionic-native/file';

/*
<input ion-button id="file" class="btn btn-default" (click)="takePhoto()"
        [(ngModel)]="uploadForm.file"
        type="file" name="file" #file="ngModel" required/>
<div [hidden]="file.valid || file.pristine"
              class="alert alert-danger">
              File is required !
</div>
*/


@Component({
  selector: 'page-upload',
  templateUrl: './upload.html'
})
export class UploadPage implements OnInit {

  formData = new FormData();   //Upload form data is stored in this variable

  canUpload = false;

  listingImageURI: string;

  constructor(private mediaService: MediaService,
              private camera: Camera,
              private file: File) { }

  ngOnInit() {

    //Template doesn't show upload form if the user isn't logged in
    if(localStorage.getItem('token')) {
      this.mediaService.getUserInfo(localStorage.getItem('token')).subscribe( result => {
        this.canUpload = true;
      }, err => {
        this.canUpload = false;
        console.log("Couldn't find legit token.");
      });
    }
  }

  takePhoto() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      //console.log(imageData);

      imageData = 'data:image/jpeg;base64,' + imageData;

        this.listingImageURI = imageData;

        const imgBlob = this.dataURItoBlob(imageData);

        console.log('inside takephoto');
        this.formData.append('file', imgBlob);
        console.log(this.formData.get('file'));

      }).catch(err => console.log(err));
  }

  dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

  onSubmit(uploadForm) {

    console.log(this.formData.get('file'));
    this.formData.append('title', uploadForm.title);
    this.formData.append('description', uploadForm.description);
    this.formData.append('price', uploadForm.price);

    uploadForm.reset();

    const encodedForm = this.encodeForm(this.formData);

    this.mediaService.upload(encodedForm).subscribe( result => {
      console.log('Media uploaded');
      }, (err) => {
        console.log('Something went wrong');
        console.log(err);
      });
    }

  //Encodes pricing into the description
  encodeForm(form) {

    console.log("inside encodingz");
    console.log(form.get('price'));

    const jsonPrice = {
      "price": form.get('price')
    };

    const descr = JSON.stringify(jsonPrice) + form.get('description');

    form.delete('price');
    form.set('description', descr);

    return form;
  }

}
