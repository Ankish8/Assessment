import { Injectable, TemplateRef, ComponentRef, ViewContainerRef, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Subject, Observable } from 'rxjs';
import { ModalComponent, ModalConfig, ModalSize, ModalPosition, ModalVariant } from './modal.component';

export interface ModalRef<T = any> {
  instance: ModalComponent;
  componentInstance?: T;
  overlayRef: OverlayRef;
  afterClosed: Observable<any>;
  afterOpened: Observable<void>;
  close: (result?: any) => void;
  updateConfig: (config: Partial<ModalConfig>) => void;
  updateSize: (size: ModalSize) => void;
  updatePosition: (position: ModalPosition) => void;
}

export interface ModalData {
  [key: string]: any;
}

export interface ModalOptions extends Partial<ModalConfig> {
  data?: ModalData;
  viewContainerRef?: ViewContainerRef;
  injector?: Injector;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _openModalRefs: ModalRef[] = [];
  private _globalConfig: Partial<ModalConfig> = {
    size: 'base',
    position: 'center',
    variant: 'default',
    closeOnBackdropClick: true,
    closeOnEscape: true,
    disableClose: false,
    hasBackdrop: true,
    animationEnabled: true,
    animationDuration: 300,
    autoFocus: true,
    restoreFocus: true
  };

  constructor(private overlay: Overlay) {}

  /**
   * Opens a modal with a component
   */
  open<T = any, R = any>(
    component: any,
    options?: ModalOptions
  ): ModalRef<T> {
    const config = { ...this._globalConfig, ...options };
    const overlayRef = this.createOverlay(config);
    const modalRef = this.createModalRef<T, R>(overlayRef, config);
    
    // Create component portal
    const componentPortal = new ComponentPortal(
      component,
      options?.viewContainerRef,
      options?.injector
    );
    
    // Attach component to modal
    const componentRef = overlayRef.attach(componentPortal);
    modalRef.componentInstance = componentRef.instance;
    
    // Pass data to component if provided
    if (options?.data) {
      Object.assign(componentRef.instance, options.data);
    }
    
    // Setup modal lifecycle
    this.setupModalLifecycle(modalRef);
    
    // Track open modal
    this._openModalRefs.push(modalRef);
    
    return modalRef;
  }

  /**
   * Opens a modal with a template
   */
  openTemplate<R = any>(
    template: TemplateRef<any>,
    options?: ModalOptions
  ): ModalRef<any> {
    const config = { ...this._globalConfig, ...options };
    const overlayRef = this.createOverlay(config);
    const modalRef = this.createModalRef<any, R>(overlayRef, config);
    
    // Create template portal
    const templatePortal = new TemplatePortal(
      template,
      options?.viewContainerRef || null,
      options?.data
    );
    
    // Attach template to modal
    overlayRef.attach(templatePortal);
    
    // Setup modal lifecycle
    this.setupModalLifecycle(modalRef);
    
    // Track open modal
    this._openModalRefs.push(modalRef);
    
    return modalRef;
  }

  /**
   * Opens a confirmation modal
   */
  openConfirm(options: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: ModalVariant;
    size?: ModalSize;
  } & ModalOptions): ModalRef<any> {
    const config = {
      ...this._globalConfig,
      ...options,
      variant: options.variant || 'default',
      size: options.size || 'sm'
    };
    
    const overlayRef = this.createOverlay(config);
    const modalRef = this.createModalRef(overlayRef, config);
    
    // Create confirmation component (you would create this separately)
    // For now, we'll use a simple template approach
    const confirmationData = {
      title: options.title || 'Confirm Action',
      message: options.message || 'Are you sure you want to proceed?',
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
      onConfirm: () => modalRef.close(true),
      onCancel: () => modalRef.close(false)
    };
    
    // You would typically create a ConfirmationComponent here
    // For this implementation, we'll simulate it
    modalRef.componentInstance = confirmationData;
    
    // Setup modal lifecycle
    this.setupModalLifecycle(modalRef);
    
    // Track open modal
    this._openModalRefs.push(modalRef);
    
    return modalRef;
  }

  /**
   * Opens an alert modal
   */
  openAlert(options: {
    title?: string;
    message?: string;
    buttonText?: string;
    variant?: ModalVariant;
    size?: ModalSize;
  } & ModalOptions): ModalRef<any> {
    const config = {
      ...this._globalConfig,
      ...options,
      variant: options.variant || 'default',
      size: options.size || 'sm',
      closeOnBackdropClick: false,
      closeOnEscape: false
    };
    
    const overlayRef = this.createOverlay(config);
    const modalRef = this.createModalRef(overlayRef, config);
    
    // Create alert data
    const alertData = {
      title: options.title || 'Alert',
      message: options.message || 'This is an alert message.',
      buttonText: options.buttonText || 'OK',
      onClose: () => modalRef.close(true)
    };
    
    modalRef.componentInstance = alertData;
    
    // Setup modal lifecycle
    this.setupModalLifecycle(modalRef);
    
    // Track open modal
    this._openModalRefs.push(modalRef);
    
    return modalRef;
  }

  /**
   * Closes all open modals
   */
  closeAll(): void {
    this._openModalRefs.forEach(modalRef => {
      modalRef.close();
    });
  }

  /**
   * Gets all open modal references
   */
  getOpenModals(): ModalRef[] {
    return [...this._openModalRefs];
  }

  /**
   * Checks if any modal is currently open
   */
  hasOpenModals(): boolean {
    return this._openModalRefs.length > 0;
  }

  /**
   * Sets global configuration for all modals
   */
  setGlobalConfig(config: Partial<ModalConfig>): void {
    this._globalConfig = { ...this._globalConfig, ...config };
  }

  /**
   * Gets the current global configuration
   */
  getGlobalConfig(): Partial<ModalConfig> {
    return { ...this._globalConfig };
  }

  private createOverlay(config: Partial<ModalConfig>): OverlayRef {
    const overlayConfig = {
      hasBackdrop: config.hasBackdrop !== false,
      backdropClass: ['modal-backdrop', config.backdropClass].filter(Boolean),
      panelClass: ['modal-overlay-panel', config.panelClass].filter(Boolean),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global()
    };

    // Configure position strategy
    switch (config.position) {
      case 'top':
        overlayConfig.positionStrategy.top('5%').centerHorizontally();
        break;
      case 'bottom':
        overlayConfig.positionStrategy.bottom('5%').centerHorizontally();
        break;
      default:
        overlayConfig.positionStrategy.centerHorizontally().centerVertically();
        break;
    }

    return this.overlay.create(overlayConfig);
  }

  private createModalRef<T, R>(
    overlayRef: OverlayRef,
    config: Partial<ModalConfig>
  ): ModalRef<T> {
    const afterClosed = new Subject<R>();
    const afterOpened = new Subject<void>();

    const modalRef: ModalRef<T> = {
      instance: null as any, // Will be set after component creation
      overlayRef,
      afterClosed: afterClosed.asObservable(),
      afterOpened: afterOpened.asObservable(),
      close: (result?: R) => {
        this.closeModal(modalRef, result);
      },
      updateConfig: (newConfig: Partial<ModalConfig>) => {
        if (modalRef.instance) {
          modalRef.instance.updateConfig(newConfig);
        }
      },
      updateSize: (size: ModalSize) => {
        if (modalRef.instance) {
          modalRef.instance.size = size;
        }
      },
      updatePosition: (position: ModalPosition) => {
        if (modalRef.instance) {
          modalRef.instance.position = position;
        }
      }
    };

    return modalRef;
  }

  private setupModalLifecycle<T>(modalRef: ModalRef<T>): void {
    // Handle backdrop clicks
    if (modalRef.overlayRef.backdropClick) {
      modalRef.overlayRef.backdropClick().subscribe(() => {
        if (modalRef.instance && modalRef.instance.closeOnBackdropClick) {
          modalRef.close();
        }
      });
    }

    // Handle escape key
    if (modalRef.overlayRef.keydownEvents) {
      modalRef.overlayRef.keydownEvents().subscribe(event => {
        if (event.keyCode === 27 && modalRef.instance && modalRef.instance.closeOnEscape) {
          modalRef.close();
        }
      });
    }

    // Emit opened event
    setTimeout(() => {
      (modalRef.afterOpened as Subject<void>).next();
    });
  }

  private closeModal<T>(modalRef: ModalRef<T>, result?: any): void {
    // Remove from open modals list
    const index = this._openModalRefs.indexOf(modalRef);
    if (index > -1) {
      this._openModalRefs.splice(index, 1);
    }

    // Emit closed event
    (modalRef.afterClosed as Subject<any>).next(result);
    (modalRef.afterClosed as Subject<any>).complete();

    // Dispose overlay
    if (modalRef.overlayRef) {
      modalRef.overlayRef.dispose();
    }
  }
}