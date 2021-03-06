import { Component, Input, ViewChildren, ViewChild, QueryList, ElementRef, AfterViewInit, Inject } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { RestService } from './rest.service';
import { AppUserService } from './app-user.service';
import { AppDataService } from './app-data.service';

@Component({})
export class ComponentBase implements AfterViewInit {
    tracks:any;
    selectedTrack:any;
    componentName:string;
    cannotDeleteObjectName:string;
    protected tracksavestatus:string;
    protected stillLoading:Boolean;


    @ViewChild('cannotDelete') cannotDeleteModal: ElementRef;
    @ViewChildren('defaultFormElement') elements: QueryList<ElementRef>;
    @ViewChild('saveprogress') protected saveProgressModal:ElementRef;
    private _defaultFormElement:ElementRef;

    ngAfterViewInit() {
        this.elements.changes.subscribe((changes: QueryList<ElementRef>) => {
            this._defaultFormElement = changes.first;
            this.setDefaultFocus();
        });    
    }

    // set the access modifier for the restService member as protected so it can be accessed by it's children
    constructor(protected restService: RestService, protected modalService: NgbModal, protected appuserService:AppUserService, protected appdataService: AppDataService) {}

    getTracks(){
        let tracks = this.appdataService.getDataByModule(this.componentName);
        if (tracks === undefined){
            this.stillLoading = true;
            this.restService.getObjectCollection(this.componentName)
            .subscribe(retval =>{
                this.tracks = retval.items;
                this.appdataService.setDataByModule(this.componentName, retval.items);
                this.stillLoading = false;
            });
        } else {
            this.tracks = tracks;
        }
    }
    // refresh the list of ailments
    // dont call getTracks because we want to force the server hit
    refreshTracks() {
        this.restService.getObjectCollection(this.componentName)
        .subscribe(retval =>{
            this.tracks = retval.items;
            this.appdataService.setDataByModule(this.componentName, retval.items);
        });
    }
    selectTrack(track) {
        // interestingly should this get the data for a selected track from the list of tracks or should it make another rest call?
        this.selectedTrack = track;
        this.setDefaultFocus();
    }

    saveTrack() {
        this.tracksavestatus = "Saving";
        this.modalService.open(this.saveProgressModal);
        this.restService.saveObject(this.componentName,this.selectedTrack)
        .subscribe(retval =>{
            this.tracks = retval.objectcollection.items;
            this.appdataService.setDataByModule(this.componentName, this.tracks);
            this.selectedTrack = retval.saveobject;
            this.tracksavestatus = "Done";
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
