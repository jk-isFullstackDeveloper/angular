import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { BarGraphComponent } from './component/bar-graph/bar-graph.component';
import { TableComponent } from './component/table/table.component';
import { IconModuleModule } from './icon-module/icon-module.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IconModuleModule, RouterOutlet, SidebarComponent, BarGraphComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fronten_dashboard';
  isSidebarCollapsed = signal(true);


  toggleSidebar() {
    this.isSidebarCollapsed.update(value => !value);
  }
}
