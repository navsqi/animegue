$(document).ready(function(){
  // handle event submit
  $("form").on("submit", function(e){
    // prevent default action
    e.preventDefault();
    // get anime title from input text
    let animeTitle = $("#animeTitle").val();

    $.ajax({
      type: "GET",
      url: "https://api.jikan.moe/v3/search/anime?page=1&q="+animeTitle+"&limit=12",
      success: function(data){
        let animes = data.results;
        // mapping data anime to html element
        let listAnime = animes.map(function(anime){
          // get mal ID
          let malID = anime.mal_id;
          // call viewDetailAnime to fill the detail elements
          let viewDetail = viewDetailAnime(malID);
          // get date from format yyyy-mm-dd into yyyy
          let date = (anime.start_date) ? anime.start_date.split("-")[0] : "unknown";
          return `
          <div class="modal fade" id="${anime.mal_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${anime.title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-lg-3">
                      <img src="${anime.image_url}" class="card-img-top" alt="">
                    </div>
                    <div class="col-lg-9">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><strong>Title: </strong>${anime.title}</li>
                      <li id="${malID}" class="list-group-item synopsis"><strong>Sypnosis: </strong></li>
                    </ul>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div class="col-lg-3 col-md-4 col-6 my-3">
            <div class="card">
              <img src="${anime.image_url}" class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-title">${anime.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                <button id="details" data-toggle="modal" data-target="#${anime.mal_id}"class="btn btn-primary mt-1">View Detail</button>
              </div>
            </div>
            </div>`;
         });
        //  append the listanime's elements
         $("#animeWrapper").empty();
         $("#animeWrapper").append(listAnime);
      },
      error: (e) => {
        console.log(e.responseText);
      }
    });

  });

  // handle the detail modal
  let count = 0;
  function handleData(responseData){
    let elements = $(".synopsis");
    // check if id's element equals to mal_id
    if($(elements[count]).attr("id") == responseData.mal_id){
      // append sypnosis into element
      $(elements[count]).append(responseData.synopsis);
      count += 1;
    }
  }
  
  // request Detail Anime
  function viewDetailAnime(malID){
    $.ajax({
      method: "GET",
      url: "https://api.jikan.moe/v3/anime/"+malID,
      success: (animeDetail) => {
        // callback
        // we can't return in success of ajax (becasuse this is Asynchronous)
        // it will execute before the function you pass as success callback was even called.
        handleData(animeDetail);
      }
    });
  
  }
  
});

