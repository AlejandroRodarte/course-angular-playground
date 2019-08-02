// counter service
export class CounterService {

    // counters
    inactiveToActive: number = 0;
    activeToInactive: number = 0;

    // inactive to active
    incrementInactiveToActive() {
        this.inactiveToActive++;
    }

    // active to inactive
    incrementActiveToInactive() {
        this.activeToInactive++;
    }

}