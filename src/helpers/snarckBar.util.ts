import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export class SnackBarUtil {
  /* #region Propriedades Publicas */
  /** Definição posição horizontal da mensagem */
  public static horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  /** Definição posição vertical da mensagem */
  public static verticalPosition: MatSnackBarVerticalPosition = 'top';
  /** Propriedade responsavel por exibir a mensagem */
  public static snackBar: MatSnackBar;
  /* #ednregion */

  /* #region Metodos Publicos */

  /** Mensagem de erro */
  public static show(message: string) {
    this.snackBar.open(message, 'Fechar', {  
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  /* #ednregion */
}