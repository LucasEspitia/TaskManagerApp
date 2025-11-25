import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority-filter',
  standalone: true,
  templateUrl: './priority-filter.component.html',
  styleUrl: './priority-filter.component.css',
  imports: [CommonModule],
})
export class PriorityFilterComponent implements OnInit, OnDestroy {
  @Output() prioritySelected = new EventEmitter<string>();

  menuOpen = false;
  selectedLabel = 'All';

  // On global click -> close the menu when is open
  private clickHandler!: () => void;

  ngOnInit() {
    this.clickHandler = () => {
      this.menuOpen = false;
    };
    document.addEventListener('click', this.clickHandler);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.clickHandler);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  select(priority: string) {
    this.menuOpen = false;
    this.selectedLabel = priority ? this.formatLabel(priority) : 'All';
    this.prioritySelected.emit(priority);
  }

  formatLabel(value: string): string {
    return value.charAt(0) + value.slice(1).toLowerCase();
  }
}
