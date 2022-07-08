import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firestore.service';
import { Login, Register } from '../models/user.model';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  log: Login = {
    email: null,
    password: null
  }

  register: Register = {
    email: null,
    password: null,
    name: null,
    edad: null,
  }

  constructor
  (
    private authService: AuthService,
    private router: Router,
    private firebaseService: FirebaseService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }




  ngOnInit() {
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.login(this.log);
    console.log(this.log);
    await loading.dismiss();
    if (user) {
      this.router.navigateByUrl('/home',{replaceUrl: true} );
    }else{
      this.showAlert('Error', 'Something went wrong');
    }
  }

  async registerUser(){
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.register);
    await loading.dismiss();
    if(user){
      const path = 'users';
      this.register.password = '';
      await this.firebaseService.uploadUser(path ,this.register);
      this.router.navigateByUrl('/home',{replaceUrl: true} );
    }else{
      this.showAlert('Error', 'Something went wrong');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
