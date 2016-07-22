'use strict';
describe("formatBarcodes",function(){
    it("formatBarcodes into amount and barcode",function(){
        let input=[
            'ITEM000000-2.3',
            'ITEM000001-2',
            'ITEM000000-3',
            'ITEM000002-4.5',
            'ITEM000000-2',
            'ITEM000001-3.2',
            'ITEM000003-2'
        ];
        let result=[
            {barcode:'ITEM000000',amount:2.3},
            {barcode:'ITEM000001',amount:2},
            {barcode:'ITEM000000',amount:3},
            {barcode:'ITEM000002',amount:4.5},
            {barcode:'ITEM000000',amount:2},
            {barcode:'ITEM000001',amount:3.2},
            {barcode:'ITEM000003',amount:2},
        ];
        let itemBarcode=formatBarcodes(input);
        expect(itemBarcode).toEqual(result);
    })}
)

describe("mergeBarcodes",function () {
    it("merge barcodes",function () {
        let input=[
            {barcode:'ITEM000000',amount:2.3},
            {barcode:'ITEM000001',amount:2},
            {barcode:'ITEM000000',amount:3},
            {barcode:'ITEM000002',amount:4.5},
            {barcode:'ITEM000000',amount:2},
            {barcode:'ITEM000001',amount:3.2},
            {barcode:'ITEM000003',amount:2},
        ];
        let result=[
            {barcode:'ITEM000000',count:7.3},
            {barcode:'ITEM000001',count:5.2},
            {barcode:'ITEM000002',count:4.5},
            {barcode:'ITEM000003',count:2},
        ]
        let itemCounted=mergeBarcodes(input);
        expect(itemCounted).toEqual(result);
    })
})

describe("mergeCartItemsInfo",function () {
    it("merge all Information",function () {
        let input= [
            {barcode:'ITEM000000',count:7.3},
            {barcode:'ITEM000001',count:5.2},
            {barcode:'ITEM000002',count:4.5},
            {barcode:'ITEM000003',count:2},
        ];

        let result=[
            {barcode:"ITEM000000", count:7.3,name:"可口可乐", price:3, unit: "瓶"},
            {barcode:"ITEM000001", count: 5.2,name:"雪碧", price:3, unit: "瓶"},
            {barcode: "ITEM000002", count: 4.5, name: "苹果", price:5.5,unit:"斤"},
            {barcode: "ITEM000003", count:2,name:"荔枝",price:15,unit:"斤"}
        ];
        let cartItemsInfo=mergeCartItemsInfo(input);
        expect(cartItemsInfo).toEqual(result);
    })
})
describe("getFirstSubtotal",function () {
    it("get first subtotal",function () {
        let input=[
            {barcode:"ITEM000000", count:7.3,name:"可口可乐", price:3, unit: "瓶"},
            {barcode:"ITEM000001", count: 5.2,name:"雪碧", price:3, unit: "瓶"},
            {barcode: "ITEM000002", count: 4.5, name: "苹果", price:5.5,unit:"斤"},
            {barcode: "ITEM000003", count:2,name:"荔枝",price:15,unit:"斤"}
        ];
        let result=[
            {barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, count: 7.3, subtotal: 21.9 },
            { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5.2, subtotal: 15.600000000000001 },
            { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, count: 4.5, subtotal: 24.75 },
            { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2, subtotal: 30 }
        ];
        let firstSub=getFirstSubtotal(input);
        expect(firstSub).toEqual(result);
    })

})

describe("mergePromotionInfo",function () {
    it("merge PromotionType",function () {
        let input=[
            {barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, count: 7.3, subtotal: 21.9 },
            { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5.2, subtotal: 15.600000000000001 },
            { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, count: 4.5, subtotal: 24.75 },
            { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2, subtotal: 30 }
        ];
        let result=[
            { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, count: 7.3, subtotal: 21.9 },
            { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5.2, subtotal: 15.600000000000001,type: 'Buy_Two_Get_One' },
            { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, count: 4.5, subtotal: 24.75 ,type: 'Buy_Two_Get_One'},
            { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2, subtotal: 30 ,type: 'Other_Promotion' }
            ];

        let cartItemsPromotionInfo=mergePromotionInfo(input);
        expect(cartItemsPromotionInfo).toEqual(result);

    })
})
describe("getSubtotal",function () {
    it("get PromotionAll Total", function () {
        let input=[
            { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, count: 7.3, subtotal: 21.9 },
            { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5.2, subtotal: 15.600000000000001,type: 'Buy_Two_Get_One' },
            { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, count: 4.5, subtotal: 24.75 ,type: 'Buy_Two_Get_One'},
            { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2, subtotal: 30 ,type: 'Other_Promotion' }
        ];
        let result=[
            { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, count: 7.3, subtotal: 21.9, subSave: 0 },
            { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5.2, subtotal: 15.600000000000001, type: 'Buy_Two_Get_One', subSave: 3 },
            { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, count: 4.5, subtotal: 24.75, type: 'Buy_Two_Get_One', subSave: 5.5 },
            { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2, subtotal: 30, type: 'Other_Promotion', subSave: 0 },
        ];
        let cartItemsSubtotal = getSubtotal(input);
        expect(cartItemsSubtotal).toEqual(result);
    })
})

describe("getTotal",function () {
    it("get all total",function () {
        let input=[
            { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, count: 7.3, subtotal: 21.9, subSave: 0 },
            { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5.2, subtotal: 15.600000000000001, type: 'Buy_Two_Get_One', subSave: 3 },
            { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, count: 4.5, subtotal: 24.75, type: 'Buy_Two_Get_One', subSave: 5.5 },
            { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2, subtotal: 30, type: 'Other_Promotion', subSave: 0 },
        ];
        let result=[{total:83.75,save:8.5}];
        let all=getTotal(input);
        expect(all).toEqual(result);

    })
})

