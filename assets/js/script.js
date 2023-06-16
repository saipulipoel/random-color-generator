const GENERATE_BTN = document.getElementById("generateBtn");
const COLORS = document.querySelectorAll(".color");
var generated_color = []

function generateRGB(){
  hex_code = ""
  while (true){
    r = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    g = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    b = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    hex_code = `#${r}${g}${b}`;
    if(!generated_color.includes(hex_code)){
      generated_color.push(hex_code);
        break
    }
  }
  return hex_code
}

function generateRGBA(){
  rgba_code = ""
  while (true){
    r = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    g = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    b = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    a = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    hex_code = `#${r}${g}${b}${a}`;
    if(!generated_color.includes(hex_code)){
      generated_color.push(hex_code);
        break
    }
  }
  return hex_code
}

GENERATE_BTN.addEventListener("click", function () {
  generated_color = []
  number_of_palette = Math.round(document.getElementById('numberOfPalette').value)
  color_mode = document.getElementById('colorMode').value
  html_palette = ''
  while(number_of_palette > 0){
    number_of_palette_box = number_of_palette < 3 ? number_of_palette : 3;
    html_palette += '<div class="palette-box">'
    for(i = 0; i <number_of_palette_box; i++){
      html_palette += `<div id="palette">
                        <span class="color" id="color1"></span>
                        <span class="color" id="color2"></span>
                        <span class="color" id="color3"></span>
                        <span class="color" id="color4"></span>
                        <span class="color" id="color5"></span>
                      </div>`
    }
    html_palette += '</div>'
    number_of_palette = number_of_palette - 3
  }
  document.getElementById('paletteContainer').innerHTML = html_palette
  document.querySelectorAll(".color").forEach((color) => {
    if(color_mode == 'RGB'){
      hex_code_color = generateRGB()
      color.style.backgroundColor = hex_code_color;
      clr_num = color.style.backgroundColor.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
      if(clr_num[0] < 100 && clr_num[1] < 100 && clr_num[2] < 100){
        color.style.color = "#ffffff"
      }else{
        color.style.color = "#000000"
      }
    }
    else if(color_mode == 'RGBA'){
      hex_code_color = generateRGBA()
      color.style.backgroundColor = hex_code_color;
      clr_num = color.style.backgroundColor.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
      if(clr_num[0] < 100 && clr_num[1] < 100 && clr_num[2] < 100){
        color.style.color = "#ffffff"
        if(clr_num[3] < 0.5)color.style.color = "#000000"
      }else{
        color.style.color = "#000000"
      }
    }
    const COLOR_CODE = color.style.backgroundColor;
    color.innerHTML = COLOR_CODE+`<br>`+hex_code_color;
    color.style.cursor = 'pointer';
  });
});

// click color to copy
Array.from(COLORS).forEach(function(color) {
  color.addEventListener('click', function(color){
    color_value = color.target.innerText.replace('\\n', ' ');
    navigator.clipboard.writeText(color_value);
    alert('Copied The Color Code : '+color_value)
  });
});