import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: any = []
  getPhoto: any
  userIcon = true
  userImage = false

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getProfileRequest().subscribe(response => {
      console.log(response);
      this.userData = response
    })
  }

  getFilePhoto(image: any) {    
    let reader = new FileReader;
    reader.readAsDataURL(image.target.files[0])
    reader.onload = () => {
      this.getPhoto = reader.result
      this.userIcon = false
      this.userImage = true
    }

  }

}
