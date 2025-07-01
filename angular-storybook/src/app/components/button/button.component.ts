import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonType = 'button' | 'submit' | 'reset';
export type IconPosition = 'left' | 'right';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: ButtonType = 'button';
  @Input() fullWidth: boolean = false;
  @Input() iconPosition: IconPosition = 'left';
  @Input() iconOnly: boolean = false;
  @Input() className: string = '';
  @Input() ariaLabel: string = '';

  @Output() onClick = new EventEmitter<MouseEvent>();

  // Remove HostBinding to avoid conflicts

  get computedClasses(): string {
    return [
      'button',
      this.variant,
      this.size,
      this.loading ? 'loading' : '',
      this.iconOnly ? 'icon-only' : '',
      this.fullWidth ? 'full-width' : '',
      this.className
    ].filter(Boolean).join(' ');
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onButtonClick(event: MouseEvent): void {
    if (!this.isDisabled) {
      this.onClick.emit(event);
    }
  }
}