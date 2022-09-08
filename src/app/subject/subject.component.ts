import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {ajax} from 'rxjs/ajax'

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Observables ar Unicast
    const observableOne = new Observable(observer => observer.next(Math.random()))


    // when we say observables are Unicast !! What does that mean ??
    // it means the relationship between an observable instance & its subscriber/observer is ONe to ONe
    // that is every subscriber of a single Observable will get a different instance of that Observable i.e. for every subscription a new instance of the Observable will be created & the callback we pass to the Observable will be executed with a new Execution context for every instance

    observableOne.subscribe({next: (value) => console.log(`First subscriber to 'observableOne receives ' ${value}`)})

    observableOne.subscribe({next: (value) => console.log(`Second subscriber to 'observableOne receives ' ${value}`)})

    // Apart from the memory it may use & the processing time, this is especially bad if you are making Network/Api calls inside these observables - for every subscription a new call will be made to the server & in a large complex application this may become a nightmare with hundreds of subscriber - if they all consume the same data from the server anyway
    // Sometimes you may want this behaviour of every subscriber getting a new Instance of the same Observable & a differnt stream of values but in many other instances you may not want this behaviour


    // That is where Subjects come in - its part of RxJS just like Observables
    // Its similar to a Observable in that a Subject also emits a Stream Of Values Over time BUT it has a Multicasting architecture
    // Multicasting basically means all the subscriptions to a Subject share a `Single Execution Context` i.e. once you call next method to pass the data to the subscribers the same data is passed to all the subscribers i.e. its one source to many receivers like a Radio Broadcast or more specifically like a normal EventEmiiter


    // Subject don't have a callback function as an argument
    const subjectOne = new Subject()

    // // subjectOne.next(Math.random()) // you should always call next method after the subscription - so this line won't work

    // 2 subscriptions to the above subject
    subjectOne.subscribe({next: (value) => console.log(`First subscriber to 'subjectOne receives ' ${value}`)})
    subjectOne.subscribe({next: (value) => console.log(`Second subscriber to 'subjectOne receives ' ${value}`)})

    // If you want emit values from a Subject you need to chain/call next method on the subject definition as shown below
    subjectOne.next(Math.random())




    // Second a more realistic example to show the benefit of Subject over Observable in some cases

    // ajax is an rxjs operator that Perform an HTTP GET using the XMLHttpRequest in global scope. It returns your response in an Observable wrapper
    const usersData = ajax('https://jsonplaceholder.typicode.com/users')

    // // here we have two seperate subscriptions to the same data from usersData Observable.
    // // We may receive the same data here for both subscribtion below but if you inspect the Network Tab you will see two seperate http calls being made here to the same api endpoint to receive the same exact data
    // usersData.subscribe(data => console.log(`Users data from first subscriber `, data.response))
    // usersData.subscribe(data => console.log(`Users data from second subscriber `, data.response))



    // You don't want this behaviour especially in large real world apps where you can end up making 10/20/50 calls from each individual subscription instead of making one http call receiving the data & transmitting/broadcasting the same  to every subscriber via SUBJECT

    // lets do that - but One thing to note - here I am gonna use the SUBJECt as a DATA CONSUMER unlike our previous example where we used the Subscribe as the source of data

    const subjectTwo = new Subject()

    subjectTwo.subscribe(data => console.log(`Users data from first subscriber `, data))
    subjectTwo.subscribe(data => console.log(`Users data from second subscriber `, data))

    // as discussed lets use subject as a Data Consumer, instead of calling next('data') on the subject & making it a data source here we are passing the subject to the subscription of an Observable (in this case usersData) which converts that Observable into a SUBJECT Internally

    // the first two steps of 1. Creating a Subject && 2. subscribing to the subjects are same as the first subject example but the third step sis different as shown in the next expression
    const result = usersData.subscribe(subjectTwo)
  }

}
