let song;
let fft;
let particles = [];

function preload() {
  song = loadSound('shedontluvyou(speedup).mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  // Configurazione FFT per l'analisi audio
  fft = new p5.FFT(0.8, 128);
  
  // Inizializza alcune particelle
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0, 10); // Leggero effetto trail
  
  // Analisi audio
  let spectrum = fft.analyze();
  let wave = fft.waveform();
  
  // Disegna la forma d'onda
  stroke(255, 100);
  noFill();
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    let x = map(i, 0, wave.length, 0, width);
    let y = map(wave[i], -1, 1, height/2 - 100, height/2 + 100);
    vertex(x, y);
  }
  endShape();
  
  // Aggiorna e disegna le particelle
  for (let particle of particles) {
    let freq = spectrum[particle.freqIndex];
    particle.update(freq);
    particle.show();
  }
}

// Funzioni per il controllo dell'audio
function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function isPlaying() {
  return song.isPlaying();
}

// Gestione del ridimensionamento della finestra
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Classe Particle per effetti visuali
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.freqIndex = floor(random(64));
    this.color = color(random(255), random(255), random(255));
    this.size = random(3, 8);
  }
  
  update(freq) {
    // Movimento basato sulla frequenza
    let force = map(freq, 0, 255, 0, 1);
    this.acc = p5.Vector.random2D().mult(force * 0.2);
    
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    
    // Bouncing sui bordi
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }
  
  show() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size);
  }
}
