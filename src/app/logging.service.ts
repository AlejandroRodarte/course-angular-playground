// logging service
export class LoggingService {

    // logStatusChange() method
    logStatusChange(status: string): void {
        console.log('A server status changed, new status: ' + status);
    }

}