import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const stepTransitions = [
  trigger('stepState', [
    state('pending', style({
      transform: 'scale(1)',
      opacity: 1
    })),
    state('active', style({
      transform: 'scale(1.1)',
      opacity: 1
    })),
    state('completed', style({
      transform: 'scale(1)',
      opacity: 1
    })),
    state('error', style({
      transform: 'scale(1)',
      opacity: 1
    })),
    state('disabled', style({
      transform: 'scale(1)',
      opacity: 0.5
    })),
    transition('* => active', [
      animate('0.3s ease-out')
    ]),
    transition('active => completed', [
      animate('0.2s ease-in')
    ]),
    transition('* => error', [
      animate('0.2s ease-out')
    ])
  ]),
  
  trigger('progressLine', [
    state('incomplete', style({
      width: '0%'
    })),
    state('partial', style({
      width: '50%'
    })),
    state('complete', style({
      width: '100%'
    })),
    transition('incomplete => partial', [
      animate('0.5s ease-out')
    ]),
    transition('partial => complete', [
      animate('0.5s ease-out')
    ]),
    transition('complete => incomplete', [
      animate('0.3s ease-in')
    ])
  ]),

  trigger('iconAnimation', [
    transition(':enter', [
      style({ transform: 'scale(0)', opacity: 0 }),
      animate('0.6s ease', keyframes([
        style({ transform: 'scale(0)', opacity: 0, offset: 0 }),
        style({ transform: 'scale(1.2)', opacity: 1, offset: 0.5 }),
        style({ transform: 'scale(1)', opacity: 1, offset: 1 })
      ]))
    ]),
    transition(':leave', [
      animate('0.2s ease-out', style({ transform: 'scale(0)', opacity: 0 }))
    ])
  ]),

  trigger('stepContent', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('0.2s ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
    ])
  ])
];