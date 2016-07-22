'use strict';
function formatBarcodes(tags){
    return tags.map(function (tag) {
      let temp=tag.split("-");
        return {
         barcode:temp[0],
         amount:parseFloat(temp[1])||1
        }

    })
}
function mergeBarcodes(barcodes){
    let allItem=[];
    for(let i=0;i<barcodes.length;i++){
        let existItem;
        let j
        for(j of allItem){
            if(j.barcode===barcodes[i].barcode){
                existItem=1;
                break;
            }
        }
        if(existItem){
            j.count=j.count+barcodes[i].amount;
        }
        else{
            allItem.push(Object.assign({},{barcode:barcodes[i].barcode},{count:barcodes[i].amount}));
        }
    }
    return allItem;
}
function  mergeCartItemInfo(itemCounted,allItems){
    let cartItemsInfo=[];

    for(let i=0;i<itemCounted.length;i++){
        let j;
        for(j of allItems){
            if(j.barcode===itemCounted[i].barcode){
                break;
            }
        }
        cartItemsInfo.push(Object.assign({},j,{count:itemCounted[i].count}))
    }
    return cartItemsInfo;
}
function  loadPromotions() {
    return [{type:"Buy_Two_Get_One",barcode:["ITEM000002","ITEM000001"]},
        {type:"Other_Promotion",barcode:["ITEM000003","ITEM000005"]}];
}
function  getFirstSubtotal(cartItemsInfo) {
    let firstSub=[];
    for(let i=0;i<cartItemsInfo.length;i++){
        let subPrice=cartItemsInfo[i].price*cartItemsInfo[i].count;
        firstSub.push(Object.assign({},cartItemsInfo[i],{substotal:subPrice}));
    }
    console.log(firstSub);
    return firstSub;
}
function mergePromotionInfo(firstSub,item){
    let cartItemsPromotionInfo = [];
    let j;
    for (let i = 0; i < firstSub.length; i++) {
        let existItem=0;
        for (j of item) {
            for (let k = 0; k < j.barcode.length; k++) {
                if(firstSub[i].barcode === j.barcode[k]){
                    existItem=1;
                    break;
                }
            }
            if(existItem){
                break;
            }
        }
        if (existItem) {
            cartItemsPromotionInfo.push(Object.assign({}, firstSub[i], {type: j.type}));
        }
        else{
            cartItemsPromotionInfo.push(Object.assign({}, firstSub[i]));
        }
    }
    return cartItemsPromotionInfo;
}
function getSubtotal(cartItemsAllInfo) {
    let cartItemsSub=[];
    let subSave=[];
    for(let i=0;i<cartItemsPromotionInfo.length;i++){
        if(cartItemsPromotionInfo[i].type==='Buy_Two_Get_One'){
            let saveNum=parseInt(cartItemsPromotionInfo[i].amount/3);
            subSave[i]=saveNum*cartItemsPromotionInfo[i].price;
        }
        cartItemsSub.push(Object.assign({},cartItemsPromotionInfo,{subSave:subSave[i]}));
    }
    return cartItemsSub;
}

