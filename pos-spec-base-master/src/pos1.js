'use strict'
function  loadPromotions() {
    return [{type:"Buy_Two_Get_One",barcode:["ITEM000002","ITEM000001"]},
        {type:"Other_Promotion",barcode:["ITEM000003","ITEM000005"]}];
}

function formatBarcodes(tags){
    return tags.map(function (tag) {
        let temp=tag.split("-");
        return {
            barcode: temp[0],
            amount: parseFloat(temp[1]) || 1
        }
    });
}

function  mergeBarcodes(barcodes) {
    let countedBarcodes=[];
    for(let i=0;i<barcodes.length;i++){
        let j;
        let existItem=0
        for(j of countedBarcodes){
            if(j.barcode===barcodes[i].barcode){
                existItem=1;
                break;
            }
        }
        if(existItem){
            j.count=j.count+barcodes[i].amount;
        }
        else{
            countedBarcodes.push(Object.assign({},{barcode:barcodes[i].barcode},{count:barcodes[i].amount}));
        }
    }
    return countedBarcodes;
}
function  mergeCartItemsInfo(countedBarcodes) {
    let cartItemsInfo=[];
    let allItem=loadAllItems();
    for(let i=0;i<countedBarcodes.length;i++){
        let j;
        for(j of allItem){
            if(countedBarcodes[i].barcode===j.barcode){
                cartItemsInfo.push(Object.assign(j,{count:countedBarcodes[i].count}));
                break;
            }
        }
    }
    return cartItemsInfo;
}
function  getFirstSubtotal(cartItemsInfo) {
    let firstSub=[];
    for(let i=0;i<cartItemsInfo.length;i++){
        let temp=cartItemsInfo[i].count*cartItemsInfo[i].price;
        firstSub.push(Object.assign({},cartItemsInfo[i],{subtotal:temp}));
    }
    return firstSub;
}
function  mergePromotionInfo(firstSub) {
    let cartItemsPromotionInfo = [];
    let promotionInfo=loadPromotions();
    let j;
    for (let i = 0; i < firstSub.length; i++) {
        let existItem=0;
        for (j of promotionInfo) {
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
function  getSubtotal(cartItemsPromotionInfo) {
    let cartItemsSub=[];
    let subSave=[];
    for(let i=0;i<cartItemsPromotionInfo.length;i++){
        if(cartItemsPromotionInfo[i].type==='Buy_Two_Get_One'){
            let saveNum=parseInt(cartItemsPromotionInfo[i].count/3);
            subSave[i]=saveNum*cartItemsPromotionInfo[i].price;
        }
        else{
            subSave[i]=0;
        }
        cartItemsSub.push(Object.assign({},cartItemsPromotionInfo[i],{subSave:subSave[i]}));
    }
    return cartItemsSub;
}
function getTotal(cartItemsSub) {
    let total=0;
    let allTotal=[];
    let allSave=0;
    let firstTotal=0;
    for(let i=0;i<cartItemsSub.length;i++){
        allSave+=cartItemsSub[i].subSave;
        firstTotal+=cartItemsSub[i].subtotal
    }
    total=firstTotal-allSave;
    allTotal.push({total:total,save:allSave});
    return allTotal;
}