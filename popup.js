const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");
async function pickColor() {
    try {
       /// picker
       const eyeDropper  = new EyeDropper();
       const color = await eyeDropper.open();
       return color;
    } catch (error) {
        console.log(error);
    }
}
btn.addEventListener("click", async (e) =>  {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.sync.get("color", ({ color }) => {
    console.log(color);
  });
  chrome.scripting
    .executeScript({
      target: {
        tabId: tab.id,
      },
      func: pickColor,

    
    })
     .then(async (res)=>{
        const [data]  = res ;
        if(data.result){
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerHTML = color;
            try {
                await navigator.clipboard.writeText(color);
            } catch (error) {
                console.log(error);
            }
            
        }
    });
});
