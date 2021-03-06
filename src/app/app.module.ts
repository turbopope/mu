import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GoalsPage } from '../pages/goals/goals';
import { FoodProvider } from '../providers/food/food';
import { UnitPipe } from '../pipes/unit/unit';

import { HttpClientModule } from '@angular/common/http';
import { GoalsProvider } from '../providers/goals/goals';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GoalsPage,
    UnitPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GoalsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FoodProvider,
    GoalsProvider,
  ]
})
export class AppModule {}
