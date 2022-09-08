import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-observables-vs-promises',
  templateUrl: './observables-vs-promises.component.html',
  styleUrls: ['./observables-vs-promises.component.scss']
})
export class ObservablesVsPromisesComponent implements OnInit, OnDestroy {

  intervalObservableSubscription!: Subscription;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const myPromise = new Promise(resolve => {
          // the below console log will be printed after this setTimeout is resolved, even if you have not called the then method on this promise because promises are EAGER i.e. promises fire their callback immediately & execute whatever is inside.
          // in this case the promise callback contains a setTimeout so it starts the timer immediately, but in most common real world use case promise will be used to make http calls so it will fire a api call
          console.log(`Promise is running`)

        setTimeout(() => {
            resolve(`Promise is resolved`)

            // A Promise can emit only one value & than its done so none of the below resolve()callbacks will be executed because we already resolved it once in the above line - its like adding something inside a function after the return statement
            resolve(`Promise is resolved 2`)
            resolve(`Promise is resolved 3`)
            resolve(`Promise is resolved 4`)
            resolve(`Promise is resolved 5`)

        } , 3000)
    })

    myPromise.then(response => console.log(response))
             .catch(err => console.error(err))




    const myObservable = new Observable(observer => {
        // As opposed to promises above this setTimeout callback wont be executed until we subscribe to this Observable, i.e. Observables are LAZY & only execute their callback & its content only after its subscribed to.
        console.log(`Observable is running`)
        observer.next('Observable has started running')

        setTimeout(() => {
          // Unlike with promise an Observable can fire any number of values so all four of this next() methods will be executed & all four values will be passed to the subscribers
          observer.next('Observable has fired First value of the stream !!')
          observer.next('Observable has fired Second value of the stream !!')
          observer.next('Observable has fired Third value of the stream !!')
          observer.next('Observable has fired Fourth value of the stream !!')

          // But an Observable can't emit any more values either once its completed or it errored out, so the fifth value below will never be fired
          // We should also remember that both error() & complete() events of an Observable are MUTUALLY EXCLUSIVE - i.e. once either an error() or complete() occurs that means the Observable is dead & will not give any more notfications whether its next(), error() or complete()

          observer.complete()
          observer.error('An Unfortunate & Unresolvable error Occured !!!')
          observer.next('Observable has fired FIFTH value of the stream !!')
        }, 5000)
    })

    // As already discussed above without this subscription the Observable will never fire/work becoz its LAZY
    myObservable
    .pipe(
      filter(value => value === 'Observable has fired Second value of the stream !!' || value === 'Observable has fired Third value of the stream !!')
    )
    .subscribe({
      next: (value) => console.log(value),
      complete: () => console.log(`myObservable is completed & has no more values to Emit`),
      error: (err) => console.error(err)
    })






    // Let's create another observable to UNDERSTAND the IMPORTANCE of UNSUBSCRIBING from a observable
    // why do we need to unsubscribe since every thing is working in the above `myObservable` without any unsubscription

    // we can understand that with this second observable - becoz this will never be completed & has very little chance of erroring out so it will keep on pushing values
    // Its even worse than it looks because even if you route out of the component the current observable will still be running & what's worse is when you navigate/roue back to this page another instance of this observable will be created parellel to the current one & now you are having 2 stream of unending values

    // Imagine a few or Few Hundred of this in a large application it will be a nightmare of memory leaks & performance bottlenecks
    const myIntervalObservable = new Observable((observer) => {
      console.log(`My interval Observable has been sunscribed to & it's running !!`)
      let counter = 0
      setInterval(() => {
          observer.next(++counter)
      }, 1000)
    })

    this.intervalObservableSubscription = myIntervalObservable.subscribe({
      next: (value) => console.log(`current counter value emitted is ${value}`)
    })



    // I am fetching data from resolve Guard here
    const dataFromResolveGuard = this.activatedRoute.snapshot.data['data']
    console.log(`Data supplied by the Resolve Guard attached to this Component is `, dataFromResolveGuard)

  }


    // While the above problem with lot of Unsubscribed Observables is very messy, the solution itself is also quite simple

    // Just store the subscription in a variable of type: Subscription
    // Than just call unsubscribe method on that variable - the most common place to do this unsubscription would be ngOnDestroy life cycle hook
  ngOnDestroy(): void {
    this.intervalObservableSubscription.unsubscribe()
  }


  // You can avoid this tedious work of subscribing & unsubcribing for every Observable in every component/service with the help of the `asyncPipe` by avoiding subscribing in the first place -
  // Angular itself will take care of subscription & unsubscription in this case i.e. when you are using asyncPipe
  // this leads to much more declarative style of coding that forms the basis of Angular
}
