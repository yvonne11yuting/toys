type Record = {
    id: string,
    week: number,
    date: Date,
    host: string,
    content: {
        title: string,
        slide: string,
        sharer: string
    }[]
}

const record: Record[] = [
    {
        id: 'a01',
        week: 1,
        date: new Date('2023-04-30'),
        host: 'Judith',
        content: [
            {
                title: '當上主管後難道只能默默崩潰嗎',
                slide: 'https://hackmd.io/@yv/r1p30jqmh#/',
                sharer: 'Yvonne'
            },
            {
                title: '恰如其分的自尊',
                slide: 'https://docs.google.com/presentation/d/1j2wFxf5eKCLEjkHZnni-kFHWZxSlUdjz5zEYXxiKUAA/edit?usp=sharing',
                sharer: '啟綸'
            },
            {
                title: '刻意練習',
                slide: 'https://www.canva.com/design/DAFhfNUAF2o/vqlUcIjjyBo9pNc_Vvf5Wg/view?utm_content=DAFhfNUAF2o&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
                sharer: 'Judith'
            },
            {
                title: '宇宙大哉問',
                slide: 'https://docs.google.com/presentation/d/105ZISSddPe97OTSFmOZ3HLUVC60q4QQQ4d-82dY1N3w/edit?usp=sharing',
                sharer: 'Ray'
            },
            {
                title: '這不是我們做事的方法！',
                slide: 'https://docs.google.com/presentation/d/16gHsjdShDAC8k_sCsoK-TOnSSst7L10ry58acO3E_b0/edit?usp=sharing',
                sharer: '乖'
            }
        ]
    },
    {
        id: 'a02',
        week: 2,
        date: new Date('2023-05-13'),
        host: '乖',
        content: [
            {
                title: '覺醒是與當下共舞',
                slide: 'https://docs.google.com/presentation/d/1-eFDbvW0kt4V_oLbSkgimj2-fu7MhQuauDN-NoPOju4/edit?usp=sharing',
                sharer: '乖'
            },
            {
                title: '灰階思考',
                slide: 'https://hackmd.io/@yv/BkQ9ByhE3#/',
                sharer: 'Yvonne'
            },
            {
                title: '刻意練習',
                slide: 'https://www.canva.com/design/DAFiwxdRitg/WVWR5C1RAv0DgyFiqM6V3g/view?utm_content=DAFiwxdRitg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
                sharer: 'Judith'
            },
            {
                title: '也許你該找人聊聊',
                slide: 'https://docs.google.com/presentation/d/1ZLuU5CVpMGuitoYfb2M5BSUZms8cdGpOp1SgSnLxaaQ/edit?usp=sharing',
                sharer: '啟綸'
            }
        ]
    },
    {
        id: 'a03',
        week: 3,
        date: new Date('2023-05-27'),
        host: '啟綸',
        content: [
            {
                title: '逆思維',
                slide: 'https://docs.google.com/presentation/d/1aB9CF7p7Xro7EHEnYCUuI5tNLM-UX64aF_X8bg5E2oA/edit?usp=sharing',
                sharer: '啟綸'
            },
            {
                title: '覺醒是與當下共舞',
                slide: 'https://www.canva.com/design/DAFkE6k-g-w/QPb-2g-KIaLot6gxbeT27Q/view?utm_content=DAFkE6k-g-w&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
                sharer: '乖'
            },
            {
                title: '有錢人想的和你不一樣',
                slide: 'https://www.canva.com/design/DAFkE8Sljds/dPFk4o6dxYSx6F39ZKo9-w/view?utm_content=DAFkE8Sljds&utm_campaign=designshare&utm_medium=link&utm_source=viewer',
                sharer: 'Judith'
            },
            {
                title: '鋼鐵人馬斯克',
                slide: 'https://docs.google.com/presentation/d/1sMyp2Emm8JzqXu56HWy40rSufHytwxM6MJjpvWs2_XQ/edit?usp=sharing',
                sharer: 'Yvonne'
            }
        ]
    },
    {
        id: 'a04',
        week: 4,
        date: new Date('2023-06-10'),
        host: 'Yvonne',
        content: [
            {
                title: '最高閒聊法',
                slide: 'https://docs.google.com/presentation/d/145kZ1S7dmWoLJJC4Ya6oznpxrj5l4YCZ8loki3r-Y8I/edit?usp=sharing',
                sharer: 'Yvonne'
            },
            {
                title: '困在大腦裡的人',
                slide: 'https://docs.google.com/presentation/d/13ogdqfecxken6p4RM65PaiGXifkVyoj1-koveyRrzjo/edit?usp=sharing',
                sharer: 'Ray'
            },
            {
                title: '有錢人想的和你不一樣',
                slide: 'https://www.canva.com/design/DAFkE8Sljds/dPFk4o6dxYSx6F39ZKo9-w/view?utm_content=DAFkE8Sljds&utm_campaign=designshare&utm_medium=link&utm_source=viewer',
                sharer: 'Judith'
            },
            {
                title: '覺醒是與當下共舞',
                slide: 'https://www.canva.com/design/DAFlZR0WK9Q/Kd8ipD75Z4mWITIRDkxFVg/edit?utm_content=DAFlZR0WK9Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
                sharer: '乖'
            }
        ]
    },
    {
        id: 'a05',
        week: 5,
        date: new Date('2023-07-01'),
        host: 'Ray',
        content: [
            {
                title: '超級思維',
                slide: 'https://docs.google.com/presentation/d/1lYGMWcGXo3MeAmLLi4QX_U7ojzVclxv41CaegoovVow/edit?usp=sharing',
                sharer: 'Ray'
            },
            {
                title: '最高閒聊法',
                slide: 'https://docs.google.com/presentation/d/145kZ1S7dmWoLJJC4Ya6oznpxrj5l4YCZ8loki3r-Y8I/edit?usp=sharing',
                sharer: 'Yvonne'
            },
            {
                title: '情緒治療',
                slide: 'https://www.canva.com/design/DAFnUX-I2hY/imvqIK_XGoeUFPjyTuOAKg/view?utm_content=DAFnUX-I2hY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
                sharer: 'Judith'
            }
        ]
    },
    {
        id: 'a06',
        week: 6,
        date: new Date('2023-07-16'),
        host: 'Judith',
        content: [
            {
                title: 'BACK TO EARTH',
                slide: 'https://docs.google.com/presentation/d/1WclHsAUNycsFJJc5R6ZPz_rBUn-A9uwzYMWW0BkeSAk/edit?usp=sharing',
                sharer: 'Yvonne'
            },
            {
                title: '我可能錯了',
                slide: 'https://www.canva.com/design/DAFou8p2SiY/w2SeLsu3GC0gcR6JGFQOZQ/view?utm_content=DAFou8p2SiY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
                sharer: 'Judith'
            },
            {
                title: '天生變態',
                slide: 'https://docs.google.com/presentation/d/1RTxbJ6CuBVshYUM9qQF8j8GhxnP86y7fBfSUWtGB6Ng/edit#slide=id.p',
                sharer: 'Ray'
            },
            {
                title: '原子時間',
                slide: '',
                sharer: '亦庭'
            },
            {
                title: '99%有效的故事行銷，創造品牌力',
                slide: 'https://www.canva.com/design/DAFoxfUIKGU/8oc9RHFtguogFPHOLpUlXQ/view?utm_content=DAFoxfUIKGU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
                sharer: '乖'
            }
        ]
    },
    {
        id: 'a07',
        week: 7,
        date: new Date('2023-07-30'),
        host: '乖',
        content: [
            {
                title: '寫作課',
                slide: 'https://www.canva.com/design/DAFqFPXyltg/cmESQgW6-PHNhe00IMp8tQ/view?utm_content=DAFqFPXyltg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
                sharer: 'Judith'
            },
            {
                title: '超速寫作',
                slide: 'https://www.canva.com/design/DAFqE8gPhhw/lVhNKDNdqDR96ikZvaYbSg/view?utm_content=DAFqE8gPhhw&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
                sharer: '乖'
            },
            {
                title: 'BACK TO EARTH',
                slide: 'https://docs.google.com/presentation/d/1WclHsAUNycsFJJc5R6ZPz_rBUn-A9uwzYMWW0BkeSAk/edit?usp=sharing',
                sharer: 'Yvonne'
            }
        ]
    },
    {
        id: 'a08',
        week: 8,
        date: new Date('2023-08-05'),
        host: 'Yvonne',
        content: [
            {
                title: 'BACK TO EARTH',
                slide: 'https://docs.google.com/presentation/d/1WclHsAUNycsFJJc5R6ZPz_rBUn-A9uwzYMWW0BkeSAk/edit?usp=sharing',
                sharer: 'Yvonne'
            },
            {
                title: '我可能錯了',
                slide: 'https://www.canva.com/design/DAFou8p2SiY/w2SeLsu3GC0gcR6JGFQOZQ/view?utm_content=DAFou8p2SiY&utm_campaign=designshare&utm_medium=link&utm_source=viewer',
                sharer: 'Judith'
            },
            {
                title: '原子習慣',
                slide: 'https://www.canva.com/design/DAFqpd3CGo4/I8cdJyOOJIk4B8xJI_vvVQ/view?utm_content=DAFqpd3CGo4&utm_campaign=designshare&utm_medium=link&utm_source=viewer',
                sharer: '乖'
            },
        ]
    },
    {
        id: 'a09',
        week: 9,
        date: new Date('2023-08-19'),
        host: '亦庭',
        content: [
            {
                title: '打破人生幻境的四個約定',
                slide: '',
                sharer: '亦庭'
            },
            {
                title: '量子領導',
                slide: 'https://www.canva.com/design/DAFr83-NikY/1HRyUD6QedbG4s4SialJ8w/view?utm_content=DAFr83-NikY&utm_campaign=designshare&utm_medium=link&utm_source=viewer',
                sharer: '乖'
            },
            {
                title: '情緒治療',
                slide: 'https://www.canva.com/design/DAFnUX-I2hY/imvqIK_XGoeUFPjyTuOAKg/view?utm_content=DAFnUX-I2hY&utm_campaign=designshare&utm_medium=link&utm_source=viewer',
                sharer: 'Judith'
            },
            {
                title: '白話演算法',
                slide: 'https://hackmd.io/@yv/BkIiyD3hh',
                sharer: 'Yvonne'
            },

        ]
    },
]

export default record;
