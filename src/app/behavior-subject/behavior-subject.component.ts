import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html',
  styleUrls: ['./behavior-subject.component.scss']
})
export class BehaviorSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void  {

    // // Subject - can never hold an initial value - you can see in the Subject() constructor below - it doesn't accept any args
    // // That means only those subscribers that are already subscribed at the time of the value being emitted(i.e. when subject.next() happens) & anything subscriptions after that won't receive any value
    // // i.e. subject is like a old school radio broadcast - which is only available, if you tune into the broadcast frequency in real Time when the broadcast is happening & no recordings or past episodes available
    // // so you won't get anything if you tune in after the broadcast is over, similarly you won't get any value for all the subscribers after Subject.next() where it emits a value
    // const subject = new Subject()

    // // subscription before subject.next()
    //   subject.subscribe(value => console.log(`subject's first subscription that happened before subject emits a value is `, value))

    //   subject.next(2000)

    // // subscription after subject.next() - this subscription is useless becoz the subject has already finished emitting its value by the time of this second subscription & subject doesn't hold any default or last value
    // subject.subscribe(value => console.log(`subject's second subscription that happens after subject emits a value is `, value))



    // BehaviorSubject can hold an Initial value & infact you cannot initialize a BehaviourSubject instance without an initial state
    // And it solves the main problem with subject subject NEITHER HOLDS a INITIAL value NOR a LAST EMITTED VALUE - i.e. only subscribers registered at the time of value emission by subject receives any value

    // But with behaviour subject there is always a value available for us - either the Initial value or the last emitted value
    const behaviorSubject = new BehaviorSubject('2022')

    behaviorSubject.subscribe(value => console.log(`BehaviourSubject first subscriber's value is `, value))

    console.log(`Curr Date is `, new Date())

    behaviorSubject.next(new Date().toDateString())

    behaviorSubject.subscribe(value => console.log(`BehaviourSubject second subscriber's value is `, value))

    // when this value is emitted this is secondChange i.e. the value changes for the second time (1. first initial value to firstChange value & now firstChange value to secondChange value)
    behaviorSubject.next(new Date().toDateString())

    behaviorSubject.subscribe(value => console.log(`BehaviourSubject third subscriber's value is `, value))


  }

}

