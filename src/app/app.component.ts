import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public text: String = "";
  public result: String = "";
  public isTurkish: boolean = false;
  public filteredWords: String = "";
  private filterList: String[] = [];

  uppercaseall(){
    let result = "";
    let words = this.text.split(" ");
    words.forEach(word=>{
      if(this.isInFilter(word.replace(/\s{2,}/g,""))){
        result += word.trim()+" ";
      }else{
        if(this.isTurkish){
          result += word.toLocaleUpperCase("tr-TR").trim()+" ";
        }else{
          result += word.toUpperCase().trim()+" ";
        }
      }
    });
    this.result = result.slice(0, result.length-1);
  }

  lowercaseall(){
    let result = "";
    let words = this.text.split(" ");
    words.forEach(word=>{
      if(this.isInFilter(word.replace(/\s{2,}/g,""))){
        result += word.trim()+" ";
      }else{
        if(this.isTurkish){
          result += word.toLocaleLowerCase("tr-TR").trim()+" ";
        }else{
          result += word.toLowerCase().trim()+" ";
        }
      }
    });
    this.result = result.slice(0, result.length-1);
  }

  capitilizesentences(){
    let that = this;
    if(this.isTurkish){
      this.result = this.text.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
        if(that.isInFilter(txt)){
          return txt;
        }
        return txt.charAt(0).toLocaleUpperCase("tr-TR") + txt.substr(1).toLocaleLowerCase("tr-TR");
      });
    }else{
      this.result = this.text.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
        if(that.isInFilter(txt)){
          return txt;
        }
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  }

  capitilizewords(){
    let resultWords: string[] = [];
    let words = this.text.split(" ");
    words.forEach(word => {
      if(!this.isInFilter(word)){
        if(this.isTurkish){
          resultWords.push(word.charAt(0).toLocaleUpperCase("tr-TR")+word.substr(1).toLocaleLowerCase("tr-TR"));
        }else{
          resultWords.push(word.charAt(0).toUpperCase()+word.substr(1).toLowerCase());
        }
      }else{
        resultWords.push(word);
      }
    });
    this.result = this.wordListToSingleString(resultWords);
  }

  copyResult(resultArea){
    resultArea.select();
    document.execCommand('copy');
    resultArea.setSelectionRange(0, 0);
  }

  filterChanged(event: string){
    //clean filter
    this.filterList.splice(0);
    event.split(",").forEach(word=>{
      this.filterList.push(word.trim());
    });
  }

  public isInFilter(word: string){
    //if sentence
    word = word.split(" ")[0];
    for(var filter in this.filterList){
      if(this.filterList[filter].toLowerCase().localeCompare(word.toLowerCase())===0){
        return true;
      }
    }
    return false;
  }

  private wordListToSingleString(wordlist:string[]){
    let result = "";
    wordlist.forEach(word=>{
      result += word+" ";
    });
    return result.trim();
  }

}
