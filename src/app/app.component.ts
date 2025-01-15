import { Component, OnInit } from '@angular/core';
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
import { AsyncPipe, DatePipe } from '@angular/common';
import { map, Observable, timer } from 'rxjs';

const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabsComponent, NotificationComponent, DatePipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({ position: 'relative', overflow: 'hidden' }),
        query(
          ':enter, :leave',
          [
            baseStyles,
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
            baseStyles,
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
      transition('*=>secondary', [
        style({
           position: 'relative', 
          // overflow can't be hidden, otherwise only content of the box will sacle down, while the whole box is the same size during the animation
          //  overflow: 'hidden' 
          }),
        query(
          ':enter, :leave',
          [
            baseStyles,
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
                style({ opacity: 0, transform: 'scale(0.8)' })
              ),
            ],
            {
              optional: true,
            }
          ),
          query(
            ':enter',
            [
              style({ transform: 'scale(1.2)' }),
              animate(
                '250ms 120ms ease-out',
                style({ opacity: 1, transform: 'scale(1)' })
              ),
            ],
            {
              optional: true,
            }
          ),
        ]),
      ]),
      transition('secondary=>*', [
        style({
           position: 'relative', 
          // overflow can't be hidden, otherwise only content of the box will sacle down, while the whole box is the same size during the animation
          //  overflow: 'hidden' 
          }),
        query(
          ':enter, :leave',
          [
            baseStyles,
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
                style({ opacity: 0, transform: 'scale(1.25)' })
              ),
            ],
            {
              optional: true,
            }
          ),
          query(
            ':enter',
            [
              style({ transform: 'scale(0.8)' }),
              animate(
                '250ms 120ms ease-out',
                style({ opacity: 1, transform: 'scale(1)' })
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
export class AppComponent implements OnInit {

//   dateTime!:Date

// ngOnInit(): void {
//   timer(0,1000).subscribe(()=> this.dateTime = new Date())
// }


dateTime!: Observable<Date>

ngOnInit() {
  this.dateTime = timer(0,1000).pipe(map(()=> {return new Date()}))
}



  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab'];
      if (!tab) return 'secondary';
      return tab;
    }
  }
}
