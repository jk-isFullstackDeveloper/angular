import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';



@NgModule({
  declarations: [],
  imports: [
    FeatherModule.pick(allIcons),

    CommonModule
  ], exports: [FeatherModule]
})
export class IconModuleModule { }
