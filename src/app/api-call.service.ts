import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  URLPath = "https://api.openweathermap.org/data/2.5/weather?";
  APIKEY = "520b34e2915c9bbfc9554fb194238547";

  constructor(private httpCall:HttpClient) { }

  weatherData(inputData):Observable<any>
  {
    const url = `${this.URLPath}`+'q='+inputData+'&appid='+this.APIKEY;
    return this.httpCall.get(url).pipe(catchError(this.handleError))
  }

  handleError(error)
  {
    return throwError(error.error['message'] || "Server Error");
  }  
}
