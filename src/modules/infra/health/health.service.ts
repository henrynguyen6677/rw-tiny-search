import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  health(){
    return 'ok';
  }
}
