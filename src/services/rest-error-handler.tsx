import { Subject } from 'rxjs';

const restErrorSubject = new Subject<void>();
const authenticationErrorSubject = new Subject<void>();

export const restErrorHandler = {

    handleError: (status: string) => {
        if (status === '401') {
            authenticationErrorSubject.next();
        } else {
            restErrorSubject.next();
        }
    },

    getAuthenticationErrorAsObservable: () => authenticationErrorSubject.asObservable(),
    getRestErrorAsObservable: () => restErrorSubject.asObservable()

}