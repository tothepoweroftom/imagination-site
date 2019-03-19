<template>
  <div class="hello">
    <div id="threejs-container"><canvas id="canvas"></canvas></div>

    <div id="question">{{ question }}</div>
  </div>
</template>

<script>
import SceneManager from "./js/SceneManager.js";
import Stats from "stats-js";
import Shake from "shake.js";
import ColorPalette from "./js/ColorPalette.js";
import Rita from "rita";
import RitaTextGenerator from './js/RitaTextGenerator.js'

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      sceneManager: null,
      stats: null,
      colorIndex: 0,
      question: null,
      articleIndex: 0,
      articles: null,
      lstm: null,
      textGen: null,
    };
  },

  methods: {
    render: function() {
      // this.stats.begin();
      requestAnimationFrame(this.render);
      // this.sceneManager.update();
      // this.stats.end();
    },

    setupLonghold: function() {
      let body = document.body;
      // Create variable for setTimeout
      var delay;

      // Set number of milliseconds for longpress
      body.addEventListener(
        "mousedown",
        e => {
          var _this = this;
          delay = setTimeout(check, 1000);

          function check() {
            document.getElementById("canvas").style.backgroundColor =
              ColorPalette.colors[
                _this.colorIndex % ColorPalette.colors.length
              ];
            _this.colorIndex += 1;

            _this.articleIndex += 1;
            _this.getNextNews();
          }
        },
        true
      );

      body.addEventListener("mouseup", function(e) {
        // On mouse up, we know it is no longer a longpress
        clearTimeout(delay);
      });

      body.addEventListener("mouseout", function(e) {
        clearTimeout(delay);
      });
    },

    setupShake: function() {
      var myShakeEvent = new Shake({
        threshold: 10, // optional shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
      });

      myShakeEvent.start();

      window.addEventListener(
        "shake",
        () => {
          //put your own code here etc.
          // alert("shake!");
          document.getElementById("canvas").style.backgroundColor =
            ColorPalette.colors[this.colorIndex % ColorPalette.colors.length];
          this.colorIndex += 1;

          this.articleIndex += 1;
          this.getNextNews();
        },
        false
      );
    },
    getTrendingNews: function() {
      var url =
        "https://newsapi.org/v2/top-headlines?" +
        "country=us&" +
        "apiKey=9097f737932c4681bd54a2ed6a71dbf1";
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          if (this.articleIndex >= myJson.articles.length) {
            this.articleIndex = 0;
          }
          this.articles = myJson.articles;

        });
    },

    getNextNews: function() {
      if (this.articles != null) {
        if (this.articleIndex >= this.articles.length) {
          this.articleIndex = 0;
        }

        this.sceneManager.news();
        let topArticle = this.articles[this.articleIndex].title;
        let split = Rita.tokenize(topArticle);
        let tags = Rita.getPosTags(topArticle);
        let nouns = [];
        tags.forEach((element, index) => {
          // console.log(element);
          if (element.includes("nn")) {
            nouns.push(split[index]);
          }
        });

        console.log(nouns);
        this.question = "";
        // this.lstm.generate(this.question)

        if (nouns.length > 1) {
          this.question = `${nouns[0]} ${nouns[1]}`;
        } else {
          this.question = ` ${nouns[0]}`;
        }
        this.question = this.textGen.generate(this.question);
      }
    }, 
  },

  mounted() {
    var canvas = document.getElementById("canvas");
    // this.sceneManager = new SceneManager(canvas);

    this.render();
    this.setupShake();
    this.setupLonghold();
    // this.getTrendingNews();
    this.textGen = new RitaTextGenerator();

    
    this.getTrendingNews();
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#threejs-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
  // background: red;
}

#question {
  width: 80%;
  height: 80%;
  left: 10%;
  top: 10%;
  position: absolute;
  background: rgba(0, 0, 0, 0);
  color: white;
  font-size: 40px;
}
</style>
