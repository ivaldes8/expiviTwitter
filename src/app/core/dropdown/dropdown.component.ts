import { Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: false,

  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() dropDownTitle: string = 'Options'; // Default title
  @Input() options: { title: string; link: string }[] = []; // Options array

  isOpen = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.el.nativeElement.contains(target)) {
      this.isOpen = false; // Close the dropdown
    }
  }
}
