import { TestBed, inject } from '@angular/core/testing';

import { HealthService } from './health.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('HealthService', () => {
  let mockHealthService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [HealthService]
  }));

  mockHealthService = jasmine.createSpyObj(['ServiceAvailable']);

  it('should be created', () => {
    const service: HealthService = TestBed.get(HealthService);
    expect(service).toBeTruthy();
  });

  it('Should check for service available method', inject([HealthService], (svc: HealthService) => {
    // arrange
    mockHealthService.ServiceAvailable.and.returnValue(of(true));
    // act
    const actual = svc.ServiceAvailable();
    // assert
    expect(actual).toBeTruthy();
  }));
});
