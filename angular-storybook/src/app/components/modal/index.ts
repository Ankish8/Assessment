// Modal Component Exports
export { ModalComponent } from './modal.component';
export { ModalService } from './modal.service';
export { modalAnimations } from './modal.animations';

// Types and Interfaces
export type {
  ModalSize,
  ModalPosition,
  ModalVariant,
  ModalConfig,
  ModalComponentProps,
  ModalComponentEvents
} from './modal.component';

export type {
  ModalRef,
  ModalData,
  ModalOptions
} from './modal.service';

// Re-export for convenience
export { Overlay, OverlayModule } from '@angular/cdk/overlay';
export { Portal, PortalModule } from '@angular/cdk/portal';
export { A11yModule } from '@angular/cdk/a11y';