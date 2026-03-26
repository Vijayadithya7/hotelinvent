import { InjectionToken } from "@angular/core";
import { Appconfig } from "./appconfig.interface";
import { environment } from "../environments/environments";

export const APP_SERVICE_CONFIG = new InjectionToken <Appconfig>('appconfig');

export const APP_CONFIG:Appconfig = {
    apiEndpoint: environment.apiEndpoint
}