const urlList = {
  xml: "https://s3-ap-northeast-1.amazonaws.com/static.tomoktan.com/1008/data.xml",
  json: "https://s3-ap-northeast-1.amazonaws.com/static.tomoktan.com/1008/data.json"
}


$("#getData").on("click", function () {

  $("#items").empty();

  const dataType = $("input[name=dataType]:checked").val();

  loadData(dataType);
});


function loadData(dataType) {
  if(dataType === "xml"){

    $.ajax({
      type: "GET",
      url: urlList.xml,
      success: function (response) {
        const data = $(response).children("data");
        const items = data.children("item");

        for(const item of items){
          /* XMLから値を取得 */
          const name = $(item).children("name").text();
          const category = $(item).children("category").text();
          const description = $(item).children("description").text();
          const price = $(item).children("price");
          const regular = price.children("regular").text();
          const discount = price.children("discount").text();
          const src  = $(item).children("image").text();

          /* #itemsにタグを追加 */
          const div_item = $("<div>").addClass("item flexbox");
          const img = $("<img>").attr("src", src).attr("alt", "商品画像");
          const h3 = $("<h3>").html(name);
          const span = $("<a>").html(category);
          const p1 = $("<p>").addClass("regular").html("¥" + regular);
          const p2 = $("<p>").addClass("discount");
          const p3 = $("<p>").addClass("description").html(description);

          if(discount !== ""){
            p1.addClass("line");
            p2.html("¥" + discount);
          }

          const div_flexChild1 = $("<div>").addClass("flex-child1").append(img);
          const div_flexChild2 = $("<div>").addClass("flex-child2").append(h3, span, p1, p2, p3);

          div_item.append(div_flexChild1, div_flexChild2);
          $("#items").append(div_item);

        }

        $(".item").on("click", function () { // モーダルを表示するファンクションを呼ぶ
          modalOpen(this);
        });
      },
      error: function (err) {
        console.error(err);
      }
    });

  }else if(dataType === "json"){
    $.ajax({
      type: "GET",
      url: urlList.json,
      success: function (response) {
        const itemList = response.data;

        for(const item of itemList) {
          /* JSONから値を取得 */
          const name = item.name;
          const category = item.category;
          const description = item.description;
          const price = item.price;
          const regular = price.regular;
          const discount = price.discount;
          console.log(discount);
          const src  = item.image;

          /* #itemsにタグを追加 */
          const div_item = $("<div>").addClass("item flexbox");
          const img = $("<img>").attr("src", src).attr("alt", "商品画像");
          const h3 = $("<h3>").html(name);
          const span = $("<a>").html(category);
          const p1 = $("<p>").addClass("regular").html("¥" + regular);
          const p2 = $("<p>").addClass("discount");
          const p3 = $("<p>").addClass("description").html(description);

          if(discount !== undefined){
            p1.addClass("line");
            p2.html("¥" + discount);
          }

          const div_flexChild1 = $("<div>").addClass("flex-child1").append(img);
          const div_flexChild2 = $("<div>").addClass("flex-child2").append(h3, span, p1, p2, p3);

          div_item.append(div_flexChild1, div_flexChild2);
          $("#items").append(div_item);
        }

        $(".item").on("click", function () { // モーダルを表示するファンクションを呼ぶ
          modalOpen(this);
        });
      },
      error: function (err) {
        console.error(err);
      }
    });
  }
};


function modalOpen (self) { // モーダルを表示するファンクション
  $(".modal").css({
    opacity: 1,
    visibility: "visible"
  });

  $(".modal-container").empty();

  const div_itemArea = $("<div>").addClass("item-area");

  const name = $(self).find("h3").clone().addClass("name");

  const category = $(self).find("a").clone().addClass("category");

  const div_flexbox = $("<div>").addClass("flexbox");

  const div_flexChild1 = $("<div>").addClass("flex-child1");
  const div_flexChild2 = $("<div>").addClass("flex-child2");

  const img = $(self).find("img").clone();
  div_flexChild1.append(img);

  const regular = $(self).find(".regular").clone();
  const discount = $(self).find(".discount").clone();
  const description = $(self).find(".description").clone();
  div_flexChild2.append(description, regular, discount);

  const div_buttonArea = $("<div>").addClass("button-area");
  const cartIn = $("<button>").html("<i class='fas fa-cart-plus'></i>&nbsp;カートに追加").addClass("cart-in");
  const like = $("<button>").html("<i class='fas fa-star'></i>&nbsp;お気に入りに登録").addClass("like");
  div_buttonArea.append(cartIn, like);

  div_flexChild2.append(div_buttonArea);

  div_flexbox.append(div_flexChild1, div_flexChild2);
  div_itemArea.append(name, category, div_flexbox);

  $(".modal-container").append(div_itemArea);

  const button = $("<a>").html("<i class='fas fa-times'></i>").addClass("close-button");
  $(".modal-container").append(button);

  $(".close-button").on("click", function () {
    $(".modal").css({
      opacity: 0,
      visibility: "hidden"
    });
  });
}


$(".modal-overlay").on("click", function () {
  $(".modal").css({
    opacity: 0,
    visibility: "hidden"
  });
});
