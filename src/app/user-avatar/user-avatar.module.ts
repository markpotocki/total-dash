import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAvatarComponent} from './user-avatar.component';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [UserAvatarComponent],
  exports: [
    UserAvatarComponent
  ],
  imports: [
    CommonModule,
    MatBadgeModule
  ]
})
export class UserAvatarModule {
}
