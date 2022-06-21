import { Component } from '@angular/core';
import { DataUtils } from '../../core/util/data-util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss', '../../../content/css/nicepage.css'],
})
export class CabinetComponent {
  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}
}
