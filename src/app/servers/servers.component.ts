import { Component, OnInit } from '@angular/core';

// servers @component definition
// the supported selectors are by tag name, tag attribute and class name
@Component({
  // selector: 'app-servers',
  // selector: '[app-servers]',
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})

export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
