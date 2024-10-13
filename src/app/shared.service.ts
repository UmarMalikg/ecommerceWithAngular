import { Injectable } from '@angular/core';
import { CATEGORIES } from './common/consts/categories.consts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedCategories = new BehaviorSubject<string[]>(CATEGORIES);
  selectedCategories$ = this.selectedCategories.asObservable();

  private searchString = new BehaviorSubject<string>('');
  searchString$ = this.searchString.asObservable();

  setSearchString(s: string) {
    this.searchString.next(s);
  }

  setSelectedCategories(categories: string[]) {
    this.selectedCategories.next(categories);
  }

  getSearchString(): string {
    return this.searchString.getValue();
  }

  getSelectedCategories(): string[] {
    return this.selectedCategories.getValue();
  }
}
