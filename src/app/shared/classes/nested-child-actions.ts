import {signal} from '@angular/core';


export abstract class NestedChildActions {

  value = signal<any>(null);
  isValid = signal<boolean>(true);

  onValidChange(val: boolean) {
    this.isValid.set(val);
  }

  onStateChange(data: { key: string; value: any }) {
    this.value.set(data.value);
  }

}
