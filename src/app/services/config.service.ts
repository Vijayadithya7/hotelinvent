import { Inject, Injectable } from '@angular/core';
import { RouteconfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteconfigToken) private configToken:RouteConfig) { 
    console.log('Config Service Initialized');
    console.log(this.configToken);
  }
}
