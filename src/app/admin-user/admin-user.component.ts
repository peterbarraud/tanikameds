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

  @ViewChild('cannotDeleteLastUser') cannotDeleteLastUser:ElementRef;

  ngOnInit() {
    this._changepassword = false;
    this.passwordsdontmatch = false;
    this.componentName = 'admin';
    this.getTracks();
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
    if (this._changepassword && this.selectedTrack.password !== this.confirmpassword){
      this.passwordsdontmatch = true;
    }
    else {
        this.selectedTrack.defaultroute = 'product';
        this.restService.saveObject(this.componentName,this.selectedTrack)
        .subscribe(retval =>{
            this.tracks = retval.objectcollection.items;
            this.selectedTrack = retval.saveobject;
            this._changepassword = false;
            this._isnewuser = false;
        });      
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
  
}