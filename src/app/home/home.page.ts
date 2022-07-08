import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;
  constructor
  (
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private router: Router,
  ) {

    this.firebaseService.getInfoUser().subscribe(async data => {
      this.profile =  data;
    })
  }
  salir(){
    this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
    console.log('Listo');
  }
}
