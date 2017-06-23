import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent extends ComponentBase implements OnInit {

  private _changepassword:Boolean;
  public confirmpassword:string;
  public passwordsdontmatch:Boolean;
  private _isnewuser:Boolean;
  private currentUserNameList:any;
  private invalidUserName:Boolean;
  private invalidUserNameMsg:string;
  private thisVeryUserName:string;

  @ViewChild('cannotDeleteLastUser') cannotDeleteLastUser:ElementRef;
  @ViewChild('usernamefield') usernamefield:ElementRef;
  

  ngOnInit() {
    this._changepassword = false;
    this.passwordsdontmatch = false;
    this.componentName = 'admin';
    this.getTracks();
    this.getUserNames();
  }
  getUserNames() {
        this.restService.getUserNames()
        .subscribe(retval =>{
          this.currentUserNameList = retval;
        });
    
  }
  get ChangePassword():Boolean{
    return this._changepassword;
  }
  get CancelChangePassword():Boolean{
    let retval:Boolean = false;
    if (this._isnewuser){
      retval = false;
    }
    else {
      if (this._changepassword){
        retval = true;
      }
    }
    return retval;
  }
  OnChangePassword(){
    this._changepassword = true;
  }
  OnCancelChangePassword() {
    this._changepassword = false;
  }
  selectTrack(track) {
      // interestingly should this get the data for a selected track from the list of tracks or should it make another rest call?
      this.selectedTrack = track;
      this._isnewuser = false;
      this._changepassword = false;
      this.thisVeryUserName = this.selectedTrack.username;
  }
  
  createTrack(){
      this.restService.newObect(this.componentName)
      .subscribe(retval =>{
          this.selectedTrack = retval;
          this._changepassword = true;
          this._isnewuser = true;
      });
  }
  
  saveTrack() {
    if (!this.invalidUserName){
      if (this._changepassword && this.selectedTrack.password !== this.confirmpassword){
        this.passwordsdontmatch = true;
      }
      else {
        this.tracksavestatus = "Saving";
        this.modalService.open(this.saveProgressModal);
        this.selectedTrack.userclassname = 'admin';
        this.selectedTrack.canaddproduct = 1;
        this.selectedTrack.candeleteproduct = 1;
        this.selectedTrack.canmanageuser = 1;
        this.restService.saveObject(this.componentName,this.selectedTrack)
        .subscribe(retval =>{
            this.tracks = retval.objectcollection.items;
            this.appdataService.setDataByModule(this.componentName, this.tracks);
            this.selectedTrack = retval.saveobject;
            this._changepassword = false;
            this._isnewuser = false;
            this.tracksavestatus = "Done";
        });      
      }
    }
    else {
      this.usernamefield.nativeElement.focus();
    }
  }
  
  deleteTrack(object){
    if (this.tracks.length === 1){
      this.cannotDeleteObjectName = object.name;
      this.modalService.open(this.cannotDeleteLastUser);
    } else {
      this.restService.deleteObject('admin', object.id)
      .subscribe(retval =>{
        this.tracks = retval.updatedcollection.items;
      });
    }
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