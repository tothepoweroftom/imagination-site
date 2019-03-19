import rita from "rita";
import adlib from './Adlib'
export default class LSTM {
  constructor() {
    this.runningInference = false;

    this.load();
  }

  load() {
    this.text = adlib.text;
    this.markov = new rita.RiMarkov(4);

    this.markov.loadText(this.text);
  }

  modelReady() {}

  // Generate new text
  generate(seed) {
    if (!this.markov.ready()) return;

    let lines = this.markov.generateSentences(1);
    let ret = this.formQuestion(seed, lines[0]);
    return ret;


  }

  formQuestion(seed, result) {


    let split = rita.tokenize(result);
    let tags = rita.getPosTags(result);
    let nouns = [];
    let verbs = [];
    let adj = []

    tags.forEach((element, index) => {
      if (element.includes("nn")) {
        if (split[index].length > 4) {

          nouns.push(split[index]);
        }
      }
      if (element.includes("vb")) {
        if (split[index].length > 4) {
          verbs.push(split[index]);

        }
      }
      if (element.includes("jj") || element.includes("rb")) {
        if (split[index].length > 4) {
          adj.push(split[index]);

        }
      }

    });


    let verb = verbs[0] ? verbs[0] : ' '
    let noun = nouns[0] ? nouns[0] : ' '
    let adverb = adj[0] ? adj[0] : ' a '

    return "What if " + seed + ` could be ${adverb} ${verb} ${noun} ?`;


  }

}
