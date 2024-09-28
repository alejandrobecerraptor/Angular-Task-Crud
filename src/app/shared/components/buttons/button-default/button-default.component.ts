import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-button-default',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-default.component.html',
  styles: [],
})
export class ButtonDefaultComponent {
  @Input() label: string = '';
  @Input() btnClass: string = 'btn-primary';
  @Input() iconClass: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isActive: boolean = false;
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';

  @Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    this.onClick.emit();
  }
}
