import { Component } from '@angular/core';

// define a custom <app-root> html tag for our index.html file
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// export the component with a name property
export class AppComponent {
  name = 'Alejandro';
}
