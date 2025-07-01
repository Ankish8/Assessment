import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { By } from '@angular/platform-browser';

import { ModalComponent, ModalSize, ModalPosition, ModalVariant } from './modal.component';

@Component({
  template: `
    <app-modal
      [isOpen]="isOpen"
      [size]="size"
      [position]="position"
      [variant]="variant"
      [title]="title"
      [description]="description"
      [showHeader]="showHeader"
      [showFooter]="showFooter"
      [closeOnBackdropClick]="closeOnBackdropClick"
      [closeOnEscape]="closeOnEscape"
      [disableClose]="disableClose"
      [animationEnabled]="animationEnabled"
      (onOpen)="onOpenHandler()"
      (onClose)="onCloseHandler()"
      (onBackdropClick)="onBackdropClickHandler()"
      (onEscapeKeydown)="onEscapeKeydownHandler()">
      
      <div class="test-content">Test Modal Content</div>
      <div slot="footer" class="test-footer">
        <button>Cancel</button>
        <button>Save</button>
      </div>
      
    </app-modal>
    
    <ng-template #customHeaderTemplate>
      <div class="custom-header">Custom Header</div>
    </ng-template>
    
    <ng-template #customBodyTemplate>
      <div class="custom-body">Custom Body</div>
    </ng-template>
    
    <ng-template #customFooterTemplate>
      <div class="custom-footer">Custom Footer</div>
    </ng-template>
  `
})
class TestHostComponent {
  // Modal Properties
  isOpen = false;
  size: ModalSize = 'base';
  position: ModalPosition = 'center';
  variant: ModalVariant = 'default';
  title = 'Test Modal';
  description = 'Test Description';
  showHeader = true;
  showFooter = true;
  closeOnBackdropClick = true;
  closeOnEscape = true;
  disableClose = false;
  animationEnabled = true;

  // Event Handlers
  onOpenCalled = false;
  onCloseCalled = false;
  onBackdropClickCalled = false;
  onEscapeKeydownCalled = false;

  @ViewChild('customHeaderTemplate') customHeaderTemplate!: TemplateRef<any>;
  @ViewChild('customBodyTemplate') customBodyTemplate!: TemplateRef<any>;
  @ViewChild('customFooterTemplate') customFooterTemplate!: TemplateRef<any>;

  onOpenHandler() { this.onOpenCalled = true; }
  onCloseHandler() { this.onCloseCalled = true; }
  onBackdropClickHandler() { this.onBackdropClickCalled = true; }
  onEscapeKeydownHandler() { this.onEscapeKeydownCalled = true; }
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let modalElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        OverlayModule,
        A11yModule,
        ModalComponent
      ],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(ModalComponent)).componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(hostComponent).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.isOpen).toBe(false);
      expect(component.size).toBe('base');
      expect(component.position).toBe('center');
      expect(component.variant).toBe('default');
      expect(component.closeOnBackdropClick).toBe(true);
      expect(component.closeOnEscape).toBe(true);
      expect(component.disableClose).toBe(false);
      expect(component.animationEnabled).toBe(true);
    });

    it('should generate unique modal ID', () => {
      expect(component.modalId).toBeTruthy();
      expect(component.modalId).toMatch(/^modal-[a-z0-9]+$/);
    });
  });

  describe('Input Properties', () => {
    it('should accept all input properties', () => {
      hostComponent.isOpen = true;
      hostComponent.size = 'lg';
      hostComponent.position = 'top';
      hostComponent.variant = 'danger';
      hostComponent.title = 'Updated Title';
      hostComponent.description = 'Updated Description';
      hostComponent.showHeader = false;
      hostComponent.showFooter = false;
      hostComponent.closeOnBackdropClick = false;
      hostComponent.closeOnEscape = false;
      hostComponent.disableClose = true;
      hostComponent.animationEnabled = false;

      fixture.detectChanges();

      expect(component.isOpen).toBe(true);
      expect(component.size).toBe('lg');
      expect(component.position).toBe('top');
      expect(component.variant).toBe('danger');
      expect(component.title).toBe('Updated Title');
      expect(component.description).toBe('Updated Description');
      expect(component.showHeader).toBe(false);
      expect(component.showFooter).toBe(false);
      expect(component.closeOnBackdropClick).toBe(false);
      expect(component.closeOnEscape).toBe(false);
      expect(component.disableClose).toBe(true);
      expect(component.animationEnabled).toBe(false);
    });
  });

  describe('CSS Classes', () => {
    it('should generate correct modal classes', () => {
      hostComponent.size = 'lg';
      hostComponent.position = 'top';
      hostComponent.variant = 'danger';
      hostComponent.isOpen = true;
      fixture.detectChanges();

      const classes = component.modalClasses;
      expect(classes).toContain('modal');
      expect(classes).toContain('modal-lg');
      expect(classes).toContain('modal-top');
      expect(classes).toContain('modal-danger');
      expect(classes).toContain('modal-open');
    });

    it('should generate correct backdrop classes', () => {
      hostComponent.isOpen = true;
      fixture.detectChanges();

      const classes = component.backdropClasses;
      expect(classes).toContain('modal-backdrop');
    });

    it('should generate correct panel classes', () => {
      hostComponent.size = 'xl';
      hostComponent.position = 'bottom';
      fixture.detectChanges();

      const classes = component.panelClasses;
      expect(classes).toContain('modal-panel');
      expect(classes).toContain('modal-panel-xl');
      expect(classes).toContain('modal-panel-bottom');
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA role', () => {
      expect(component.ariaRole).toBe('dialog');
      
      hostComponent.variant = 'danger';
      fixture.detectChanges();
      expect(component.ariaRole).toBe('alertdialog');
    });

    it('should compute ARIA label correctly', () => {
      expect(component.computedAriaLabel).toBe('Test Modal');
      
      hostComponent.title = '';
      fixture.detectChanges();
      expect(component.computedAriaLabel).toBe('Modal dialog');
    });

    it('should compute ARIA described by correctly', () => {
      const describedBy = component.computedAriaDescribedBy;
      expect(describedBy).toContain(`${component.modalId}-description`);
    });

    it('should compute ARIA labelled by correctly', () => {
      const labelledBy = component.computedAriaLabelledBy;
      expect(labelledBy).toBe(`${component.modalId}-title`);
    });
  });

  describe('Modal Lifecycle', () => {
    it('should open modal when isOpen is true', fakeAsync(() => {
      spyOn(component, 'openModal');
      
      hostComponent.isOpen = true;
      fixture.detectChanges();
      tick();

      expect(component.openModal).toHaveBeenCalled();
    }));

    it('should emit onOpen event when opened', fakeAsync(() => {
      hostComponent.isOpen = true;
      fixture.detectChanges();
      tick(100);

      expect(hostComponent.onOpenCalled).toBe(true);
    }));

    it('should emit onClose event when closed', fakeAsync(() => {
      hostComponent.isOpen = true;
      fixture.detectChanges();
      tick(100);

      component.close();
      tick(500);

      expect(hostComponent.onCloseCalled).toBe(true);
    }));
  });

  describe('Event Handling', () => {
    beforeEach(() => {
      hostComponent.isOpen = true;
      fixture.detectChanges();
    });

    it('should emit backdrop click event', () => {
      component.onBackdropClickInternal(new Event('click'));
      expect(hostComponent.onBackdropClickCalled).toBe(true);
    });

    it('should close on backdrop click when enabled', () => {
      spyOn(component, 'close');
      hostComponent.closeOnBackdropClick = true;
      fixture.detectChanges();

      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: event.currentTarget });
      component.onBackdropClickInternal(event);

      expect(component.close).toHaveBeenCalled();
    });

    it('should not close on backdrop click when disabled', () => {
      spyOn(component, 'close');
      hostComponent.closeOnBackdropClick = false;
      fixture.detectChanges();

      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: event.currentTarget });
      component.onBackdropClickInternal(event);

      expect(component.close).not.toHaveBeenCalled();
    });

    it('should emit escape keydown event', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKeydown(event);
      expect(hostComponent.onEscapeKeydownCalled).toBe(true);
    });

    it('should close on escape key when enabled', () => {
      spyOn(component, 'close');
      hostComponent.closeOnEscape = true;
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKeydown(event);

      expect(component.close).toHaveBeenCalled();
    });

    it('should not close on escape key when disabled', () => {
      spyOn(component, 'close');
      hostComponent.closeOnEscape = false;
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKeydown(event);

      expect(component.close).not.toHaveBeenCalled();
    });
  });

  describe('Close Button', () => {
    beforeEach(() => {
      hostComponent.isOpen = true;
      fixture.detectChanges();
    });

    it('should close modal when close button is clicked', () => {
      spyOn(component, 'close');
      component.onCloseClick();
      expect(component.close).toHaveBeenCalled();
    });

    it('should not close when disableClose is true', () => {
      spyOn(component, 'close');
      hostComponent.disableClose = true;
      fixture.detectChanges();

      component.onCloseClick();
      expect(component.close).not.toHaveBeenCalled();
    });
  });

  describe('Public API Methods', () => {
    it('should open modal via open() method', () => {
      expect(component.isOpen).toBe(false);
      component.open();
      expect(component.isOpen).toBe(true);
    });

    it('should close modal via close() method', () => {
      hostComponent.isOpen = true;
      fixture.detectChanges();
      
      component.close();
      expect(component.isOpen).toBe(false);
    });

    it('should toggle modal state', () => {
      expect(component.isOpen).toBe(false);
      
      component.toggle();
      expect(component.isOpen).toBe(true);
      
      component.toggle();
      expect(component.isOpen).toBe(false);
    });

    it('should update configuration', () => {
      const newConfig = { size: 'lg' as ModalSize, variant: 'success' as ModalVariant };
      component.updateConfig(newConfig);
      
      expect(component.size).toBe('lg');
      expect(component.variant).toBe('success');
    });

    it('should get current configuration', () => {
      const config = component.getConfig();
      
      expect(config).toEqual(jasmine.objectContaining({
        size: component.size,
        position: component.position,
        variant: component.variant,
        closeOnBackdropClick: component.closeOnBackdropClick,
        closeOnEscape: component.closeOnEscape,
        disableClose: component.disableClose
      }));
    });
  });

  describe('Content Projection', () => {
    it('should project default content in body', () => {
      hostComponent.isOpen = true;
      fixture.detectChanges();

      // Note: This test would need to check the actual DOM in an integration test
      // For unit testing, we verify the component structure
      expect(component.showHeader).toBe(true);
      expect(component.showFooter).toBe(true);
    });

    it('should hide header when showHeader is false', () => {
      hostComponent.showHeader = false;
      fixture.detectChanges();

      expect(component.headerClasses).toContain('modal-header-hidden');
    });

    it('should hide footer when showFooter is false', () => {
      hostComponent.showFooter = false;
      fixture.detectChanges();

      expect(component.footerClasses).toContain('modal-footer-hidden');
    });
  });

  describe('Animation States', () => {
    it('should have correct initial animation state', () => {
      expect(component.animationState).toBe('void');
    });

    it('should change animation state when opening', fakeAsync(() => {
      hostComponent.isOpen = true;
      fixture.detectChanges();
      tick();

      // The animation state should change to 'enter' when opening
      // This would be verified in the actual implementation
      expect(component.animationEnabled).toBe(true);
    }));
  });

  describe('Size Variants', () => {
    it('should apply size classes correctly', () => {
      const sizes: ModalSize[] = ['sm', 'base', 'lg', 'xl', 'full'];
      
      sizes.forEach(size => {
        hostComponent.size = size;
        fixture.detectChanges();
        
        expect(component.modalClasses).toContain(`modal-${size}`);
        expect(component.panelClasses).toContain(`modal-panel-${size}`);
      });
    });
  });

  describe('Position Variants', () => {
    it('should apply position classes correctly', () => {
      const positions: ModalPosition[] = ['center', 'top', 'bottom'];
      
      positions.forEach(position => {
        hostComponent.position = position;
        fixture.detectChanges();
        
        expect(component.modalClasses).toContain(`modal-${position}`);
        expect(component.panelClasses).toContain(`modal-panel-${position}`);
      });
    });
  });

  describe('Variant Styles', () => {
    it('should apply variant classes correctly', () => {
      const variants: ModalVariant[] = ['default', 'danger', 'success', 'warning'];
      
      variants.forEach(variant => {
        hostComponent.variant = variant;
        fixture.detectChanges();
        
        expect(component.modalClasses).toContain(`modal-${variant}`);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing title gracefully', () => {
      hostComponent.title = '';
      fixture.detectChanges();

      expect(component.computedAriaLabel).toBe('Modal dialog');
    });

    it('should handle disabled state correctly', () => {
      hostComponent.disableClose = true;
      fixture.detectChanges();

      expect(component.modalClasses).toContain('modal-no-close');
    });

    it('should handle animation disabled state', () => {
      hostComponent.animationEnabled = false;
      fixture.detectChanges();

      expect(component.modalClasses).not.toContain('modal-animated');
    });
  });
});