let slideshow = document.querySelector("#slideshow>img");

let img = ["https://www.elpolloloco.com/content/img/hero/M2-2022-Family-Feast-Hero-Tablet-1536x1120.webp","https://www.elpolloloco.com/content/img/hero/M4-2022-Combos-Hero-Tablet-1536x1120.webp","https://www.elpolloloco.com/content/img/hero/M3-2021-Team-2-Hero-Tablet-1536x1120.webp","https://www.elpolloloco.com/content/img/hero/M5-Free-Chips-Hero-Tablet-1536x1120.webp","https://www.elpolloloco.com/content/img/hero/M1-2023-Grillers-Hero-Tablet-1536x1120.webp"];


let index =0;
function slide(){
    slideshow.setAttribute("src",img[index]);
    index++;
    if(index>=img.length){
        index=0;
    }
}

setInterval("slide()",2000);

