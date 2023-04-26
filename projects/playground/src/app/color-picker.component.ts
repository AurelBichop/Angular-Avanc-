import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  template: `
    <label>{{ label }}</label>
    <ul>
      <li
        (click)="setColor('blue')"
        [class.selected]="color === 'blue'"
        [style.backgroundColor]="'blue'"
      ></li>
      <li
        (click)="setColor('red')"
        [class.selected]="color === 'red'"
        [style.backgroundColor]="'red'"
      ></li>
      <li
        (click)="setColor('purple')"
        [class.selected]="color === 'purple'"
        [style.backgroundColor]="'purple'"
      ></li>
    </ul>
  `,
  styles: [
    `
      ul {
        display: flex;
        gap: 1em;
        padding: 0px;
        list-style-type: none;
      }

      li.selected {
        border: 5px solid rgba(255, 255, 255, 0.5);
      }

      li {
        border-radius: 5px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        background-color: red;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorPickerComponent,
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  onChange: (_: any) => void = (_: any) => {};
  onTouch: () => void = () => {};

  setColor(color: 'blue' | 'red' | 'purple') {
    this.color = color;
    this.onChange(this.color);
    this.onTouch();
  }

  @Input()
  color: 'blue' | 'red' | 'purple' = 'blue';

  ngOnInit(): void {}

  writeValue(color: 'blue' | 'red' | 'purple'): void {
    this.color = color;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  @Input()
  label = 'Selectionnez une couleur';
}
