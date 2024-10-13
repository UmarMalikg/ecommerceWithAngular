import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent implements OnInit {
  @Input() label: string = '';
  @Input() category: string = '';
  checked: boolean = false; // Default state

  constructor(private sharedSvc: SharedService) {}

  ngOnInit() {
    // Subscribe to the selected categories to set the initial state of the checkbox
    this.sharedSvc.selectedCategories$.subscribe((categories: string[]) => {
      this.checked = categories.includes(this.category); // Check if the category is in the selected list
    });
  }

  onCheckboxChange() {
    const currentSelectedCategories = this.sharedSvc.getSelectedCategories();

    // If the category is currently checked, we need to uncheck it
    if (this.checked) {
      // Remove from selected categories
      this.sharedSvc.setSelectedCategories(
        currentSelectedCategories.filter((c) => c !== this.category)
      );
    } else {
      // Add to selected categories
      this.sharedSvc.setSelectedCategories([
        ...currentSelectedCategories,
        this.category,
      ]);
    }

    // Toggle the checked state
    this.checked = !this.checked;
    console.log(this.sharedSvc.getSelectedCategories());
  }
}
