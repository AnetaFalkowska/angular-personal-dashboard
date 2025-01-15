import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabsComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({ position: 'relative', overflow: 'hidden' }),
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({ opacity: 0, transform: 'translateX(-40px)' })
              ),
            ],
            {
              optional: true,
            }
          ),
          query(
            ':enter',
            [
              style({ transform: 'translateX(40px)' }),
              animate(
                '250ms 120ms ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ],
            {
              optional: true,
            }
          ),
        ]),
      ]),
      transition(':decrement', [
        style({ position: 'relative', overflow: 'hidden' }),
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({ opacity: 0, transform: 'translateX(40px)' })
              ),
            ],
            {
              optional: true,
            }
          ),
          query(
            ':enter',
            [
              style({ transform: 'translateX(-40px)' }),
              animate(
                '250ms 120ms ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ],
            {
              optional: true,
            }
          ),
        ]),
      ]),
    ]),
  ],
  // animations: [
  //   trigger('routeAnim', [
  //     transition('*=>*', [
  //       query(':enter', [
  //         style({ background: 'wheat', display: 'block', height:'100%' }),
  //         animate(1000, style({ background: 'transparent' })),
  //       ], { optional: true }),
  //       style({ background: 'blue' }),
  //       animate(1000),
  //     ]),
  //   ]),
  // ],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab']
      if (!tab) return "secondary";
      return tab
    }
  }
}
