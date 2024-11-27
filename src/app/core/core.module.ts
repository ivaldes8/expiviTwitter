import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { BoxComponent } from './box/box.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';



@NgModule({
  declarations: [
    NavBarComponent,
    DropdownComponent,
    ButtonComponent,
    BoxComponent,
    InputComponent,
    SelectComponent,
    UserAvatarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    DropdownComponent,
    ButtonComponent,
    BoxComponent,
    InputComponent,
    SelectComponent,
    UserAvatarComponent
  ],
})
export class CoreModule { }
