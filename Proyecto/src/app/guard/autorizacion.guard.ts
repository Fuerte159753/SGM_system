import { state } from '@angular/animations';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const verifitecni: CanActivateFn = (route, state) => {
  return true;
};

export const verifiadmin: CanActivateFn = (route, state) =>{
  return true;
  
};