import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="isOpen" (click)="onBackdropClick($event)">
      <div class="modal-panel" [class]="modalSizeClass" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="modal-header" *ngIf="title || description">
          <div class="modal-header-content">
            <h2 class="modal-title" *ngIf="title">{{ title }}</h2>
            <p class="modal-description" *ngIf="description">{{ description }}</p>
          </div>
          <button class="modal-close-button" (click)="closeModal()" type="button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <!-- Body -->
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        
        <!-- Footer -->
        <div class="modal-footer" *ngIf="showFooter">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(16, 24, 40, 0.7);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
      box-sizing: border-box;
    }
    
    .modal-panel {
      background: white;
      border-radius: 12px;
      box-shadow: 0 25px 50px rgba(16, 24, 40, 0.25);
      max-height: calc(100vh - 32px);
      overflow-y: auto;
      position: relative;
      width: 100%;
      max-width: 500px;
    }
    
    .modal-panel.size-sm {
      max-width: 400px;
    }
    
    .modal-panel.size-base {
      max-width: 500px;
    }
    
    .modal-panel.size-lg {
      max-width: 700px;
    }
    
    .modal-panel.size-xl {
      max-width: 900px;
    }
    
    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 24px 24px 16px 24px;
      border-bottom: 1px solid #ddd6e3;
    }
    
    .modal-header-content {
      flex: 1;
      margin-right: 16px;
    }
    
    .modal-title {
      margin: 0 0 4px 0;
      color: #2a1f35;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.4;
    }
    
    .modal-description {
      margin: 0;
      color: #6b5671;
      font-size: 14px;
      line-height: 1.4;
    }
    
    .modal-close-button {
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b5671;
      transition: all 200ms ease;
      flex-shrink: 0;
    }
    
    .modal-close-button:hover {
      background: #efebf2;
      color: #2a1f35;
    }
    
    .modal-body {
      padding: 24px;
      color: #2a1f35;
      line-height: 1.5;
    }
    
    .modal-footer {
      padding: 16px 24px 24px 24px;
      border-top: 1px solid #ddd6e3;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      background: #f8f6fa;
      border-radius: 0 0 12px 12px;
    }
    
    @media (max-width: 768px) {
      .modal-backdrop {
        padding: 8px;
      }
      
      .modal-panel {
        max-width: 100%;
        max-height: calc(100vh - 16px);
      }
      
      .modal-header,
      .modal-body,
      .modal-footer {
        padding-left: 16px;
        padding-right: 16px;
      }
    }
  `]
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() size: 'sm' | 'base' | 'lg' | 'xl' = 'base';
  @Input() title?: string;
  @Input() description?: string;
  @Input() showFooter: boolean = true;
  @Input() closeOnBackdropClick: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() position?: string;
  @Input() variant?: string;
  @Input() animationEnabled?: boolean;

  @Output() onClose = new EventEmitter<void>();

  get modalSizeClass(): string {
    return `size-${this.size}`;
  }

  closeModal(): void {
    this.onClose.emit();
  }

  onBackdropClick(event: Event): void {
    if (this.closeOnBackdropClick && event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen && this.closeOnEscape) {
      this.closeModal();
    }
  }
}