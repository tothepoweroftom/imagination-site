import ml5 from "ml5";

export default class LSTM {
  constructor() {
    this.runningInference = false;
    this.load();
  }

  load() {
    this.charRNN = ml5.charRNN("static/woolf/", this.modelReady);
  }

  modelReady() {
    console.log("Model Loaded");
  }

  // Generate new text
  generate(text, callback) {
    // prevent starting inference if we've already started another instance
    // TODO: is there better JS way of doing this?
    if (!this.runningInference) {
      this.runningInference = true;

      // Update the status log
      console.log("Generating...");

      // Grab the original text
      let original = text;
      // Make it to lower case
      let txt = text.toLowerCase();

      // Check if there's something to send
      if (txt.length > 0) {
        // This is what the LSTM generator needs
        // Seed text, temperature, length to outputs
        // TODO: What are the defaults?
        let data = {
          seed: txt,
          temperature: 0.5,
          length: 100
        };

        // Generate text with the charRNN
        this.charRNN.generate(data, callback);

        // When it's done
        function gotData(err, result) {
          // Update the status log
          console.log(result.sample);
          this.runningInference = false;
        }
      }
    }
  }
}
