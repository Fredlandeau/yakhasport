import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'yakhasport la fabrik fumel';

  constructor(private metaTagService: Meta) {}

  ngOnInit(): void {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content:
          'yakhasport, la fabrik, fumel, salle de sport, sport, fitness, musculation, cardio, zumba, streching, circuit training, yoga, bike, méthode Holistique Orientée Pilates et Périnée',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Frédéric LANDEAU' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2021-04-08', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  }
}
