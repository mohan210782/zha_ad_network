/***
 * 
 * This guard file is for 2FA lohgin system
 */
import { Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class TfaAuthGuard extends AuthGuard('tfa') {
    // canActivate(
    //     context: ExecutionContext,
    //   ): boolean | Promise<boolean> | Observable<boolean> {
    //     return true;
    //   }
    
}