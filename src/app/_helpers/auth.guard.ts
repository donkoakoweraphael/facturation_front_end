import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const tokenService = new TokenService(router);

  let test = tokenService.isLogged();
  console.log(test);

  if (test) {
    return true;
  }

  return router.navigateByUrl('/login');
};
