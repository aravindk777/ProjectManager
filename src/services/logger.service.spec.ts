import { TestBed, inject } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('LoggerService', () => {
  let mockLoggerService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [LoggerService]
  }));

  mockLoggerService = jasmine.createSpyObj(['Log']);

  it('should be created', () => {
    const service: LoggerService = TestBed.get(LoggerService);
    expect(service).toBeTruthy();
  });

  it('Should log as LogInformation', inject([LoggerService], (svc: LoggerService) => {
    // arrange
    const spyObj = spyOn(svc, 'LogInformation');
    mockLoggerService.Log.and.returnValue(of(true));
    // act
    svc.LogInformation(null, 'test log', 'test method', 'test module');
    // assert
    expect(spyObj).toHaveBeenCalled();
  }));

  it('Should log as Error', inject([LoggerService], (svc: LoggerService) => {
    // arrange
    const spyObj = spyOn(svc, 'LogError');
    mockLoggerService.Log.and.returnValue(of(true));
    // act
    svc.LogError(null, 'test error log', 'test error details', 'test method', 'test module');
    // assert
    expect(spyObj).toHaveBeenCalled();
  }));

  it('Should log any info', inject([LoggerService], (svc: LoggerService) => {
    // arrange
    mockLoggerService.Log.and.returnValue(of(true));
    // act
    const actual = svc.Log(null, 3, 'test error log', 'test error details', 'test method', 'test module');
    // assert
    expect(actual).toBeTruthy();
  }));
});
