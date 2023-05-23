import { Directive, EventEmitter, HostListener, OnDestroy, Output } from "@angular/core";
import { Subject } from "rxjs";
import { buffer, debounceTime, filter, map } from "rxjs/operators";

@Directive({
  selector: "[doubleClick]"
})
export class DoubleClickDirective implements OnDestroy {
  /* #region Propriedades Privadas*/
  private click$ = new Subject<MouseEvent>();
  /* #ednregion */

  /* #region Output */
  @Output()
  doubleClick = new EventEmitter<MouseEvent>();
  /* #ednregion */

  /* #region HostListener*/
  @HostListener("click", ["$event"])
  onClick(event: MouseEvent | undefined) {
    this.click$.next(event);
  }
  /* #ednregion */

  /* #region Construtor */
  ngOnInit() {
    this.click$
      .pipe(
        buffer(this.click$.pipe(debounceTime(250))),
        filter(list => list.length === 2),
        map(list => list[1])
      )
      .subscribe(this.doubleClick);
  }

  ngOnDestroy() {
    this.click$.complete();
  }
  /* #ednregion */
}
