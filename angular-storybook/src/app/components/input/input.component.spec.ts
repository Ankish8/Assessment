import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent - Core Tests', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.type).toBe('text');
    expect(component.size).toBe('base');
    expect(component.variant).toBe('default');
    expect(component.state).toBe('default');
    expect(component.disabled).toBe(false);
    expect(component.required).toBe(false);
  });

  it('should generate unique ID when not provided', () => {
    component.ngOnInit();
    expect(component.inputId).toMatch(/^input-[a-z0-9]{9}$/);
  });

  it('should use provided ID when given', () => {
    component.id = 'custom-input-id';
    component.ngOnInit();
    expect(component.inputId).toBe('custom-input-id');
  });

  it('should compute classes correctly', () => {
    component.size = 'lg';
    component.variant = 'filled';
    component.state = 'error';
    component.className = 'custom-class';
    
    const classes = component.inputClasses;
    expect(classes).toContain('input');
    expect(classes).toContain('lg');
    expect(classes).toContain('filled');
    expect(classes).toContain('error');
    expect(classes).toContain('custom-class');
  });

  it('should handle error state correctly', () => {
    component.state = 'error';
    expect(component.hasError).toBe(true);
    
    component.state = 'default';
    component.errorMessage = 'Test error';
    expect(component.hasError).toBe(true);
  });

  it('should handle icon states correctly', () => {
    component.startIcon = 'test-icon';
    expect(component.hasStartIcon).toBe(true);
    
    component.endIcon = 'test-icon';
    expect(component.hasEndIcon).toBe(true);
  });

  it('should implement ControlValueAccessor methods', () => {
    const testValue = 'test value';
    
    component.writeValue(testValue);
    expect(component.value).toBe(testValue);
    
    const mockOnChange = jasmine.createSpy('onChange');
    component.registerOnChange(mockOnChange);
    
    const mockOnTouched = jasmine.createSpy('onTouched');
    component.registerOnTouched(mockOnTouched);
    
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });

  it('should render with basic template', () => {
    component.label = 'Test Label';
    component.placeholder = 'Test Placeholder';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const label = compiled.querySelector('label');
    const input = compiled.querySelector('input');
    
    expect(label?.textContent?.trim()).toBe('Test Label');
    expect(input?.placeholder).toBe('Test Placeholder');
  });
});