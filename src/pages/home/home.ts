import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PostingPage } from '../posting/posting';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private camera: Camera,
    private modalCtrl: ModalController) {

  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 400,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this
      .camera
      .getPicture(options)
      .then((imageData) => {
         let base64String = 'data:image/jpeg;base64,' + imageData;
         let modalPosting = this.modalCtrl.create(PostingPage,{picture: base64String});
         modalPosting.present()
      }, (err) => {
        console.log(err);
      });
  }

}
