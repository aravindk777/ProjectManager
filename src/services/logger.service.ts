import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'src/Model/common/logger';

const HEADERS = new HttpHeaders({'Content-type': 'application/json'});
const logRoute = environment.ApiBaseUrl + '/Logs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private http: HttpClient) { }

  LogInformation(logInfo?: Logger, logmessage?: string, method = '', modulename = ''): void {
    if ( logInfo === null) {
      logInfo = new Logger();
      logInfo.AppName = 'ProjectManagerAngularApp';
      logInfo.Module = modulename;
      logInfo.Method = method;
      logInfo.LogType = 2;
      logInfo.Message = logmessage;
    // this.Log(logInfo, 2, logmessage, null, method, modulename);
    }
    this.Log(logInfo);
  }

  LogError(loggerObject?: Logger, errorMessage?: string, errorDetails?: any, method = '', modulename = ''): void {
    this.Log(loggerObject, 4, errorMessage, errorDetails, method, modulename);
  }

  Log(logInfo?: Logger, logType?: number, message?: string, errInfo?: any, method = '', module = ''): Observable<boolean> {
    let messageBody: Logger = {LogType: logType, AppName: 'ProjectManagerAngularApp',
    Module: module, Method: method, Message: message,
    ErrorDetails: errInfo !== null ? JSON.stringify(errInfo) : null};

    if (logInfo !== null && logInfo !== undefined) {
      messageBody = logInfo;
    }

    console.log('Logging [' + JSON.stringify(messageBody) + '] to url:[' + logRoute + ']');

    return this.http.post<boolean>(logRoute, messageBody, {headers: HEADERS})
    .pipe(
      tap(result => console.log('result of logging: ' + result))
    );
  }
}
