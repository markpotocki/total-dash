import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  @Input() imageSource = 'http://www.trbimg.com/img-52237ada/turbine/chi-chicago-bears-jmarcus-webb-20130901-001/600/600x400';
  @Input() displayName = 'JWebb';

  constructor() {
  }

  ngOnInit(): void {
  }

}
