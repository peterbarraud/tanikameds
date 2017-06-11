import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit, AfterViewInit {
  private states_object;
  private states;
  private state_cities; //cities of a selected state
  private city_pincodes;  // pin codes of a selected city
  private citystatedatagot;
  private registerdone: Boolean;

  @ViewChild('shopnamefield') focusbox: ElementRef;
  @ViewChild('emailfield') emailfield: ElementRef;
  @ViewChild('mobilefield') mobilefield: ElementRef;
  @ViewChild('addressone') addressone: ElementRef;
  @ViewChild('addresstwo') addresstwo: ElementRef;
  @ViewChild('cityfield') cityfield: ElementRef;
  @ViewChild('pincodefield') pincodefield: ElementRef;
  @ViewChild('statefield') statefield: ElementRef;

  constructor(private restService: RestService) { }

  searchStates = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.states.filter(v => new RegExp(term, 'gi').test(v)).slice(0, 10));

  searchCities = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.state_cities.filter(v => new RegExp(term, 'gi').test(v)).slice(0, 10));

  searchPinCodes = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.city_pincodes.filter(v => new RegExp(term, 'gi').test(v)).slice(0, 10));



  ngOnInit() {
    this.registerdone = false;
    this.citystatedatagot = false;
    this.states_object = {};
    this.states = [];
    this.city_pincodes = [];
    this.restService.getObjectCollection("indiacitystate")
    .subscribe(retval =>{
      retval.items.forEach(item => {
        let cities = {};
        if (this.states_object[item.statename] == undefined){
          this.states_object[item.statename] = {}
        }
          else {
          cities = this.states_object[item.statename];
        }
        if (cities[item.cityname] === undefined){
          cities[item.cityname] = [];
        } else {
          cities[item.cityname].push(item.pincode)
        }
        this.states_object[item.statename] = cities;
      });
      for (var state in this.states_object){
        this.states.push(state);
      }
      this.citystatedatagot = true;
    });        
    
  }

  ngAfterViewInit() {
    this.focusbox.nativeElement.focus();
  }

  get_state_cities(statefield){
    let cities = this.states_object[statefield.value];
    this.state_cities = [];
    for (var city in cities){
      this.state_cities.push(city);

    }
  }
  get_city_pincodes(statefield, cityfield){
    let cities = this.states_object[statefield.value];
    // we are goign to allow users to enter cities and pin codes that aren't in our system
    if (cities !== undefined){
      this.city_pincodes = cities[cityfield.value];
    }
  }

  registeranotherchemist(){
    this.focusbox.nativeElement.value = null;
    this.emailfield.nativeElement.value = null;
    this.mobilefield.nativeElement.value = null;
    this.addressone.nativeElement.value = null;
    this.addresstwo.nativeElement.value = null;
    this.cityfield.nativeElement.value = null;
    this.pincodefield.nativeElement.value = null;
    this.statefield.nativeElement.value = null;
    this.focusbox.nativeElement.focus();
    this.registerdone = false;
  }

  registerChemist(){
      this.restService.newObect("vendor")
      .subscribe(vendor =>{
        vendor.name = this.focusbox.nativeElement.value;
        vendor.username = this.emailfield.nativeElement.value;
        vendor.mobilenumber = this.mobilefield.nativeElement.value;
        vendor.addressone = this.addressone.nativeElement.value;
        vendor.addresstwo = this.addresstwo.nativeElement.value;
        vendor.cityname = this.cityfield.nativeElement.value;
        vendor.pincode = this.pincodefield.nativeElement.value;
        vendor.statename = this.statefield.nativeElement.value;
        vendor.userclassname = 'vendor';
        this.restService.saveObject("vendor",vendor).subscribe(retval =>{
          this.registerdone = true;
        });
      });
  }
}
