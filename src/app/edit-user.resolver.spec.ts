import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { editUserResolver } from './resolvers/edit-user.resolver';

describe('editUserResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => editUserResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
