import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: false,

  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() options: { value: any; display: string }[] = [];
  @Input() errorMessages: { [key: string]: string } = {};

  public Object = Object;
}
