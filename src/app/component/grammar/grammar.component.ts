import { Component, OnInit } from '@angular/core';
import { GrammarService } from 'src/app/service/grammar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.css']
})
export class GrammarComponent implements OnInit {

  public word: any;
  public request: String = this.route.snapshot.params.word;

  constructor(private grammarService: GrammarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getWord(this.request);
  }

  getWord(request: String) {
    this.grammarService.getWord(request).subscribe(
      data => {
        this.word = data;
        this.groupGrammar();
        this.word.grammarList.forEach(grammar => {
          if (grammar.part === "noun") {
            this.fillNounDeclension(grammar);
          } else if (grammar.part === "verb") {
            this.fillVerbConjugation(grammar);
          }
        });
      },

      err => {
        console.log(this.route.snapshot.params.word);
        console.log(this.request);
        console.log(err);
      },
      () => console.log("grammar for word " + request + " is loaded")
    );
  }

  groupGrammar() {
    console.log("before grouping");
    console.log(this.word.grammarList);
    this.word.grammarList.forEach(grammar => {
      grammar.singular = "";
      grammar.dual = "";
      grammar.plural = "";
      switch (grammar.number) {
        case "singular": {
          grammar.singular = grammar.caze;
          break;
        }
        case "dual": {
          grammar.dual = grammar.caze;
          break;
        }
        case "plural": {
          grammar.plural = grammar.caze;
          break;
        }
      }
    });

    let len = this.word.grammarList.length;
    for (let i = 0; i < len; i++) {
      if (this.word.grammarList[i].part === "noun") {
        for (let j = len - 1; i < j; j--) {
          if ((this.word.grammarList[i].baseword === this.word.grammarList[j].baseword) &&
            (this.word.grammarList[i].gender === this.word.grammarList[j].gender)) {

            switch (this.word.grammarList[j].number) {
              case "singular": {
                this.word.grammarList[i].singular = this.word.grammarList[j].singular
                  + (this.word.grammarList[i].singular === "" ? "" : "," + this.word.grammarList[i].singular);
                break;
              }
              case "dual": {
                this.word.grammarList[i].dual = this.word.grammarList[j].dual
                  + (this.word.grammarList[i].dual === "" ? "" : "," + this.word.grammarList[i].dual);
                break;
              }
              case "plural": {
                this.word.grammarList[i].plural = this.word.grammarList[j].plural
                  + (this.word.grammarList[i].plural === "" ? "" : "," + this.word.grammarList[i].plural);
                break;
              }
            }
            this.word.grammarList.splice(j, 1);
            len--;
          }
        }
      }
    }


    console.log("after grouping");
    console.log(this.word.grammarList);
  };

  fillVerbConjugation(grammar: any) {

    this.grammarService.getVerbConjugation(grammar).subscribe(
      data => {
        grammar.conjugationList = data;
        console.log(data);
      },
      err => { console.log(err); },
      () => {
        console.log("conjugation of " + grammar.baseword + "/" + grammar.clazz + "/"
          + grammar.tense + "/" + grammar.voice + " is loaded");
      }
    );
  }

  fillNounDeclension(grammar: any) {

    this.grammarService.getNounDeclension(grammar.baseword, grammar.gender).subscribe(
      data => {
        grammar.declension = data;
      },
      err => { console.log(err); },
      () => { console.log("declension of " + grammar.baseword + ", " + grammar.gender + " is loaded"); }
    );

  }



}
