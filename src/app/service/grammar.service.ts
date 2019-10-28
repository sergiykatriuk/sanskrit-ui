import { Injectable } from '@angular/core';
import { HttpClient /* , HttpHeaders */ } from '@angular/common/http';

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };

@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  constructor(private httpClient: HttpClient) { }

  getWord(request: String) {
    return this.httpClient.get('/server/api/grammar/' + request);
  }

  getNounDeclension(word: String, gender: String) {
    return this.httpClient.get('/server/noun-declension/' + word + "/" + gender);
  }

  getVerbConjugation(grammar: any) {
    return this.httpClient.get("/server/verb-conjugation-deva/" + grammar.baseword + "/" + grammar.clazz
      + "/" + grammar.tense + "/" + grammar.voice);
  }



}
