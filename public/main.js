WebMidi.enable(function (err) {
  console.log("hey")
  console.log(WebMidi.outputs)
  
  let slider1 = document.getElementById("myRange1");
  let slider2 = document.getElementById("myRange2");
  let slider3 = document.getElementById("myRange3");
  let slider4 = document.getElementById("myRange4");
  let slider5 = document.getElementById("myRange5");
  let slider6 = document.getElementById("myRange6");
  let slider7 = document.getElementById("myRange7");
  let slider8 = document.getElementById("myRange8");
  let slider9 = document.getElementById("myRange9");
  let slider10 = document.getElementById("myRange10");
  let slider11 = document.getElementById("myRange11");
  let slider12 = document.getElementById("myRange12");
  let slider13 = document.getElementById("myRange13");
  let slider14 = document.getElementById("myRange14");
  let slider15 = document.getElementById("myRange15");
  let slider16 = document.getElementById("myRange16");

  let select = document.getElementById("out");

  const keyHandlers = {
    Digit1: { slider: slider1, direction: 1 },
    Digit2: { slider: slider2, direction: 1 },
    Digit3: { slider: slider3, direction: 1 },
    Digit4: { slider: slider4, direction: 1 },
    Digit5: { slider: slider5, direction: 1 },
    Digit6: { slider: slider6, direction: 1 },
    Digit7: { slider: slider7, direction: 1 },
    Digit8: { slider: slider8, direction: 1 },
    KeyA: { slider: slider9, direction: 1 },
    KeyS: { slider: slider10, direction: 1 },
    KeyD: { slider: slider11, direction: 1 },
    KeyF: { slider: slider12, direction: 1 },
    KeyG: { slider: slider13, direction: 1 },
    KeyH: { slider: slider14, direction: 1 },
    KeyJ: { slider: slider15, direction: 1 },
    KeyK: { slider: slider16, direction: 1 },
    KeyQ: { slider: slider1, direction: -1 },
    KeyW: { slider: slider2, direction: -1 },
    KeyE: { slider: slider3, direction: -1 },
    KeyR: { slider: slider4, direction: -1 },
    KeyT: { slider: slider5, direction: -1 },
    KeyY: { slider: slider6, direction: -1 },
    KeyU: { slider: slider7, direction: -1 },
    KeyI: { slider: slider8, direction: -1 },
    KeyZ: { slider: slider9, direction: -1 },
    KeyX: { slider: slider10, direction: -1 },
    KeyC: { slider: slider11, direction: -1 },
    KeyV: { slider: slider12, direction: -1 },
    KeyB: { slider: slider13, direction: -1 },
    KeyN: { slider: slider14, direction: -1 },
    KeyM: { slider: slider15, direction: -1 },
    Comma: { slider: slider16, direction: -1 },
  };

  document.addEventListener("keydown", function (event) {
    let new_out = WebMidi.getOutputByName(localStorage.getItem("midiOut"));
    console.log(new_out);
    let increment = 7;

    if (event.shiftKey) {
      increment = 1;
    }

    let handler = keyHandlers[event.code];

    if (handler) {
      const { slider, direction } = handler;
      slider.value = Number(slider.value) + direction * increment;
      new_out.sendControlChange(Number(slider.dataset.cc), slider.value);
    }
  });

  function onInputChange(e) {
    let new_out = WebMidi.getOutputByName(localStorage.getItem("midiOut"));
    new_out.sendControlChange(Number(e.target.dataset.cc), e.target.value);
  }

  const sliders = document.querySelectorAll("[data-cc]");

  for (let slider of sliders) {
    slider.oninput = onInputChange;
  }

  for (let i = 0; i < WebMidi.outputs.length; i++) {
    let opt = document.createElement("option");
    opt.value = WebMidi.outputs[i]._midiOutput.name;
    opt.innerHTML = WebMidi.outputs[i]._midiOutput.name;
    select.appendChild(opt);
  }
  
  select.oninput = function () {
    localStorage.setItem("midiOut", this.value);
    console.log(localStorage.getItem("midiOut"));
  };

  let input = WebMidi.getInputByName(localStorage.getItem("midiOut"));

  input.addListener("controlchange", "all", (e) => {
    const cc = e.controller.number;
    const slider = document.querySelector(`[data-cc="${cc}"]`);
    slider.value = e.value;
  });





  let modal = document.getElementById("modalz");
  let btn = document.getElementById("button");
  let span = document.getElementsByClassName("close")[0];
  let doc = document.getElementsByTagName("BODY")

  btn.onclick = function () {
    modal.style.display = "block";
    console.log("poop");
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

