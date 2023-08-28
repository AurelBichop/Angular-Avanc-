import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Email } from './types';
import { Observable } from 'rxjs';
import { FAKE_EMAILS_DATA } from '../data';

export class EmailsResolver implements Resolve<Email[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Email[] | Observable<Email[]> | Promise<Email[]> {
    const type = route.paramMap.get('type');

    if (!type) {
      return (FAKE_EMAILS_DATA as Email[]).filter(
        (email) => email.status === 'INBOX'
      );
    }

    return (FAKE_EMAILS_DATA as Email[]).filter(
      (email) => email.status === type.toUpperCase()
    );
  }
}
