import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses" (click)="handleClick($event)">
      <div class="card-header" *ngIf="headerTitle || headerSubtitle">
        <h3 *ngIf="headerTitle">{{ headerTitle }}</h3>
        <p *ngIf="headerSubtitle">{{ headerSubtitle }}</p>
      </div>
      
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      
      <div class="card-footer" *ngIf="showFooter">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border: 1px solid #ddd6e3;
      border-radius: 8px;
      padding: 0;
      margin: 0;
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    
    .card-default {
      border: 1px solid #ddd6e3;
      box-shadow: none;
    }
    
    .card-elevated {
      border: 1px solid transparent;
      box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
    }
    
    .card-outlined {
      border: 2px solid #ddd6e3;
      box-shadow: none;
    }
    
    .card-flat {
      background: #f8f6fa;
      border: 1px solid transparent;
      box-shadow: none;
    }
    
    .card-header {
      padding: 16px 16px 12px 16px;
      border-bottom: 1px solid #ddd6e3;
    }
    
    .card-header h3 {
      margin: 0;
      color: #2a1f35;
      font-size: 16px;
      font-weight: 500;
    }
    
    .card-header p {
      margin: 4px 0 0 0;
      color: #6b5671;
      font-size: 14px;
    }
    
    .card-body {
      padding: 16px;
      color: #2a1f35;
      line-height: 1.5;
    }
    
    .card-footer {
      padding: 12px 16px 16px 16px;
      border-top: 1px solid #ddd6e3;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
    
    .clickable {
      cursor: pointer;
    }
    
    .clickable:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(16, 24, 40, 0.1), 0 2px 4px rgba(16, 24, 40, 0.06);
    }
  `]
})
export class CardComponent {
  @Input() variant: 'default' | 'elevated' | 'outlined' | 'flat' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
  @Input() headerTitle?: string;
  @Input() headerSubtitle?: string;
  @Input() clickable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() showFooter: boolean = false;
  @Input() ariaLabel?: string;
  @Input() role?: string;

  @Output() onClick = new EventEmitter<MouseEvent>();

  get cardClasses(): string {
    return [
      'card',
      `card-${this.variant}`,
      this.clickable ? 'clickable' : ''
    ].filter(Boolean).join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (this.clickable && !this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}