import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggingService } from './Services/logging.service';
import { HttpClientModule } from '@angular/common/http'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
//   constructor(private logger : LoggingService ) {}
//   logInfo(){
//     this.logger.log("Infomation",'User logged in successfully');
//   }
// }

constructor(private loggingService: LoggingService) {}
 logData = {
  timestamp: new Date().toISOString(),
  level: 'info',
  message: 'User logged in',
  additionalInfo: {
    user: 'john_doe',
    location: 'San Francisco',
  },
};

loginfo(){

  this.loggingService.sendLogEntry(this.logData).subscribe({
    next: (response) => {
      console.log('Log entry sent:', response);
    },
    error: (error) => {
      console.error('Error sending log entry:', error);
    },
  });
}
  

}