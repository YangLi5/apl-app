import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.page.html',
  styleUrls: ['./temp.page.scss'],
})
export class TempPage implements OnInit {

	public form = [
		{ val: 'Tape measure', isChecked: false },
		{ val: 'DBH tape (optional)', isChecked: false },
		{ val: 'Envelope for collecting leaves (optional)', isChecked: false },
		{ val: 'Permission to be on the land where the tree is located', isChecked: false },
	];

  constructor() { }

  ngOnInit() {
  }

}
