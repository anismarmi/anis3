/*
JS file for cranktank / RPNA managed functions on impulse theme
Referenced in theme.liquid
If issues, reach out to taylor@cranktank.net
*/


/*
on variant change functions below.
Triggers should all be aggregated in "theme--ct-modified.js" below line 915
See here for working with json: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
*/
function log_variant(variant){
  console.log(variant);
}

/*
Runs on product variant change (called from line 915 or so in theme--ct-modified.js)

*/
function updateFrameLensesBumpers(variant){
  //pull data
  let variant_id = variant['id'];
  const ct_data = JSON.parse(document.getElementById("ct-data").textContent);
  //console.log(ct_data);
  let variant_metafields = ct_data['variant_metafields'];
  for(var i = 0; i < variant_metafields.length; i++){
    if(variant_metafields[i]['variant_id'] == variant_id){
      var frame = variant_metafields[i]['sunglass_frame_name'];
      var lenses = variant_metafields[i]['sunglass_lenses_name'];
      var bumper = variant_metafields[i]['sunglass_bumper_name'];
      var light_low = variant_metafields[i]['lens_light_transmission_low'];
      var light_high = variant_metafields[i]['lens_light_transmission_high'];
      break;
    }
  }
  //console.log(frame);
  //console.log(lenses);
  //console.log(bumper);

  //place data
  document.querySelector('span.variant__label-info[ct-variant-metafield="frame"]').innerText = "Frame: "+frame;
  document.querySelector('span.variant__label-info[ct-variant-metafield="lenses"]').innerText = "Lenses: "+lenses;
  document.querySelector('span.variant__label-info[ct-variant-metafield="bumpers"]').innerText = "Bumpers: "+bumper;
  if(light_low && light_high){
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission"]').innerText = "Light Transmission: "+light_low+"% - "+light_high+"%";
    var light_low_icon = find_light_icon(light_low);
    var light_high_icon = find_light_icon(light_high);
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission-icons"] img.low-range').src = light_low_icon;
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission-icons"] img.high-range').src = light_high_icon;
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission-icons"] img.high-range').classList.remove("ct-hidden");
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission-icons"] span.ct-icon-dash').classList.remove("ct-hidden");
  } else if(light_low){
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission"]').innerText = "Light Transmission: "+light_low+"%";
    var light_low_icon = find_light_icon(light_low);
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission-icons"] img.low-range').src = light_low_icon;
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission-icons"] img.high-range').classList.add("ct-hidden");
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission-icons"] span.ct-icon-dash').classList.add("ct-hidden");
  } else {
    document.querySelector('span.variant__label-info[ct-variant-metafield="light-transmission"]').innerText = "";
  }
}

function find_light_icon(ltv){
  var src;
  
  //logic to determine the icon source
  if(ltv < 10){ //full sun
    src = "https://cdn.shopify.com/s/files/1/2338/3111/t/132/assets/Rudy_WeatherIcons_FullSun.svg?v=1645649610";
  } else if (ltv >10 && ltv < 20){//sun
    src= "https://cdn.shopify.com/s/files/1/2338/3111/t/132/assets/Rudy_WeatherIcons_Sun.svg?v=1645649609";
  } else if (ltv >20 && ltv < 30){//less sun
    src= "https://cdn.shopify.com/s/files/1/2338/3111/t/132/assets/Rudy_WeatherIcons_LessSun.svg?v=1645649613";
  } else if (ltv >30 && ltv < 40){//Partly Cloudy
    src = "https://cdn.shopify.com/s/files/1/2338/3111/t/132/assets/Rudy_WeatherIcons_PartlyCloudy.svg?v=1645649608";
  } else if (ltv > 40 && ltv < 50){//partly sunny
    src = "https://cdn.shopify.com/s/files/1/2338/3111/t/132/assets/Rudy_WeatherIcons_PartlySunny.svg?v=1645649613";
  } else if (ltv > 50 && ltv < 60){//snow
    src = "https://cdn.shopify.com/s/files/1/2338/3111/t/132/assets/Rudy_WeatherIcons_Snow.svg?v=1645649611";
  } else if (ltv > 60){//rain
    src = "https://cdn.shopify.com/s/files/1/2338/3111/t/132/assets/Rudy_WeatherIcons_Rain.svg?v=1645649614";
  } else {
    src = "not found"
  }
  return src;
}

function updateStickyHeaderPrice(variant){
  //console.log(variant);
  //first check if there is a sticky header
  var ct_header_wrapper = document.querySelector(".ct-header-wrapper");
  if(ct_header_wrapper){
    //update price, compare at price, zip pay price and inventory notice.
    let ca_price = document.querySelector(".ct-header-wrapper .product__price.product__price--compare");
    let price = document.querySelector(".ct-header-wrapper .ct-product__price");
    let inventory_notice = document.querySelector(".ct-header-wrapper p.ct-inventory_notice");
    let zippay_price = document.querySelector(".ct-header-wrapper span.ct-zippay_price");
    let new_inventory_notice_product_form = document.querySelector(".product-block.product-block--sales-point[ct-block-type=\"inventory-status\"] span[data-product-inventory]");

    if(ca_price){
      ca_price.innerText = "$"+variant.compare_at_price / 100;
    }
    if(inventory_notice){
      if(variant.inventory_quantity < 1){
        inventory_notice.innerText = "";
      } else {
        inventory_notice.innerText = new_inventory_notice_product_form.innerText;
      }
    }
    if(zippay_price){
      zippay_price.innerText = "$"+Math.round(variant.price/4) / 100;
    }
    price.innerText = "$"+variant.price/100;
  }
}
