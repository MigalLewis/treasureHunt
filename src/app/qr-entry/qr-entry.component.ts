import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-qr-entry',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './qr-entry.component.html',
  styleUrl: './qr-entry.component.scss'
})
export class QrEntryComponent {
  entryCode: string;

  constructor(private route: ActivatedRoute) {
    this.entryCode = this.route.snapshot.paramMap.get('code') ?? '';
  }
}
