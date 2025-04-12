import { IconModuleModule } from '../../icon-module/icon-module.module';
import { Component, EventEmitter, input, output } from '@angular/core';
import { } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [NgClass, NgIf, IconModuleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = input.required<boolean>();
  toggle = output<void>();
}
