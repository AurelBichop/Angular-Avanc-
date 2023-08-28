import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export class TitleResolver implements Resolve<string> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): string | Observable<string> | Promise<string> {
    const type = route.paramMap.get('type');

    if (!type) {
      return 'Boite de reception';
    }

    return type == 'sent' ? 'Emails envoyés' : 'Corbeille';
  }
}
