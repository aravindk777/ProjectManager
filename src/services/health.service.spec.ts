import { TestBed } from '@angular/core/testing';

import { HealthService } from './health.service';
import { HttpClientModule } from '@angular/common/http';

describe('HealthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [HealthService]
  }));

  it('should be created', () => {
    const service: HealthService = TestBed.get(HealthService);
    expect(service).toBeTruthy();
  });
});
