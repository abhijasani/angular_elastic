// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from './../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoggingService {

//   private logstashUrl = environment.logstashUrl; // URL of your Logstash instance

//   constructor(private http: HttpClient) { }

//   private createHeaders(): HttpHeaders {
//     return new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
//   }

//   private createLogEntry(level: string, message: string, additionalInfo?: any): any {
//     return {
//       timestamp: new Date().toISOString(),
//       level,
//       message,
//       additionalInfo,
//       application: 'your-application-name'
//     };
//   }

//   log(level: string, message: string, additionalInfo?: any) {
//     const logEntry = this.createLogEntry(level, message, additionalInfo);

//     // Send the log entry directly to Logstash
//     this.http.post(this.logstashUrl, logEntry, { headers: this.createHeaders() })
//       .subscribe({
//         next: (response) => console.log('Log entry sent successfully:', response),
//         error: (error) => console.error('Error sending log entry:', error)
//       });
//   }

//     info(message: string, additionalInfo?: any) {
//     this.log('Info', message, additionalInfo);
//   }

//   warn(message: string, additionalInfo?: any) {
//     this.log('Warning', message, additionalInfo);
//   }

//   error(message: string, additionalInfo?: any) {
//     this.log('Error', message, additionalInfo);
//   }

//   debug(message: string, additionalInfo?: any) {
//     this.log('Debug', message, additionalInfo);
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoggingService {
//   // Ensure this URL points to your Elasticsearch index
//   private apiUrl = 'http://localhost:9200/Angular_frontend/_doc/';

//   constructor(private http: HttpClient) {}

//   sendLogEntry(data: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//    //   'IndexFormat' : "Angular-logs-{0:yyyy.MM.dd}"
//     });

//     return this.http.post(this.apiUrl, JSON.stringify(data), { headers }).pipe(
//       catchError((error) => {
//         console.error('Error sending log entry:', error);
//         return throwError(() => error);
//       })
//     );
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private apiUrl = 'http://localhost:9200';

  constructor(private http: HttpClient) {}

  sendLogEntry(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const currentDate = new Date();
    const indexFormat = `logstash-${currentDate.getFullYear()}.${('0' + (currentDate.getMonth() + 1)).slice(-2)}.${('0' + currentDate.getDate()).slice(-2)}`;
    const fullUrl = `${this.apiUrl}/${indexFormat}/_doc/`;

    console.log('Sending log data to:', fullUrl);
    console.log('Log data:', JSON.stringify(data));

    return this.http.post(fullUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error sending log entry:', error);
        return throwError(() => error);
      })
    );
  }
}
