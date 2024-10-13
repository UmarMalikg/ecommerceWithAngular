import { Component } from '@angular/core';
import { CATEGORIES } from 'src/app/common/consts/categories.consts';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  categories: string[] = CATEGORIES;

  constructor(private sharedSvc: SharedService) {}

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    this.sharedSvc.setSearchString(query);
  }
}
