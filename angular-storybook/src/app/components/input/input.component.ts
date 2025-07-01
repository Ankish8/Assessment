import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  forwardRef,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
export type InputSize = 'sm' | 'base' | 'lg';
export type InputVariant = 'default' | 'filled' | 'ghost';
export type InputState = 'default' | 'error' | 'success';

export interface InputComponentProps {
  // Basic Properties
  type: InputType;
  placeholder?: string;
  value?: string;
  disabled: boolean;
  required: boolean;
  id?: string;
  
  // Styling Properties
  size: InputSize;
  variant: InputVariant;
  state: InputState;
  
  // Label and Help Text
  label?: string;
  helperText?: string;
  errorMessage?: string;
  
  // Icons
  startIcon?: TemplateRef<any> | string;
  endIcon?: TemplateRef<any> | string;
  
  // CSS Classes
  className?: string;
  containerClassName?: string;
}

export interface InputComponentEvents {
  valueChange: EventEmitter<string>;
  blurEvent: EventEmitter<FocusEvent>;
  focusEvent: EventEmitter<FocusEvent>;
  inputEvent: EventEmitter<Event>;
  keyupEvent: EventEmitter<KeyboardEvent>;
  keydownEvent: EventEmitter<KeyboardEvent>;
}

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  // Basic Properties
  @Input() type: InputType = 'text';
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() id?: string;
  
  // Styling Properties
  @Input() size: InputSize = 'base';
  @Input() variant: InputVariant = 'default';
  @Input() state: InputState = 'default';
  
  // Label and Help Text
  @Input() label?: string;
  @Input() helperText?: string;
  @Input() errorMessage?: string;
  
  // Icons
  @Input() startIcon?: TemplateRef<any> | string;
  @Input() endIcon?: TemplateRef<any> | string;
  
  // CSS Classes
  @Input() className?: string;
  @Input() containerClassName?: string;

  // Output Events
  @Output() valueChange = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() inputEvent = new EventEmitter<Event>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();

  @ViewChild('inputElement', { static: false }) inputElement!: ElementRef<HTMLInputElement>;

  // Internal properties
  private _value: string = '';
  private _uniqueId: string = '';
  private _helpTextId: string = '';

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Generate unique ID if not provided
    this._uniqueId = this.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    this._helpTextId = `${this._uniqueId}-help`;
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  // Getters for computed properties
  get inputId(): string {
    return this._uniqueId;
  }

  get helpTextId(): string {
    return this._helpTextId;
  }

  get hasError(): boolean {
    return this.state === 'error' || !!this.errorMessage;
  }

  get hasSuccess(): boolean {
    return this.state === 'success';
  }

  get hasStartIcon(): boolean {
    return !!this.startIcon;
  }

  get hasEndIcon(): boolean {
    return !!this.endIcon;
  }

  get inputClasses(): string {
    return [
      'input',
      this.size,
      this.variant,
      this.state,
      this.hasStartIcon && 'hasStartIcon',
      this.hasEndIcon && 'hasEndIcon',
      this.disabled && 'disabled',
      this.hasError && 'error',
      this.hasSuccess && 'success',
      this.className
    ].filter(Boolean).join(' ');
  }

  get containerClasses(): string {
    return [
      'container',
      this.containerClassName
    ].filter(Boolean).join(' ');
  }

  // Template helper methods
  isTemplate(icon: TemplateRef<any> | string | undefined): boolean {
    return icon instanceof TemplateRef;
  }

  isString(icon: TemplateRef<any> | string | undefined): boolean {
    return typeof icon === 'string';
  }

  // Event handlers
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    
    this._value = value;
    this.onChange(value);
    this.valueChange.emit(value);
    this.inputEvent.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.focusEvent.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.onTouched();
    this.blurEvent.emit(event);
  }

  onKeyUp(event: KeyboardEvent): void {
    this.keyupEvent.emit(event);
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keydownEvent.emit(event);
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this._value = value || '';
    this.value = this._value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // Public methods for external access
  focusInput(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  blurInput(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.blur();
    }
  }

  selectText(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.select();
    }
  }
}