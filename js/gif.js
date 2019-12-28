var imageSources = ["gif/success.gif", "gif/success2.gif", "gif/success3.gif", "gif/success4.gif"]
var buttons = document.getElementsByClassName("button")[0];
var index = 0;

      // if(buttons){
      //   buttons.addEventListener('click', function() {
      //     if (index === imageSources.length) {
      //       index = 0;
      //     }
      //     document.getElementById("myform").src = imageSources[index];
      //     index++;
      //   });
      // }

function gif00()
{
    if (index === imageSources.length) {
      index = 0;
    }
    document.getElementById("myform").src = imageSources[index];
    index++;
  // document.getElementById("myform").src="gif/success.gif";
}
