import { Component ,OnInit} from '@angular/core';
import  Swal from 'sweetalert2/dist/sweetalert2.all.js';  
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'WeatherApp';
  inputData : FormGroup;
  submitted = false;
  public weatherData:any;
 

  constructor( private fb:FormBuilder,
               private httpCall:HttpClient,
               private APICall:ApiCallService,
               private spinner: NgxSpinnerService
            ){}
  
  ngOnInit()
  {
    this.inputData = this.fb.group({
      cityName :['',[Validators.required]]
      });
  }
  
  data()
  {
    this.submitted = true;
    if(this.inputData.invalid){
      return false;
    }

    this.spinner.show();
    this.APICall.weatherData(this.inputData.value['cityName']).subscribe(res=>{
      this.weatherData = res;
      this.spinner.hide();
    },(error)=>{
      this.spinner.hide();
        Swal.fire({
        title: 'Oops..',
        text: error,
        imageUrl: '../assets/error.png',
        animation: false
      });
    });
    
  }
  get f ()
  {
    return this.inputData.controls;
  }
}
