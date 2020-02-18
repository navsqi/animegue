let inputHandler = document.querySelector("#animeTitle");

inputHandler.addEventListener("change", function(e){
  let animeTitle = e.target.value;
  let animes = fetch("https://api.jikan.moe/v3/search/anime?page=1&q="+animeTitle+"&limit=12");

  animes
    .then(response => response.json())
    .then(response => {
      listAnime = response.results;
      // get discovered animes
      let animeCard = listAnime.map(r => {
      // get detail
      let detail = getDetail(r.mal_id).then(res => {
            return `<div class="modal fade" id="${res.mal_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${res.title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-lg-3">
                      <img src="${res.image_url}" class="card-img-top" alt="">
                    </div>
                    <div class="col-lg-9">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><strong>Title: </strong>${res.title}</li>
                      <li id="${res.map_id}" class="list-group-item synopsis"><strong>Sypnosis: </strong>${res.synopsis}</li>
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
          </div>`;
        });
      // show detail
      detail.then(res => {
        let el1 = document.createElement("span");
        el1.innerHTML = res;
        document.querySelector("#animeWrapper").appendChild(el1);
      })
        // list anime
        return `<div class="col-lg-3 col-md-4 col-6 my-3">
        <div class="card">
          <img src="${r.image_url}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${r.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted"></h6>
            <button id="details" data-toggle="modal" data-target="#${r.mal_id}"class="btn btn-primary mt-1 details">View Detail</button>
          </div>
        </div>
        </div>`;
      }).join("");
      // show discovered animes
      document.querySelector("#animeWrapper").innerHTML = animeCard;
      
    });
});

// get detail anime
function getDetail(mal_id){
      return fetch("https://api.jikan.moe/v3/anime/"+mal_id)
      .then(res => res.json())
      .then(animeDetail => animeDetail);
}






