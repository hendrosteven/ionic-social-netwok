import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PostingPage } from '../posting/posting';
import { Posting } from '../../classes/posting';
import { PostingService } from '../../services/posting-service';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postings: Posting[] = [];

  constructor(public navCtrl: NavController, private camera: Camera,
    private modalCtrl: ModalController, private postingService: PostingService,
    private storage: Storage, private loadingCtrl: LoadingController,
    public dom: DomSanitizer) {

  }

  ionViewWillEnter(){
    this.loadPosting();
  }

  loadPosting(){
    let loading = this.loadingCtrl.create({content: 'Please wait'});
    loading.present();
    this.storage.get('token').then(val=>{
      this.postingService.findAllPost(val).subscribe(output => {
        this.postings = output;
        loading.dismiss();
      }, error =>{
        loading.dismiss();
        console.log(error);
      })
    });
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
         modalPosting.onDidDismiss(posting => {
           if(posting){
              this.postings.push(posting);
           }
         });
         modalPosting.present()
      }, (err) => {
        console.log(err);
      });
  }

}
