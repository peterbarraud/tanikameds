import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent extends ComponentBase implements OnInit {
  // so we're not going to allow create vendor
  @ViewChild('cannotCreateVendor') cannotCreateVendorModal: ElementRef;
  @ViewChild('usernamefield') usernamefield:ElementRef;
  private invalidUserName:Boolean;
  private invalidUserNameMsg:string;
  private thisVeryUserName:string;
  private currentUserNameList:any;
  // Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
  // The constructor should only be used to initialize class members but shouldn't do actual "work".
  // http://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
  ngOnInit() {
    this.componentName = 'vendor';
    this.getTracks();
    this.getUserNames();

  }
  getUserNames() {
        this.restService.getUserNames()
        .subscribe(retval =>{
          this.currentUserNameList = retval;
        });
    
  }
  selectTrack(track) {
      // interestingly should this get the data for a selected track from the list of tracks or should it make another rest call?
      this.selectedTrack = track;
      this.thisVeryUserName = this.selectedTrack.username;
  }

  createTrack(){
      // this.createvendor = true;
      this.modalService.open(this.cannotCreateVendorModal);
      console.log("got here");
  }
  deleteTrack(object){
      this.restService.deleteObject(this.componentName, object.id)
      .subscribe(retval =>{
            this.tracks = retval.updatedcollection.items;
      });
  }
    isvalidusername(){
    if (this.selectedTrack.username !== this.thisVeryUserName){
      let instances = 0;
      this.currentUserNameList.forEach(username => {
        if (username == this.selectedTrack.username){
          instances += 1;
        }
      });
      if (instances === 1){
        this.invalidUserName = true;
        this.invalidUserNameMsg = "This user name is already in use. Please choose another.";
      } else if (this.selectedTrack.username.length < 5){
        this.invalidUserName = true;
        this.invalidUserNameMsg = "The user name must be at least 5 characters long.";
      } else {
        this.invalidUserName = false;
      }
    } else {
      this.invalidUserName = false;
    }

    }

  
  
  
}
