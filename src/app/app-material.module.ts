import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
             MatButtonModule,
             MatToolbarModule,
             MatCardModule,
             MatDividerModule,
             MatSidenavModule,
             MatIconModule,
             MatTabsModule,
             MatFormFieldModule,
             MatInputModule,
             MatRadioModule,
             MatCheckboxModule,
             MatProgressBarModule,
             MatProgressSpinnerModule,
             MatDialogModule,
             MatMenuModule,
             MatListModule,
             MatSelectModule
           ],
  exports: [
            MatButtonModule,
            MatToolbarModule,
            MatCardModule,
            MatDividerModule,
            MatSidenavModule,
            MatIconModule,
            MatTabsModule,
            MatFormFieldModule,
            MatRadioModule,
            MatInputModule,
            MatCheckboxModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            MatDialogModule,
            MatMenuModule,
            MatListModule,
            MatSelectModule
            ]
})

export class AppMaterialModule {}
