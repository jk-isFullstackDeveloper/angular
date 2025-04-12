import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { allIcons } from 'angular-feather/icons';

import { routes } from './app.routes';
import { FeatherModule } from 'angular-feather';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  importProvidersFrom(FeatherModule.pick(allIcons)),]
};
