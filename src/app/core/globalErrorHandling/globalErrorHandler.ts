import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    console.log(error);
    
    if (error instanceof TypeError) {
      //Example: You attempt to perform a mathematical operation on a string.

      console.error('Type error occurred:', error.message);
      this.notifyUser('Type error occurred. Please try again.');
    } else if (error instanceof ReferenceError) {
      //Example: Trying to call a method on undefined or accessing a non-existent property.

      console.error('Reference error occurred:', error.message);

      this.logToServer('Reference error occurred: ' + error.message);
    } else {
      console.error('An error occurred:', error);
      this.notifyUser('An unexpected error occurred. Please try again later.');
    }
  }

  private notifyUser(message: string): void {
    console.log('Notifying user:', message);
  }

  private logToServer(message: string): void {
    console.log('Logging error to server:', message);
  }
}
