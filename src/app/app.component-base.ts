import { Component, Input, ViewChildren, ViewChild, QueryList, ElementRef, AfterViewInit, Inject } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { RestService } from './rest.service';

@Component({})
export class ComponentBase implements AfterViewInit {
    tracks:any;
    selectedTrack:any;
    componentName:string;
    cannotDeleteObjectName:string

    @ViewChild('cannotDelete') cannotDeleteModal: ElementRef;
    @ViewChildren('defaultFormElement') elements: QueryList<ElementRef>;
    private _defaultFormElement:ElementRef;

    ngAfterViewInit() {
        this.elements.changes.subscribe((changes: QueryList<ElementRef>) => {
            this._defaultFormElement = changes.first;
            this.setDefaultFocus();
        });    
    }

    // set the access modifier for the restService member as public so it can be accessed by it's children
    constructor(public restService: RestService, public modalService: NgbModal) {}

    getTracks(){
     this.restService.getObjectCollection(this.componentName)
      .subscribe(retval =>{
        this.tracks = retval.items;
      });        
    }
    // refresh the list of ailments
    refreshTracks() {
        this.getTracks();
    }
    selectTrack(track) {
        // interestingly should this get the data for a selected track from the list of tracks or should it make another rest call?
        this.selectedTrack = track;
        this.setDefaultFocus();
    }

    saveTrack() {
        this.restService.saveObject(this.componentName,this.selectedTrack)
        .subscribe(retval =>{
            this.tracks = retval.objectcollection.items;
            this.selectedTrack = retval.saveobject;
        });
    }
    
    createTrack(){
        this.restService.newObect(this.componentName)
        .subscribe(retval =>{
            this.selectedTrack = retval;
            this.setDefaultFocus();
        });
    }
    deleteTrack(object){
        this.restService.deleteObject(this.componentName, object.id)
        .subscribe(retval =>{
            // only update the tracks if the object was deleted
            if (retval.hasassociatedproducts){
                this.cannotDeleteObjectName = object.name;
                this.modalService.open(this.cannotDeleteModal);
            }
            else {
                this.tracks = retval.updatedcollection.items;
            }
        });
    }
    
    setDefaultFocus(){
        if (this._defaultFormElement){
            this._defaultFormElement.nativeElement.focus();
        }

    }
}
