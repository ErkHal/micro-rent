import { Component, OnInit } from '@angular/core';
import { MediaService } from "../../services/media.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-upload',
  templateUrl: './upload.html'
})
export class UploadPage implements OnInit {

  listingOpt: boolean;

  formData = new FormData();   //Upload form data is stored in this variable
  canUpload = false;
  loading = false;
  listingImageURL: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaService: MediaService,
    private camera: Camera,
    private file: File) { }

  ngOnInit() {

    this.loading = false;

    //Template doesn't show upload form if the user isn't logged in
    if (localStorage.getItem('token')) {
      this.mediaService.getUserInfo(localStorage.getItem('token')).subscribe(result => {
        this.canUpload = true;
      }, err => {
        this.canUpload = false;
        //console.log("Couldn't find legit token.");
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

      this.listingImageURL = imageData;

      const imgBlob = this.dataURLtoBlob(imageData);

      //console.log('inside takephoto');
      this.formData.set('file', imgBlob);
      //console.log(this.formData.get('file'));

    }).catch(err => console.log(err));
  }

  //Removes photo taken by user
  removePhoto() {
    this.listingImageURL = "";
    this.formData.delete('file');
    //console.log(this.formData.get('file'));
  }

  dataURLtoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;

  }

  onSubmit(uploadForm) {

    this.loading = true;

    this.formData.append('title', uploadForm.title);
    this.formData.append('description', uploadForm.description);
    this.formData.append('price', uploadForm.price);

    uploadForm.reset();

    const encodedForm = this.encodeForm(this.formData);

    this.mediaService.upload(encodedForm).subscribe(result => {
      //console.log('Media uploaded');

      //adding microrent tag to image
      let photoID = result["file_id"];
      //console.log(photoID);
      let tag = {
        file_id: photoID,
        tag: 'microrent'
      };

      this.mediaService.tagPicture(tag)
        .subscribe(response => {
          //console.log(response);
        });

      this.navCtrl.setRoot(HomePage);
      //this.loading = false;

    }, (err) => {
      //console.log('Something went wrong');
      console.log(err);
    });
  }

  //Encodes pricing into the description
  encodeForm(form) {

    /*
    All data to be encoded. Add more entries if you need more data
    These entries will be appended to the JSON object in front of the
    description and separated with a pipe ( | ) symbol.
    */
    const jsonPrice = {
      "price": form.get('price')
    };

    const descr = JSON.stringify(jsonPrice) + '|' + form.get('description');

    form.delete('price');
    form.set('description', descr);

    return form;
  }

}
