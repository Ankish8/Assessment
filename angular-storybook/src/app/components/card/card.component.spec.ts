import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CardComponent, CardVariant, CardSize, CardPadding } from './card.component';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card
      [variant]="variant"
      [size]="size"
      [padding]="padding"
      [clickable]="clickable"
      [disabled]="disabled"
      [loading]="loading"
      [className]="className"
      [ariaLabel]="ariaLabel"
      [role]="role"
      [showHeader]="showHeader"
      [headerTitle]="headerTitle"
      [headerSubtitle]="headerSubtitle"
      [showFooter]="showFooter"
      (onClick)="onCardClick($event)"
      (onKeyDown)="onCardKeyDown($event)">
      
      <div slot="header">Custom Header Content</div>
      <p>Card body content</p>
      <div slot="footer">
        <button>Action</button>
      </div>
    </app-card>
  `
})
class TestHostComponent {
  variant: CardVariant = 'default';
  size: CardSize = 'medium';
  padding: CardPadding = 'medium';
  clickable = false;
  disabled = false;
  loading = false;
  className = '';
  ariaLabel = '';
  role = 'region';
  showHeader = false;
  headerTitle = '';
  headerSubtitle = '';
  showFooter = false;

  onCardClick = jasmine.createSpy('onCardClick');
  onCardKeyDown = jasmine.createSpy('onCardKeyDown');
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      expect(component.variant).toBe('default');
      expect(component.size).toBe('medium');
      expect(component.padding).toBe('medium');
      expect(component.clickable).toBe(false);
      expect(component.disabled).toBe(false);
      expect(component.loading).toBe(false);
      expect(component.role).toBe('region');
      expect(component.showHeader).toBe(false);
      expect(component.showFooter).toBe(false);
    });
  });

  describe('CSS Classes Generation', () => {
    it('should generate correct CSS classes for default configuration', () => {
      const expectedClasses = 'card default medium padding-medium';
      expect(component.computedClasses).toBe(expectedClasses);
    });

    it('should include clickable class when clickable is true', () => {
      component.clickable = true;
      expect(component.computedClasses).toContain('clickable');
    });

    it('should include disabled class when disabled is true', () => {
      component.disabled = true;
      expect(component.computedClasses).toContain('disabled');
    });

    it('should include loading class when loading is true', () => {
      component.loading = true;
      expect(component.computedClasses).toContain('loading');
    });

    it('should include custom className', () => {
      component.className = 'custom-class';
      expect(component.computedClasses).toContain('custom-class');
    });

    it('should generate correct classes for all variants', () => {
      const variants: CardVariant[] = ['default', 'elevated', 'outlined', 'flat'];
      variants.forEach(variant => {
        component.variant = variant;
        expect(component.computedClasses).toContain(variant);
      });
    });

    it('should generate correct classes for all sizes', () => {
      const sizes: CardSize[] = ['small', 'medium', 'large'];
      sizes.forEach(size => {
        component.size = size;
        expect(component.computedClasses).toContain(size);
      });
    });

    it('should generate correct classes for all padding options', () => {
      const paddings: CardPadding[] = ['none', 'small', 'medium', 'large'];
      paddings.forEach(padding => {
        component.padding = padding;
        expect(component.computedClasses).toContain(`padding-${padding}`);
      });
    });
  });

  describe('Header Display Logic', () => {
    it('should show header when showHeader is true', () => {
      component.showHeader = true;
      expect(component.shouldShowHeader).toBe(true);
    });

    it('should show header when headerTitle is provided', () => {
      component.headerTitle = 'Test Title';
      expect(component.shouldShowHeader).toBe(true);
    });

    it('should show header when headerSubtitle is provided', () => {
      component.headerSubtitle = 'Test Subtitle';
      expect(component.shouldShowHeader).toBe(true);
    });

    it('should not show header when all header props are false/empty', () => {
      component.showHeader = false;
      component.headerTitle = '';
      component.headerSubtitle = '';
      expect(component.shouldShowHeader).toBe(false);
    });
  });

  describe('Event Handling', () => {
    it('should emit onClick when card is clicked and clickable', () => {
      component.clickable = true;
      spyOn(component.onClick, 'emit');
      
      const mockEvent = new MouseEvent('click');
      component.onCardClick(mockEvent);
      
      expect(component.onClick.emit).toHaveBeenCalledWith(mockEvent);
    });

    it('should not emit onClick when card is disabled', () => {
      component.clickable = true;
      component.disabled = true;
      spyOn(component.onClick, 'emit');
      
      const mockEvent = new MouseEvent('click');
      component.onCardClick(mockEvent);
      
      expect(component.onClick.emit).not.toHaveBeenCalled();
    });

    it('should not emit onClick when card is loading', () => {
      component.clickable = true;
      component.loading = true;
      spyOn(component.onClick, 'emit');
      
      const mockEvent = new MouseEvent('click');
      component.onCardClick(mockEvent);
      
      expect(component.onClick.emit).not.toHaveBeenCalled();
    });

    it('should not emit onClick when card is not clickable', () => {
      component.clickable = false;
      spyOn(component.onClick, 'emit');
      
      const mockEvent = new MouseEvent('click');
      component.onCardClick(mockEvent);
      
      expect(component.onClick.emit).not.toHaveBeenCalled();
    });

    it('should emit onClick on Enter key press', () => {
      component.clickable = true;
      spyOn(component.onClick, 'emit');
      
      const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(mockEvent, 'preventDefault');
      component.onCardKeyDown(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(component.onClick.emit).toHaveBeenCalled();
    });

    it('should emit onClick on Space key press', () => {
      component.clickable = true;
      spyOn(component.onClick, 'emit');
      
      const mockEvent = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(mockEvent, 'preventDefault');
      component.onCardKeyDown(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(component.onClick.emit).toHaveBeenCalled();
    });

    it('should emit onKeyDown for all key events when clickable', () => {
      component.clickable = true;
      spyOn(component.onKeyDown, 'emit');
      
      const mockEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      component.onCardKeyDown(mockEvent);
      
      expect(component.onKeyDown.emit).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('DOM Rendering', () => {
    beforeEach(() => {
      hostFixture.detectChanges();
    });

    it('should render card element with correct attributes', () => {
      const cardElement = hostFixture.debugElement.query(By.css('.card'));
      expect(cardElement).toBeTruthy();
      expect(cardElement.nativeElement.getAttribute('role')).toBe('region');
    });

    it('should set aria-label when provided', () => {
      hostComponent.ariaLabel = 'Test card';
      hostFixture.detectChanges();
      
      const cardElement = hostFixture.debugElement.query(By.css('.card'));
      expect(cardElement.nativeElement.getAttribute('aria-label')).toBe('Test card');
    });

    it('should set tabindex to 0 for clickable cards', () => {
      hostComponent.clickable = true;
      hostFixture.detectChanges();
      
      const cardElement = hostFixture.debugElement.query(By.css('.card'));
      expect(cardElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should set tabindex to -1 for non-clickable cards', () => {
      hostComponent.clickable = false;
      hostFixture.detectChanges();
      
      const cardElement = hostFixture.debugElement.query(By.css('.card'));
      expect(cardElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should render header when headerTitle is provided', () => {
      hostComponent.headerTitle = 'Test Title';
      hostFixture.detectChanges();
      
      const headerElement = hostFixture.debugElement.query(By.css('.card-header-title'));
      expect(headerElement).toBeTruthy();
      expect(headerElement.nativeElement.textContent).toBe('Test Title');
    });

    it('should render header subtitle when provided', () => {
      hostComponent.headerSubtitle = 'Test Subtitle';
      hostFixture.detectChanges();
      
      const subtitleElement = hostFixture.debugElement.query(By.css('.card-header-subtitle'));
      expect(subtitleElement).toBeTruthy();
      expect(subtitleElement.nativeElement.textContent).toBe('Test Subtitle');
    });

    it('should render body content', () => {
      const bodyElement = hostFixture.debugElement.query(By.css('.card-body'));
      expect(bodyElement).toBeTruthy();
      expect(bodyElement.nativeElement.textContent.trim()).toContain('Card body content');
    });

    it('should render footer when showFooter is true', () => {
      hostComponent.showFooter = true;
      hostFixture.detectChanges();
      
      const footerElement = hostFixture.debugElement.query(By.css('.card-footer'));
      expect(footerElement).toBeTruthy();
    });

    it('should not render footer when showFooter is false', () => {
      hostComponent.showFooter = false;
      hostFixture.detectChanges();
      
      const footerElement = hostFixture.debugElement.query(By.css('.card-footer'));
      expect(footerElement).toBeFalsy();
    });

    it('should render loading spinner when loading is true', () => {
      hostComponent.loading = true;
      hostFixture.detectChanges();
      
      const spinnerElement = hostFixture.debugElement.query(By.css('.loading-spinner'));
      expect(spinnerElement).toBeTruthy();
    });

    it('should not render loading spinner when loading is false', () => {
      hostComponent.loading = false;
      hostFixture.detectChanges();
      
      const spinnerElement = hostFixture.debugElement.query(By.css('.loading-spinner'));
      expect(spinnerElement).toBeFalsy();
    });
  });

  describe('Content Projection', () => {
    beforeEach(() => {
      hostFixture.detectChanges();
    });

    it('should project header content when showHeader is true', () => {
      hostComponent.showHeader = true;
      hostFixture.detectChanges();
      
      const headerElement = hostFixture.debugElement.query(By.css('.card-header'));
      expect(headerElement.nativeElement.textContent).toContain('Custom Header Content');
    });

    it('should project footer content when showFooter is true', () => {
      hostComponent.showFooter = true;
      hostFixture.detectChanges();
      
      const footerElement = hostFixture.debugElement.query(By.css('.card-footer'));
      expect(footerElement.nativeElement.textContent).toContain('Action');
    });

    it('should always project body content', () => {
      const bodyElement = hostFixture.debugElement.query(By.css('.card-body'));
      expect(bodyElement.nativeElement.textContent).toContain('Card body content');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      hostFixture.detectChanges();
    });

    it('should handle click events', () => {
      hostComponent.clickable = true;
      hostFixture.detectChanges();
      
      const cardElement = hostFixture.debugElement.query(By.css('.card'));
      cardElement.triggerEventHandler('click', new MouseEvent('click'));
      
      expect(hostComponent.onCardClick).toHaveBeenCalled();
    });

    it('should handle keyboard events', () => {
      hostComponent.clickable = true;
      hostFixture.detectChanges();
      
      const cardElement = hostFixture.debugElement.query(By.css('.card'));
      cardElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Enter' }));
      
      expect(hostComponent.onCardKeyDown).toHaveBeenCalled();
    });
  });
});