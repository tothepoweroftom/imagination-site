webpackJsonp([1],{0:function(e,t){},1:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view")],1),this._v(" "),t("script",{attrs:{type:"x-shader/x-vertex",id:"vertexShader"}},[this._v('\n    //\n    // GLSL textureless classic 3D noise "cnoise",\n    // with an RSL-style periodic variant "pnoise".\n    // Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n    // Version: 2011-10-11\n    //\n    // Many thanks to Ian McEwan of Ashima Arts for the\n    // ideas for permutation and gradient selection.\n    //\n    // Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n    // Distributed under the MIT license. See LICENSE file.\n    // https://github.com/ashima/webgl-noise\n    //\n    vec3 mod289(vec3 x)\n    {\n      return x - floor(x * (1.0 / 289.0)) * 289.0;\n    }\n    vec4 mod289(vec4 x)\n    {\n      return x - floor(x * (1.0 / 289.0)) * 289.0;\n    }\n    vec4 permute(vec4 x)\n    {\n      return mod289(((x*34.0)+1.0)*x);\n    }\n    vec4 taylorInvSqrt(vec4 r)\n    {\n      return 1.79284291400159 - 0.85373472095314 * r;\n    }\n    vec3 fade(vec3 t) {\n      return t*t*t*(t*(t*6.0-15.0)+10.0);\n    }\n    // Classic Perlin noise\n    float cnoise(vec3 P)\n    {\n      vec3 Pi0 = floor(P); // Integer part for indexing\n      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n      Pi0 = mod289(Pi0);\n      Pi1 = mod289(Pi1);\n      vec3 Pf0 = fract(P); // Fractional part for interpolation\n      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n      vec4 iy = vec4(Pi0.yy, Pi1.yy);\n      vec4 iz0 = Pi0.zzzz;\n      vec4 iz1 = Pi1.zzzz;\n      vec4 ixy = permute(permute(ix) + iy);\n      vec4 ixy0 = permute(ixy + iz0);\n      vec4 ixy1 = permute(ixy + iz1);\n      vec4 gx0 = ixy0 * (1.0 / 7.0);\n      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n      gx0 = fract(gx0);\n      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n      vec4 sz0 = step(gz0, vec4(0.0));\n      gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n      gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n      vec4 gx1 = ixy1 * (1.0 / 7.0);\n      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n      gx1 = fract(gx1);\n      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n      vec4 sz1 = step(gz1, vec4(0.0));\n      gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n      gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n      g000 *= norm0.x;\n      g010 *= norm0.y;\n      g100 *= norm0.z;\n      g110 *= norm0.w;\n      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n      g001 *= norm1.x;\n      g011 *= norm1.y;\n      g101 *= norm1.z;\n      g111 *= norm1.w;\n      float n000 = dot(g000, Pf0);\n      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n      float n111 = dot(g111, Pf1);\n      vec3 fade_xyz = fade(Pf0);\n      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n      return 2.2 * n_xyz;\n    }\n    // Classic Perlin noise, periodic variant\n    float pnoise(vec3 P, vec3 rep)\n    {\n      vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n      vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n      Pi0 = mod289(Pi0);\n      Pi1 = mod289(Pi1);\n      vec3 Pf0 = fract(P); // Fractional part for interpolation\n      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n      vec4 iy = vec4(Pi0.yy, Pi1.yy);\n      vec4 iz0 = Pi0.zzzz;\n      vec4 iz1 = Pi1.zzzz;\n      vec4 ixy = permute(permute(ix) + iy);\n      vec4 ixy0 = permute(ixy + iz0);\n      vec4 ixy1 = permute(ixy + iz1);\n      vec4 gx0 = ixy0 * (1.0 / 7.0);\n      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n      gx0 = fract(gx0);\n      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n      vec4 sz0 = step(gz0, vec4(0.0));\n      gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n      gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n      vec4 gx1 = ixy1 * (1.0 / 7.0);\n      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n      gx1 = fract(gx1);\n      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n      vec4 sz1 = step(gz1, vec4(0.0));\n      gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n      gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n      g000 *= norm0.x;\n      g010 *= norm0.y;\n      g100 *= norm0.z;\n      g110 *= norm0.w;\n      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n      g001 *= norm1.x;\n      g011 *= norm1.y;\n      g101 *= norm1.z;\n      g111 *= norm1.w;\n      float n000 = dot(g000, Pf0);\n      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n      float n111 = dot(g111, Pf1);\n      vec3 fade_xyz = fade(Pf0);\n      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n      return 2.2 * n_xyz;\n    }\n    \tfloat stripes( float x, float f) {\n    \t\tfloat PI = 3.14159265358979323846264;\n    \t\tfloat t = .5 + .5 * sin( f * 2.0 * PI * x);\n    \t\treturn t * t - .5;\n    \t}\n    \tfloat turbulence( vec3 p ) {\n    \t\tfloat w = 100.0;\n    \t\tfloat t = -.5;\n    \t\tfor (float f = 1.0 ; f <= 10.0 ; f++ ){\n    \t\t\tfloat power = pow( 2.0, f );\n    \t\t\tt += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );\n    \t\t}\n    \t\treturn t;\n    \t}\n    \tfloat f( vec3 p ) {\n    \t\treturn pnoise( vec3( p ), vec3( 10.0, 10.0, 10.0 ) );\n    \t\treturn pnoise( 8.0 * vec3( p ), vec3( 10.0, 10.0, 10.0 ) );\n    \t}\n    \tvarying vec3 vNormal;\n    \tvarying vec3 vReflect;\n    \tvarying float ao;\n    \tuniform float time;\n    \tuniform float weight;\n    \tfloat fround( float value ) {\n    \t\treturn floor( value + 0.5 );\n    \t}\n    \tvec3 v3round( vec3 value ) {\n    \t\treturn vec3( fround( value.x ), fround( value.y ), fround( value.z ) );\n    \t}\n    \tvoid main() {\n    \t\tvec3 evNormal = normal;\n    \t\tvec3 aniNormal = 2.0 * evNormal + time;\n    \t\tfloat f0 = weight * f( aniNormal );\n    \t\tfloat fx = weight * f( aniNormal + vec3( .0001, 0.0, 0.0 ) );\n    \t\tfloat fy = weight * f( aniNormal + vec3( 0.0, .0001, 0.0 ) );\n    \t\tfloat fz = weight * f( aniNormal + vec3( 0.0, 0.0, .0001 ) );\n    \t\tvec3 modifiedNormal = normalize( evNormal - vec3( (fx - f0) / .0001, (fy - f0) / .0001, (fz - f0) / .0001 ) );\n    \t\tif( weight > 0.0 ) {\n    \t\t\tao = f0 / weight;\n    \t\t} else {\n    \t\t\tao = 0.0;\n    \t\t}\n    \t\tvNormal = modifiedNormal;\n    \t\tvec3 newPosition = position + f0 * evNormal;\n    \t\tvec3 nWorld = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * modifiedNormal );\n    \t\tvReflect = normalize( reflect( normalize( newPosition.xyz - cameraPosition ), nWorld ) );\n    \t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );\n    \t}\n  ')]),this._v(" "),t("script",{attrs:{type:"x-shader/x-vertex",id:"fragmentShader"}},[this._v("\n    varying vec2 vUv;\n    varying vec3 vNormal;\n    varying vec3 vReflect;\n    varying float ao;\n    uniform sampler2D tShine;\n    uniform float time;\n    float PI = 3.14159265358979323846264;\n    void main() {\n    \tfloat yaw = .5 - atan( vReflect.z, - vReflect.x ) / ( 2.0 * PI );\n    \tfloat pitch = .5 - asin( vReflect.y ) / PI;\n    \tvec2 pos = vec2( yaw, pitch );\n    \tvec3 color = texture2D( tShine, pos ).rgb;\n    \tfloat diffuse_value1 = .0015 * max(dot(vNormal, vec3( -490.0, 29.8, -85.8 ) ), 0.0);\n    \tfloat diffuse_value2 = .0005 * max(dot(vNormal, vec3( -460.0, 40.27, 187.4 ) ), 0.0);\n    \tfloat diffuse_value3 = .0010 * max(dot(vNormal, vec3( 175.5, 30.04, 466.4 ) ), 0.0);\n    \tfloat diffuse_value4 = .0005 * max(dot(vNormal, vec3( 466.0, 45.3, 172.9 ) ), 0.0);\n    \tgl_FragColor = vec4( color - .15 * ao + .3 * vec3( diffuse_value1 + diffuse_value2 + diffuse_value3 + diffuse_value4 ), 1.0 );\n    }\n  ")])],1)},staticRenderFns:[]};var a=n("VU/8")({name:"App",components:{}},o,!1,function(e){n("zSEB")},null,null).exports,r=n("/ocq"),c=n("Zrlr"),s=n.n(c),l=n("wxAW"),v=n.n(l),f=n("Ml+6"),g=n("R5/K");n("RkPb");var d=function(){function e(t){s()(this,e);var n=document.getElementById("threejs-container");t.width=n.clientWidth,t.height=n.clientHeight,this.width=t.width,this.height=t.height,this.size={width:this.width,height:this.height},this.clock=new f.c,this.clock.start(),this.scene=new f.A,this.registerTVShader(),this.lights=this.buildLights(this.scene),this.camera=this.buildCamera(this.width,this.height),this.renderer=this.buildRender(this.width,this.height),this.initScenes();var i=new f.C(5,32,32),o=new f.o({color:16776960}),a=new f.n(i,o);a.position.set(0,0,0),this.scene.add(a)}return v()(e,[{key:"initScenes",value:function(){this.imaginationScene=new function(e){var t=this;this.sceneGroup=new f.i,e.add(this.sceneGroup),this.material=null,this.weight=10,this.init=function(){t.load(),t.start=Date.now()},this.load=function(){var e=(new f.E).load("src/assets/green.png"),n=f.H.merge([f.G.lights,{diffuse:{type:"c",value:new f.d(16777215)},tShine:{type:"t",value:e},time:{type:"f",value:0},weight:{type:"f",value:0}}]);t.material=new f.B({uniforms:n,vertexShader:document.getElementById("vertexShader").textContent,fragmentShader:document.getElementById("fragmentShader").textContent,lights:!0}),console.log(t.material);var i=new f.n(new f.j(20,5),t.material);console.log(i),i.scale.setScalar(.7),i.position.set(0,0,0),t.sceneGroup.add(i)},this.update=function(e){t.sceneGroup.rotation.y+=.005,t.material&&(t.material.uniforms.time.value+=e,t.material.uniforms.weight.value=t.weight*(.5+.5*Math.sin(25e-5*(Date.now()-t.start))))},this.news=function(){g.a.to(t.material.uniforms.time,1,{value:.1}),g.a.to(t,1,{weight:20,onComplete:function(){g.a.to(t,1,{weight:10})}})}}(this.scene),this.imaginationScene.init()}},{key:"news",value:function(){this.imaginationScene.news()}},{key:"registerTVShader",value:function(){this.BadTVShader={uniforms:{tDiffuse:{type:"t",value:null},time:{type:"f",value:0},distortion:{type:"f",value:3},distortion2:{type:"f",value:5},speed:{type:"f",value:.2},rollSpeed:{type:"f",value:.1}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D tDiffuse;","uniform float time;","uniform float distortion;","uniform float distortion2;","uniform float speed;","uniform float rollSpeed;","varying vec2 vUv;","vec3 mod289(vec3 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0;","}","vec2 mod289(vec2 x) {","  return x - floor(x * (1.0 / 289.0)) * 289.0;","}","vec3 permute(vec3 x) {","  return mod289(((x*34.0)+1.0)*x);","}","float snoise(vec2 v)","  {","  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0","                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)","                     -0.577350269189626,  // -1.0 + 2.0 * C.x","                      0.024390243902439); // 1.0 / 41.0","  vec2 i  = floor(v + dot(v, C.yy) );","  vec2 x0 = v -   i + dot(i, C.xx);","  vec2 i1;","  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);","  vec4 x12 = x0.xyxy + C.xxzz;"," x12.xy -= i1;","  i = mod289(i); // Avoid truncation effects in permutation","  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))","\t\t+ i.x + vec3(0.0, i1.x, 1.0 ));","  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);","  m = m*m ;","  m = m*m ;","  vec3 x = 2.0 * fract(p * C.www) - 1.0;","  vec3 h = abs(x) - 0.5;","  vec3 ox = floor(x + 0.5);","  vec3 a0 = x - ox;","  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );","  vec3 g;","  g.x  = a0.x  * x0.x  + h.x  * x0.y;","  g.yz = a0.yz * x12.xz + h.yz * x12.yw;","  return 130.0 * dot(m, g);","}","void main() {","vec2 p = vUv;","float ty = time*speed;","float yt = p.y - ty;","float offset = snoise(vec2(yt*3.0,0.0))*0.2;","offset = offset*distortion * offset*distortion * offset;","offset += snoise(vec2(yt*50.0,0.0))*distortion2*0.001;","gl_FragColor = texture2D(tDiffuse,  vec2(fract(p.x + offset),fract(p.y-time*rollSpeed) ));","}"].join("\n")}}},{key:"buildLights",value:function(e){var t=new f.a(16777215);e.add(t),(t=new f.v(16777215,1,150)).position.set(20,10,10),(t=new f.v(16777215,1,150)).position.set(-20,10,10)}},{key:"buildCamera",value:function(e,t){var n=e/t,i=new f.t(30,n,1,1e4);return i.position.set(0,0,100),i.lookAt(new f.K(0,0,0)),i}},{key:"buildRender",value:function(e,t){var n=new f.N({canvas:canvas,antialias:!0,alpha:!0}),i=window.devicePixelRatio?window.devicePixelRatio:1;return n.setPixelRatio(i),n.setSize(e,t),n.gammaInput=!0,n.gammaOutput=!0,n}},{key:"update",value:function(){var e=this.clock.getDelta();this.renderer.render(this.scene,this.camera),this.time+=1,this.imaginationScene.update(e)}}]),e}(),u=(n("/lao"),n("kqA7")),x=n.n(u),m={colors:["#0892A5","#ff0000","#ff00ff","#FFACE4"]},h=n("Fm33"),y=n.n(h),p=n("Padj"),z=n.n(p),w=function(){function e(){s()(this,e),this.runningInference=!1,this.load()}return v()(e,[{key:"load",value:function(){this.charRNN=z.a.charRNN("static/woolf/",this.modelReady)}},{key:"modelReady",value:function(){console.log("Model Loaded")}},{key:"generate",value:function(e,t){if(!this.runningInference){this.runningInference=!0,console.log("Generating...");var n=e.toLowerCase();if(n.length>0){var i={seed:n,temperature:.5,length:100};this.charRNN.generate(i,t)}}}}]),e}(),P={name:"HelloWorld",props:{msg:String},data:function(){return{sceneManager:null,stats:null,colorIndex:0,question:null,articleIndex:0,articles:null,lstm:null}},methods:{render:function(){requestAnimationFrame(this.render),this.sceneManager.update()},setupLonghold:function(){var e,t=this,n=document.body;n.addEventListener("mousedown",function(n){var i=t;e=setTimeout(function(){document.getElementById("canvas").style.backgroundColor=m.colors[i.colorIndex%m.colors.length],i.colorIndex+=1,i.articleIndex+=1,i.getNextNews()},1e3)},!0),n.addEventListener("mouseup",function(t){clearTimeout(e)}),n.addEventListener("mouseout",function(t){clearTimeout(e)})},setupShake:function(){var e=this;new x.a({threshold:10,timeout:1e3}).start(),window.addEventListener("shake",function(){document.getElementById("canvas").style.backgroundColor=m.colors[e.colorIndex%m.colors.length],e.colorIndex+=1,e.articleIndex+=1,e.getNextNews()},!1)},getTrendingNews:function(){var e=this;fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=9097f737932c4681bd54a2ed6a71dbf1").then(function(e){return e.json()}).then(function(t){e.articleIndex>=t.articles.length&&(e.articleIndex=0),e.articles=t.articles})},getNextNews:function(){if(null!=this.articles){this.articleIndex>=this.articles.length&&(this.articleIndex=0),this.sceneManager.news();var e=this.articles[this.articleIndex].title,t=y.a.tokenize(e),n=[];y.a.getPosTags(e).forEach(function(e,i){e.includes("nn")&&n.push(t[i])}),console.log(n),this.question="",n.length>1?this.question=n[0]+" "+n[1]:this.question=" "+n[0],this.lstm.generate(this.articles[this.articleIndex].title+" ",this.formQuestion)}},formQuestion:function(e,t){console.log(t.sample),this.lstm.runningInference=!1;var n=y.a.tokenize(t.sample),i=[],o=[],a=[];y.a.getPosTags(t.sample).forEach(function(e,t){e.includes("nn")&&n[t].length>3&&i.push(n[t]),e.includes("vb")&&n[t].length>3&&o.push(n[t]),(e.includes("jj")||e.includes("rb"))&&n[t].length>3&&a.push(n[t])});var r=a[0]?a[0]:" ";this.question="What if "+this.question+" could be a "+r+" "+i[0]+" ?"}},mounted:function(){var e=document.getElementById("canvas");this.sceneManager=new d(e),this.render(),this.setupShake(),this.setupLonghold(),this.lstm=new w,this.getTrendingNews()}},_={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"hello"},[this._m(0),this._v(" "),t("div",{attrs:{id:"question"}},[this._v(this._s(this.question))])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"threejs-container"}},[t("canvas",{attrs:{id:"canvas"}})])}]};var I=n("VU/8")(P,_,!1,function(e){n("wtNw")},"data-v-69fa8996",null).exports,S={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};var N=n("VU/8")({},S,!1,function(e){n("qz5d")},null,null).exports;i.a.use(r.a);var b=new r.a({routes:[{path:"/",name:"HelloWorld",component:I},{path:"/about",name:"About",component:N}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:b,template:"<App/>",components:{App:a}})},qz5d:function(e,t){},wtNw:function(e,t){},zSEB:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.d97993b4473b313785c1.js.map