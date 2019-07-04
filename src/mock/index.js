var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
var mock = new MockAdapter(axios)
export default axios
var userName;
var isMock = true
if (isMock) {
    mock.onGet('/getShujuTouShi').reply(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: [{
                            title: '实体',
                            count: '3',
                            items: [{
                                    type: 'selectDown',
                                    itemId: 's1',
                                    itemTitle: '人物',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: [{
                                            childrenItemTitle: '外交官',
                                            childrenItemNum: '37',
                                            childrenItemPer: '18.3%',
                                        },
                                        {
                                            childrenItemTitle: '政治家',
                                            childrenItemNum: '19',
                                            childrenItemPer: '96%',
                                        },
                                        {
                                            childrenItemTitle: '军人',
                                            childrenItemNum: '20',
                                            childrenItemPer: '100%',
                                        },
                                        {
                                            childrenItemTitle: '恐怖分子',
                                            childrenItemNum: '12',
                                            childrenItemPer: '61.9%',
                                        }
                                    ]
                                },
                                {
                                    type: 'selectDown',
                                    itemId: 's2',
                                    itemTitle: '地点',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: [{
                                            childrenItemTitle: '国家',
                                            childrenItemNum: '14',
                                            childrenItemPer: '18.3%',
                                        },
                                        {
                                            childrenItemTitle: '地理坐标',
                                            childrenItemNum: '16',
                                            childrenItemPer: '96%',
                                        }
                                    ]
                                },
                                {
                                    type: 'selectDown',
                                    itemId: 's3',
                                    itemTitle: '机构',
                                    itemNum: '13',
                                    per: '100%',
                                    childrenItems: [{
                                            childrenItemTitle: '政党',
                                            childrenItemNum: '3',
                                            childrenItemPer: '18.3%',
                                        },
                                        {
                                            childrenItemTitle: '国际组织',
                                            childrenItemNum: '19',
                                            childrenItemPer: '96%',
                                        },
                                        {
                                            childrenItemTitle: '军事同盟',
                                            childrenItemNum: '20',
                                            childrenItemPer: '100%',
                                        },
                                        {
                                            childrenItemTitle: '区域组织',
                                            childrenItemNum: '12',
                                            childrenItemPer: '61.9%',
                                        },
                                        {
                                            childrenItemTitle: '组织',
                                            childrenItemNum: '12',
                                            childrenItemPer: '61.9%',
                                        },
                                        {
                                            childrenItemTitle: '企业',
                                            childrenItemNum: '12',
                                            childrenItemPer: '61.9%',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: '事件',
                            count: '20',
                            items: [{
                                    type: '',
                                    itemId: 'e1',
                                    itemTitle: '访问',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 'e2',
                                    itemTitle: '战争',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 'e3',
                                    itemTitle: '慰问',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 'e4',
                                    itemTitle: '地震',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 'e5',
                                    itemTitle: '会议',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 'e6',
                                    itemTitle: '武器',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                }
                            ]
                        },
                        {
                            title: '关系',
                            count: '20',
                            items: [{
                                    type: '',
                                    itemId: 't1',
                                    itemTitle: '夫妻',
                                    itemNum: '2',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 't2',
                                    itemTitle: '朋友',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 't3',
                                    itemTitle: '同盟',
                                    itemNum: '3',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 't4',
                                    itemTitle: '父子',
                                    itemNum: '3',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 't5',
                                    itemTitle: '总统',
                                    itemNum: '4',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 't6',
                                    itemTitle: '母女',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 't7',
                                    itemTitle: '校友',
                                    itemNum: '39',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 't8',
                                    itemTitle: '同事',
                                    itemNum: '22',
                                    per: '100%',
                                    childrenItems: []
                                },
                                {
                                    type: '',
                                    itemId: 't9',
                                    itemTitle: '师生',
                                    itemNum: '11',
                                    per: '100%',
                                    childrenItems: []
                                }
                            ]
                        }
                    ]
                }])
            }, 50)
        })
    })
    mock.onGet('/getNodeDataNew').reply(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: [{
                        'nodes': [{
                            'id': 'node12',
                            'type': 'person',
                            'name': '肖若晗',
                            'img': 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=53e28aef2f2dd42a4b0409f9625230d0/4a36acaf2edda3ccf81167a60be93901203f92bb.jpg',
                            'loaded': true
                        }],
                        'links': [{
                            'id': 'ss',
                            "className": "知识扩展关系",
                            'from': 'node3',
                            'to': 'node12',
                            'img': './src/dist/assets/images/ico/b2.ico',
                            'num': null,
                            'type': '朋友,同盟'
                        }]
                    }]
                }])
            }, 50)
        })
    })
    mock.onGet('/getXianggaunshiti').reply(config => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: [{}]
                }])
            }, 50)
        })
    })


    mock.onGet('/getWorkSpaceAddData').reply(config => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: [{

                        // ["Q22368", "Q315528", "Q233984"]
                        "nodes": [{
                            'Entity_type': "human",
                            'id': "Q22368",
                            'img': "http://10.60.1.143/pic_lib/padded/Q22368.png",
                            'loaded': true,
                            'name': "陈水扁"
                        }, {
                            'Entity_type': "human",
                            'id': "Q315528",
                            'img': "http://10.60.1.143/pic_lib/padded/Q315528.png",
                            'loaded': true,
                            'name': "李登辉"
                        }, {
                            'Entity_type': "human",
                            'id': "Q233984",
                            'img': "http://10.60.1.143/pic_lib/padded/Q233984.png",
                            'loaded': true,
                            'name': "蔡英文"
                        }]
                    }]
                }])
            }, 50)
        })
    })

    mock.onGet('/getSpreadEvent').reply(config => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: [{
                        'nodes': [{
                                'id': 'node01',
                                'Entity_type': 'event',
                                'name': '会面',
                                'img': '',
                                'time': '2019-01-01',
                                'loaded': true
                            },
                            {
                                'id': 'node02',
                                'Entity_type': 'event',
                                'name': '会面',
                                'img': '',
                                'time': '2019-01-01',
                                'loaded': true
                            }
                        ],
                        'links': [{
                                'id': 'event1',
                                "className": "",
                                'from': 'Q7747',
                                'to': 'node01',
                                'img': './src/dist/assets/images/ico/b2.ico',
                                'num': '1',
                                'Entity_type': 'event'
                            },
                            {
                                'id': 'event2',
                                "className": "",
                                'from': 'node01',
                                'to': 'Q22686',
                                'img': './src/dist/assets/images/ico/b2.ico',
                                'num': '1',
                                'Entity_type': 'event'
                            },
                            {
                                'id': 'event3',
                                "className": "",
                                'from': 'Q7747',
                                'to': 'node02',
                                'img': './src/dist/assets/images/ico/b2.ico',
                                'num': '1',
                                'Entity_type': 'event'
                            },
                            {
                                'id': 'event4',
                                "className": "",
                                'from': 'node02',
                                'to': 'Q22686',
                                'img': './src/dist/assets/images/ico/b2.ico',
                                'num': '1',
                                'Entity_type': 'event'
                            }
                        ]
                    }]
                }])
            }, 50)
        })
    })
    mock.onGet('/getContentInfo').reply(config => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    title: `回归实用主义 默克尔与普京就棘手问题“对表”`,
                    time: `2018-08-21 12:22 | 路透社`,
                    contents: ` <span class="contentInfoText">  德国总理</span><span class="contentInfoPeople">默克尔</span><span class="contentInfoText">18日在</span><span class='contentInfoPlace'>德国</span><span class="contentInfoText">首都</span><span class='contentInfoPlace'>柏林</span><span class="contentInfoText">以北的</span><span class='contentInfoPlace'>梅泽贝格小镇</span><span class="contentInfoText">与来访的俄罗斯总统普京举行会谈，探讨了乌克兰局势、叙利亚冲突以及双边合作等问题。德俄两国领导人今年互动频繁，这是默克尔和普京近三个月内的第二次会晤，上月默克尔还与俄外长拉夫罗夫以及俄武装力量总参谋长格拉西莫夫举行了会晤。三小时闭门会谈默克尔和普京当天举行了三小时左右的闭门会谈。两国领导人打破常规，在会谈前召开记者会，发表对国际热点问题以及双边关系的看法。在谈到乌克兰问题时，默克尔说，明斯克协议仍是基础，她将与普京讨论联合国维和部队驻扎乌克兰东部的可能性。普京对乌克兰危机解决没有取得进展表示遗憾，并强调明斯克协议具有不可替代的作用。

          　　关于叙利亚冲突，默克尔强调首先应避免在叙北部伊德利卜省发生人道主义灾难。普京则敦促欧洲增加对叙利亚的人道主义援助，帮助叙利亚难民返回祖国。在双边关系方面，默克尔表示，今年俄罗斯和德国举办地区合作主题年，这有助于增加彼此了解。普京说，俄罗斯重视与德国在经济等领域开展互利合作，去年双边贸易额增长22%，今年预计将增长25%。俄总统新闻秘书佩斯科夫在闭门会谈结束后说，会谈非常有益而且细致，双方就一系列问题进行了“对表”。他说，普京与默克尔支持在俄罗斯、德国、法国、土耳其四国框架内讨论叙利亚问题，并共同呼吁欧盟帮助叙利亚难民返乡。
          
          　　备受美国特朗普政府抨击的“北溪－2”天然气管道项目是此次会谈的重点。两国领导人强调，该项目是纯粹的经济合作项目，不应该被“政治化”。根据欧洲统计局数据，德国进口天然气中的50%至75%来自俄罗斯。“北溪－2”经波罗的海直接连通俄德两国，其建成通气后，不仅可满足德国的天然气需要，也将帮助德国成为俄天然气输往其他欧洲国家的重要枢纽。美国担心这将增加西欧尤其是德国对俄罗斯能源的依赖和俄罗斯在西欧的影响力，希望德国等国购买美国生产的天然气，因此极力反对这一项目。普京在记者会上说，俄方正在与德方就“北溪－2”项目展开合作，该项目能够完善欧洲的天然气运输系统，满足欧洲日益增长的能源需求。除美国以外，乌克兰等东欧国家也强烈反对“北溪－2”项目，担心该项目建成后会导致俄罗斯停止通过现有管线经它们向欧洲供应天然气，使其失去每年数十亿欧元过境费和能源转运这一地缘政治工具。
          
          　　对此，普京强调，“北溪－2”项目完成后，俄罗斯不会终止通过乌克兰向欧洲输送天然气。默克尔表示，乌克兰应当在向欧洲输送俄罗斯天然气的领域中继续发挥作用。由于特朗普政府威胁要制裁参与“北溪－2”项目的公司，默克尔还与普京讨论了制裁的应对措施。分析人士指出，特朗普政府一直向德国政府施压，企图迫使德国放弃“北溪－2”项目并停止从俄罗斯购买天然气。乌克兰危机爆发后，俄罗斯与德国关系恶化。两国至今在乌克兰问题上依然矛盾重重，对叙利亚巴沙尔政权的命运也存在意见分歧。尽管如此，由于国际形势以及美欧关系的变化，德俄两国正在一些拥有利益契合点的领域开展务实合作。
          
          　　默克尔在与普京会晤前表示，德国希望与俄罗斯拥有良好关系。双方有争议，也有共同点，而在这些共同点上，双方将改善关系、加强合作。德国媒体《焦点在线》17日刊文说，虽然两国领导人讨论的话题很棘手，但两国实际上已经开始在一些国际事务中展开合作。
          
          　　德国外交政策协会俄罗斯问题专家斯特凡·迈斯特认为，此次会晤是德俄关系的转折点，意味着实用主义的回归。虽然乌克兰危机仍未解决，但“北溪－2”项目、叙利亚问题以及美国当前的外交政策等迫使德俄双方选择实用主义政策。
          
          　　备受美国特朗普政府抨击的“北溪－2”天然气管道项目是此次会谈的重点。两国领导人强调，该项目是纯粹的经济合作项目，不应该被“政治化”。根据欧洲统计局数据，德国进口天然气中的50%至75%来自俄罗斯。“北溪－2”经波罗的海直接连通俄德两国，其建成通气后，不仅可满足德国的天然气需要，也将帮助德国成为俄天然气输往其他欧洲国家的重要枢纽。美国担心这将增加西欧尤其是德国对俄罗斯能源的依赖和俄罗斯在西欧的影响力，希望德国等国购买美国生产的天然气，因此极力反对这一项目。普京在记者会上说，俄方正在与德方就“北溪－2”项目展开合作，该项目能够完善欧洲的天然气运输系统，满足欧洲日益增长的能源需求。除美国以外，乌克兰等东欧国家也强烈反对“北溪－2”项目，担心该项目建成后会导致俄罗斯停止通过现有管线经它们向欧洲供应天然气，使其失去每年数十亿欧元过境费和能源转运这一地缘政治工具。
          
          　　对此，普京强调，“北溪－2”项目完成后，俄罗斯不会终止通过乌克兰向欧洲输送天然气。默克尔表示，乌克兰应当在向欧洲输送俄罗斯天然气的领域中继续发挥作用。由于特朗普政府威胁要制裁参与“北溪－2”项目的公司，默克尔还与普京讨论了制裁的应对措施。分析人士指出，特朗普政府一直向德国政府施压，企图迫使德国放弃“北溪－2”项目并停止从俄罗斯购买天然气。乌克兰危机爆发后，俄罗斯与德国关系恶化。两国至今在乌克兰问题上依然矛盾重重，对叙利亚巴沙尔政权的命运也存在意见分歧。尽管如此，由于国际形势以及美欧关系的变化，德俄两国正在一些拥有利益契合点的领域开展务实合作。
          
          　　默克尔在与普京会晤前表示，德国希望与俄罗斯拥有良好关系。双方有争议，也有共同点，而在这些共同点上，双方将改善关系、加强合作。德国媒体《焦点在线》17日刊文说，虽然两国领导人讨论的话题很棘手，但两国实际上已经开始在一些国际事务中展开合作。
          
          　　德国外交政策协会俄罗斯问题专家斯特凡·迈斯特认为，此次会晤是德俄关系的转折点，意味着实用主义的回归。虽然乌克兰危机仍未解决，但“北溪－2”项目、叙利亚问题以及美国当前的外交政策等迫使德俄双方选择实用主义政策。新华社记者 任珂 李奥
          </span>`
                }])
            }, 500)
        })
    })
    mock.onGet('/getPersonInfo').reply(config => {
        var resultArr = [{
                label: 'Wael_Ghonim',
                value: 'node1'
            },
            {
                label: 'Joseph_Stiglitz',
                value: 'node2'
            },
            {
                label: 'Reed_Hastings',
                value: '3'
            },
            {
                label: 'Amy_Poehler',
                value: '4'
            },
            {
                label: 'Geoffrey_Canada',
                value: '5'
            },
            {
                label: 'Mark_Zuckerberg',
                value: '6'
            },
            {
                label: 'Peter_Vesterbacka',
                value: '7'
            },
            {
                label: 'Angela_Merkel',
                value: 'Angela_Merkel'
            },
            {
                label: 'Julian_Assange',
                value: 'Julian_Assange'
            },
            {
                label: 'Ron_Bruder',
                value: 'Ron_Bruder'
            },
            {
                label: 'Lamido_Sanusi',
                value: 'Lamido_Sanusi'
            },
            {
                label: 'Colin_Firth',
                value: 'Colin_Firth'
            },
            {
                label: 'Amy_Chua',
                value: 'Amy_Chua'
            },
            {
                label: 'Joe_Biden',
                value: 'Joe_Biden'
            },
            {
                label: 'Jennifer_Egan',
                value: 'Jennifer_Egan'
            },
            {
                label: 'Kim_Clijsters',
                value: 'Kim_Clijsters'
            },
            {
                label: 'Ahmed_Shuja_Pasha',
                value: 'Ahmed_Shuja_Pasha'
            },
            {
                label: 'Aung_San_Suu_Kyi',
                value: 'Aung_San_Suu_Kyi'
            },
            {
                label: 'Cory_Booker',
                value: 'Cory_Booker'
            },
            {
                label: 'Gabrielle_Giffords',
                value: 'Gabrielle_Giffords'
            },
            {
                label: 'Katsunobu_Sakurai',
                value: 'Katsunobu_Sakurai'
            },
            {
                label: 'Michelle_Obama',
                value: 'Michelle_Obama'
            },
            {
                label: 'Paul_Ryan',
                value: 'Paul_Ryan'
            },
            {
                label: 'Ai_Weiwei（艾）',
                value: 'Ai_Weiwei（艾）'
            },
            {
                label: 'Rob_Bell',
                value: 'Rob_Bell'
            },
            {
                label: 'Fathi_Terbil',
                value: 'Fathi_Terbil'
            },
            {
                label: 'Dilma_Rousseff',
                value: 'Dilma_Rousseff'
            },
            {
                label: 'Tom_Ford',
                value: 'Tom_Ford'
            },
            {
                label: 'Liang_Guanglie（梁）',
                value: 'Liang_Guanglie（梁）'
            },
            {
                label: 'Sue_Savage-Rumbaugh',
                value: 'Sue_Savage-Rumbaugh'
            },
            {
                label: 'Takeshi_Kanno',
                value: 'Takeshi_Kanno'
            },
            {
                label: 'Nicolas_Sarkozy',
                value: 'Nicolas_Sarkozy'
            },
            {
                label: 'Michele_Bachmann',
                value: 'Michele_Bachmann'
            },
            {
                label: 'Saad_Mohseni',
                value: 'Saad_Mohseni'
            },
            {
                label: 'Chris_Christie',
                value: 'Chris_Christie'
            },
            {
                label: 'Matthew_Weiner',
                value: 'Matthew_Weiner'
            },
            {
                label: 'Lisa_Jackson',
                value: 'Lisa_Jackson'
            },
            {
                label: 'Jean-Claude_Trichet',
                value: 'Jean-Claude_Trichet'
            },
            {
                label: 'Justin_Bieber',
                value: 'Justin_Bieber'
            },
            {
                label: 'Prince_William_and_Kate_Middleton',
                value: 'Prince_William_and_Kate_Middleton'
            },
            {
                label: 'Joe_Scarborough',
                value: 'Joe_Scarborough'
            },
            {
                label: 'Blake_Lively',
                value: 'Blake_Lively'
            },
            {
                label: 'Hillary_Clinton',
                value: 'Hillary_Clinton'
            },
            {
                label: 'Muqtada_al-Sadr',
                value: 'Muqtada_al-Sadr'
            },
            {
                label: 'Anwar_al-Awlaki',
                value: 'Anwar_al-Awlaki'
            },
            {
                label: 'Kim_Jong_Un',
                value: 'Kim_Jong_Un'
            },
            {
                label: 'Saif_al-Islam_Gaddafi',
                value: 'Saif_al-Islam_Gaddafi'
            },
            {
                label: 'Hassan_Nasrallah',
                value: 'Hassan_Nasrallah'
            },
            {
                label: 'Nathan_Wolfe',
                value: 'Nathan_Wolfe'
            },
            {
                label: 'Oprah_Winfrey',
                value: 'Oprah_Winfrey'
            },
            {
                label: 'Sergio_Marchionne',
                value: 'Sergio_Marchionne'
            },
            {
                label: 'Mahendra_Singh_Dhoni',
                value: 'Mahendra_Singh_Dhoni'
            },
            {
                label: 'Felisa_Wolfe-Simon',
                value: 'Felisa_Wolfe-Simon'
            },
            {
                label: 'Esther_Duflo',
                value: 'Esther_Duflo'
            },
            {
                label: 'Rain',
                value: 'Rain'
            },
            {
                label: 'Larry_Page',
                value: 'Larry_Page'
            },
            {
                label: 'Mia_Wasikowska',
                value: 'Mia_Wasikowska'
            },
            {
                label: 'David_Cameron',
                value: 'David_Cameron'
            },
            {
                label: 'John_Lasseter',
                value: 'John_Lasseter'
            },
            {
                label: 'Maria_Bashir',
                value: 'Maria_Bashir'
            },
            {
                label: 'Mukesh_Ambani',
                value: 'Mukesh_Ambani'
            },
            {
                label: 'Chris_Colfer',
                value: 'Chris_Colfer'
            },
            {
                label: 'Major_General_Margaret_Woodward',
                value: 'Major_General_Margaret_Woodward'
            },
            {
                label: 'Bruno_Mars',
                value: 'Bruno_Mars'
            },
            {
                label: 'David_and_Charles_Koch',
                value: 'David_and_Charles_Koch'
            },
            {
                label: 'Hung_Huang（洪晃）',
                value: 'Hung_Huang（洪晃）'
            },
            {
                label: 'General_David_Petraeus',
                value: 'General_David_Petraeus'
            },
            {
                label: 'Matt_Damon_and_Gary_White',
                value: 'Matt_Damon_and_Gary_White'
            },
            {
                label: 'Cecile_Richards',
                value: 'Cecile_Richards'
            },
            {
                label: 'George_R.R._Martin',
                value: 'George_R.R._Martin'
            },
            {
                label: 'Marine_Le_Pen',
                value: 'Marine_Le_Pen'
            },
            {
                label: 'Grant_Achatz',
                value: 'Grant_Achatz'
            },
            {
                label: 'Feisal_Abdul_Rauf',
                value: 'Feisal_Abdul_Rauf'
            },
            {
                label: 'El_Général',
                value: 'El_Général'
            },
            {
                label: 'Jamie_Dimon',
                value: 'Jamie_Dimon'
            },
            {
                label: 'Heidi_Murkoff',
                value: 'Heidi_Murkoff'
            },
            {
                label: 'Sting',
                value: 'Sting'
            },
            {
                label: 'Jonathan_Franzen',
                value: 'Jonathan_Franzen'
            },
            {
                label: 'V.S._Ramachandran',
                value: 'V.S._Ramachandran'
            },
            {
                label: 'Michelle_Rhee',
                value: 'Michelle_Rhee'
            },
            {
                label: 'Mark_Wahlberg',
                value: 'Mark_Wahlberg'
            },
            {
                label: 'Rebecca_Eaton',
                value: 'Rebecca_Eaton'
            },
            {
                label: 'Xi_Jinping（习）',
                value: 'Xi_Jinping（习）'
            },
            {
                label: 'Kathy_Giusti',
                value: 'Kathy_Giusti'
            },
            {
                label: 'Arianna_Huffington',
                value: 'Arianna_Huffington'
            },
            {
                label: 'Barack_Obama',
                value: 'Barack_Obama'
            },
            {
                label: 'Lionel_Messi',
                value: 'Lionel_Messi'
            },
            {
                label: 'Azim_Premji',
                value: 'Azim_Premji'
            },
            {
                label: 'Aruna_Roy',
                value: 'Aruna_Roy'
            },
            {
                label: 'Ray_Chambers',
                value: 'Ray_Chambers'
            },
            {
                label: 'Scott_Rudin',
                value: 'Scott_Rudin'
            },
            {
                label: 'John_Boehner',
                value: 'John_Boehner'
            },
            {
                label: 'Derrick_Rossi',
                value: 'Derrick_Rossi'
            },
            {
                label: 'Hu_Shuli（胡舒立）',
                value: 'Hu_Shuli（胡舒立）'
            },
            {
                label: 'Benjamin_Netanyahu',
                value: 'Benjamin_Netanyahu'
            },
            {
                label: 'Ayman_Mohyeldin',
                value: 'Ayman_Mohyeldin'
            },
            {
                label: 'Charles_Chao（曹国伟）',
                value: 'Charles_Chao（曹国伟）'
            },
            {
                label: 'Bineta_Diop',
                value: 'Bineta_Diop'
            },
            {
                label: 'Dharma_Master_Cheng_Yen（证严法师）',
                value: 'Dharma_Master_Cheng_Yen（证严法师）'
            }
        ];

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // var r = resultArr.filter(function (x) {return x.indexOf(config.name) > 0});
                resolve([200, {
                    code: 0,
                    // data:resultArr.filter(function (x) {return x.indexOf(config.name) > 0})
                    data: resultArr.filter(function(x) {
                            return x.label.indexOf(config.name) > 0
                        })
                        // message: '修改成功'
                }])
            }, 500)
        })
    })
    mock.onGet('/getContent').reply(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: [{
                            'id': '1',
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'id': '2',
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'id': '3',
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'id': '4',
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                  个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                  下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'id': '5',
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'id': '6',
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                    个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                    下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'id': '7',
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                      个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                      下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                        个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                        下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                          个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                          下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                            个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                            下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                  个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                  下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                    个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                    下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                      个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                      下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                        个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                        下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                          个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                          下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                            个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                            下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                              个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                              下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京回应美国对俄新一轮制裁适得其反 毫无意义',
                            'text': '海外网8月22日电 美国财政部21日以规避或违反美国制裁禁令为由，宣布对与俄罗斯相关…',
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        },
                        {
                            'title': '普京：其实我当总统只是为了救一个人',
                            'text': `说到普京，我们都知道他是俄罗斯总统，以前，曾当过克格勃。但是你却并不一定了解，他是怎样…
                                个普通的克格勃，一步步走进权力中枢，最终成为总统的。
                                下面，我们就来说说，他究竟是靠什么，一步登天的。`,
                            'time': '2018-04-21 12:34',
                            'from': '海外网'
                        }
                    ]
                }])
            })
        })
    })
    mock.onGet('/getNodeData').reply(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: [{
                        'nodes': [{
                                'id': 'node1',
                                'type': 'person',
                                'name': '普京',
                                'img': 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=53e28aef2f2dd42a4b0409f9625230d0/4a36acaf2edda3ccf81167a60be93901203f92bb.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node2',
                                'type': 'person',
                                'name': '习近平',
                                'img': 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=468864cdf0039245b5b8e95de6fdcfa7/54fbb2fb43166d22ca0c87944a2309f79052d2b3.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node3',
                                'type': 'person',
                                'name': '彭丽媛',
                                'img': 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=434d2d780cd79123f4ed9c26cc5d32e7/d788d43f8794a4c2f4d39a5b0ef41bd5ac6e39c9.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node4',
                                'type': 'person',
                                'name': '默尔克',
                                'img': 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=5b13b4f4c4fcc3cea0cdc161f32cbded/279759ee3d6d55fbaef84ef061224f4a20a4dd2d.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node5',
                                'type': 'person',
                                'name': '奥巴马',
                                'img': 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=d2196c373efae6cd18b9a3336eda6441/f703738da9773912f6290861f3198618367ae2a7.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node6',
                                'type': 'person',
                                'name': '安倍晋三',
                                'img': 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike220%2C5%2C5%2C220%2C73/sign=5f9e4ba500f431ada8df4b6b2a5fc7ca/f2deb48f8c5494ee1d36a12e21f5e0fe99257ef5.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node7',
                                'type': 'person',
                                'name': '小泉纯一郎',
                                'img': 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=179c227a4e10b912abccfeaca2949766/09fa513d269759eee7e0050abbfb43166c22dfbb.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node8',
                                'type': 'person',
                                'name': '金正恩',
                                'img': 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=aebe0389cc5c10383073c690d378f876/9a504fc2d5628535a233d1b29aef76c6a6ef6355.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node9',
                                'type': 'person',
                                'name': '梅德韦杰夫',
                                'img': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=472b782bd843ad4bb2234e92e36b31ca/359b033b5bb5c9ea8bd6866ddc39b6003af3b313.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node10',
                                'type': 'person',
                                'name': '普京娜',
                                'img': 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=ed3b89f69358d109d0eea1e0b031a7da/377adab44aed2e73bbbb6ca48601a18b86d6faec.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'node11',
                                'type': 'person',
                                'name': '胡锦涛',
                                'img': 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=6d88c0a5cd177f3e0439f45f11a650a2/0bd162d9f2d3572cad9fcecf8e13632762d0c3a0.jpg',
                                'loaded': true
                            },

                            {
                                'id': 'country1',
                                'type': 'country',
                                'name': '美国',
                                'img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535718953068&di=5cbd5bfea037e548c4f6ceab019ada0c&imgtype=0&src=http%3A%2F%2Fphoto.quanmeishi.com%2Fuploads%2Fimage%2F131022%2F2561284_1016655_3a59726de3_o.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'country2',
                                'type': 'country',
                                'name': '日本',
                                'img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535718805386&di=7f7dc8152969474123c6da6ea2ba9a64&imgtype=0&src=http%3A%2F%2Fphoto.quanmeishi.com%2Fuploads%2Fimage%2F131023%2F2561973_1016655_c35c32bc94_o.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'country3',
                                'type': 'country',
                                'name': '朝鲜',
                                'img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535718773973&di=c3e3e1768e70ec219265bb989b0a968c&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Ff703738da9773912a1015f82ff198618367ae22a.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'country4',
                                'type': 'country',
                                'name': '韩国',
                                'img': 'http://www.cn-kr.net/upload/newsimg/20160414/1460601962201603.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'country5',
                                'type': 'country',
                                'name': '中国',
                                'img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535954333486&di=9206833a3b4d5ea8464497f04857c7ae&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F00%2F04%2F64T58PIC2Hi.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'country6',
                                'type': 'country',
                                'name': '德国',
                                'img': 'http://photo.quanmeishi.com/uploads/image/131023/2562220_1016655_7dd5b4e849_o.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'organization1',
                                'type': 'organization',
                                'name': '女权组织',
                                'img': 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=13f9d09b0b55b31988f48a2722c0e943/faf2b2119313b07e76bacc920dd7912397dd8c21.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'organization2',
                                'type': 'organization',
                                'name': 'G20峰会',
                                'img': 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=b2d5b58c04f41bd5ce5ee0a630b3eaae/91529822720e0cf318011c5c0046f21fbf09aaa7.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'organization3',
                                'type': 'organization',
                                'name': '八国集团',
                                'img': 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=73122d6b9a529822113e3191b6a310ae/c75c10385343fbf28720b78fba7eca8065388f09.jpg',
                                'loaded': true
                            },
                            {
                                'id': 'organization4',
                                'type': 'organization',
                                'name': '上海合作组织',
                                'img': 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=ea083711dd58ccbf0fb1bd6878b1d75b/377adab44aed2e73d202188f8b01a18b86d6faae.jpg',
                                'loaded': true
                            }
                        ],
                        'links': [{
                                'id': 'link1',
                                "className": "知识扩展关系",
                                'from': 'node1',
                                'to': 'node2',
                                'img': './src/dist/assets/images/ico/b1.ico',
                                'num': null,
                                'type': '朋友,同盟'
                            },
                            {
                                'id': 'link2',
                                "className": "事件扩展关系",
                                'from': 'node1',
                                'to': 'node2',
                                'img': './src/dist/assets/images/ico/b2.ico',
                                'num': 20,
                                'type': ''
                            },
                            {
                                'id': 'link3',
                                "className": "事件扩展关系",
                                'from': 'node1',
                                'to': 'node4',
                                'num': 3,
                                'type': ''
                            },
                            {
                                'id': 'link4',
                                "className": "事件扩展关系",
                                'from': 'node1',
                                'to': 'country1',
                                'num': 30,
                                'type': ''
                            },
                            {
                                'id': 'link5',
                                "className": "事件扩展关系",
                                'from': 'node1',
                                'to': 'country2',
                                'num': 13,
                                'type': ''
                            },
                            {
                                'id': 'link6',
                                "className": "事件扩展关系",
                                'from': 'node1',
                                'to': 'node7',
                                'num': 9,
                                'type': ''
                            },
                            {
                                'id': 'link7',
                                "className": "知识扩展关系",
                                'from': 'node1',
                                'to': 'node7',
                                'num': null,
                                'type': '中立'
                            },
                            {
                                'id': 'link8',
                                "className": "事件扩展关系",
                                'from': 'node1',
                                'to': 'country3',
                                'num': 7,
                                'type': ''
                            },
                            {
                                'id': 'link9',
                                "className": "知识扩展关系",
                                'from': 'node2',
                                'to': 'country5',
                                'num': null,
                                'type': '领导人'
                            },
                            {
                                'id': 'link10',
                                "className": "事件扩展关系",
                                'from': 'node2',
                                'to': 'node3',
                                'num': 11,
                                'type': ''
                            },
                            {
                                'id': 'link11',
                                "className": "知识扩展关系",
                                'from': 'node2',
                                'to': 'node3',
                                'num': null,
                                'type': '夫妻'
                            },
                            {
                                'id': 'link12',
                                "className": "知识扩展关系",
                                'from': 'node2',
                                'to': 'organization2',
                                'num': null,
                                'type': '参与'
                            },
                            {
                                'id': 'link13',
                                "className": "知识扩展关系",
                                'from': 'node2',
                                'to': 'node4',
                                'num': null,
                                'type': '中立'
                            },
                            {
                                'id': 'link14',
                                "className": "事件扩展关系",
                                'from': 'node2',
                                'to': 'node4',
                                'num': 5,
                                'type': ''
                            },
                            {
                                'id': 'link15',
                                "className": "知识扩展关系",
                                'from': 'node4',
                                'to': 'organization2',
                                'num': null,
                                'type': '参与'
                            },
                            {
                                'id': 'link16',
                                "className": "知识扩展关系",
                                'from': 'node4',
                                'to': 'organization1',
                                'num': null,
                                'type': '支持'
                            },
                            {
                                'id': 'link17',
                                "className": "知识扩展关系",
                                'from': 'node4',
                                'to': 'country6',
                                'num': null,
                                'type': '领导人'
                            },
                            {
                                'id': 'link18',
                                "className": "知识扩展关系",
                                'from': 'node4',
                                'to': 'node5',
                                'num': null,
                                'type': '同盟,朋友'
                            },
                            {
                                'id': 'link19',
                                "className": "事件扩展关系",
                                'from': 'node4',
                                'to': 'node5',
                                'num': 3,
                                'type': ''
                            },
                            {
                                'id': 'link20',
                                "className": "事件扩展关系",
                                'from': 'country1',
                                'to': 'country6',
                                'num': 3,
                                'type': ''
                            },
                            {
                                'id': 'link21',
                                "className": "知识扩展关系",
                                'from': 'node5',
                                'to': 'country1',
                                'num': null,
                                'type': '领导人'
                            },
                            {
                                'id': 'link22',
                                "className": "事件扩展关系",
                                'from': 'node5',
                                'to': 'country1',
                                'num': 3,
                                'type': ''
                            },
                            {
                                'id': 'link23',
                                "className": "事件扩展关系",
                                'from': 'node5',
                                'to': 'node6',
                                'num': 12,
                                'type': ''
                            },
                            {
                                'id': 'link24',
                                "className": "知识扩展关系",
                                'from': 'node5',
                                'to': 'node6',
                                'num': null,
                                'type': '同盟,朋友'
                            },
                            {
                                'id': 'link25',
                                "className": "知识扩展关系",
                                'from': 'node6',
                                'to': 'node7',
                                'num': null,
                                'type': '朋友'
                            },
                            {
                                'id': 'link26',
                                "className": "知识扩展关系",
                                'from': 'node7',
                                'to': 'country2',
                                'num': null,
                                'type': '领导人'
                            },
                            {
                                'id': 'link27',
                                "className": "知识扩展关系",
                                'from': 'country3',
                                'to': 'country5',
                                'num': 13,
                                'type': '同盟'
                            },
                            {
                                'id': 'link28',
                                "className": "知识扩展关系",
                                'from': 'country3',
                                'to': 'country4',
                                'num': null,
                                'type': '敌对'
                            },
                            {
                                'id': 'link29',
                                "className": "知识扩展关系",
                                'from': 'node8',
                                'to': 'country3',
                                'num': null,
                                'type': '领导人'
                            },
                            {
                                'id': 'link30',
                                "className": "知识扩展关系",
                                'from': 'country3',
                                'to': 'organization3',
                                'num': null,
                                'type': '参与'
                            },
                            {
                                'id': 'link31',
                                "className": "知识扩展关系",
                                'from': 'country2',
                                'to': 'organization3',
                                'num': null,
                                'type': '参与'
                            }
                        ]
                    }]
                }])
            }, 500)
        })
    })
    mock.onGet('/getTimeListNew').reply(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: [
                        [1478529000000, 110.08, 110.51, 109.46, 110.41, 32560000],
                        [1478615400000, 110.31, 111.72, 109.7, 111.06, 24054500],
                        [1478701800000, 109.88, 111.32, 108.05, 110.88, 59176400],
                        [1478788200000, 111.09, 111.09, 105.83, 107.79, 57134500],
                        [1478874600000, 107.12, 108.87, 106.55, 108.43, 34094100],
                        [1479133800000, 107.71, 107.81, 104.08, 105.71, 51175500],
                        [1479220200000, 106.57, 107.68, 106.16, 107.11, 32264500],
                        [1479306600000, 106.7, 110.23, 106.6, 109.99, 58840500],
                        [1479393000000, 109.81, 110.35, 108.83, 109.95, 27632000],
                        [1479479400000, 109.72, 110.54, 109.66, 110.06, 28428900],
                        [1479738600000, 110.12, 111.99, 110.01, 111.73, 29264600],
                        [1479825000000, 111.95, 112.42, 111.4, 111.8, 25965500],
                        [1479911400000, 111.36, 111.51, 110.33, 111.23, 27426400],
                        [1480084200000, 111.13, 111.87, 110.95, 111.79, 11475900],
                        [1480343400000, 111.43, 112.47, 111.39, 111.57, 27194000],
                        [1480429800000, 110.78, 112.03, 110.07, 111.46, 28528800],
                        [1480516200000, 111.6, 112.2, 110.27, 110.52, 36162300],
                        [1480602600000, 110.37, 110.94, 109.03, 109.49, 37086900],
                        [1480689000000, 109.17, 110.09, 108.85, 109.9, 26528000],
                        [1480948200000, 110, 110.03, 108.25, 109.11, 34324500],
                        [1481034600000, 109.5, 110.36, 109.19, 109.95, 26195500],
                        [1481121000000, 109.26, 111.19, 109.16, 111.03, 29998700],
                        [1481207400000, 110.86, 112.43, 110.6, 112.12, 27068300],
                        [1481293800000, 112.31, 114.7, 112.31, 113.95, 34402600],
                        [1481553000000, 113.29, 115, 112.49, 113.3, 26374400],
                        [1481639400000, 113.84, 115.92, 113.75, 115.19, 43733800],
                        [1481725800000, 115.04, 116.2, 114.98, 115.19, 34031800],
                        [1481812200000, 115.38, 116.73, 115.23, 115.82, 46524500],
                        [1481898600000, 116.47, 116.5, 115.65, 115.97, 44351100],
                        [1482157800000, 115.8, 117.38, 115.75, 116.64, 27779400],
                        [1482244200000, 116.74, 117.5, 116.68, 116.95, 21425000],
                        [1482330600000, 116.8, 117.4, 116.78, 117.06, 23783200],
                        [1482417000000, 116.35, 116.51, 115.64, 116.29, 26085900],
                        [1482503400000, 115.59, 116.52, 115.59, 116.52, 14249500],
                        [1482849000000, 116.52, 117.8, 116.49, 117.26, 18296900],
                        [1482935400000, 117.52, 118.02, 116.2, 116.76, 20905900],
                        [1483021800000, 116.45, 117.11, 116.4, 116.73, 15039500],
                        [1483108200000, 116.65, 117.2, 115.43, 115.82, 30586300],
                        [1483453800000, 115.8, 116.33, 114.76, 116.15, 28781900],
                        [1483540200000, 115.85, 116.51, 115.75, 116.02, 21118100],
                        [1483626600000, 115.92, 116.86, 115.81, 116.61, 22193600],
                        [1483713000000, 116.78, 118.16, 116.47, 117.91, 31751900],
                        [1483972200000, 117.95, 119.43, 117.94, 118.99, 33561900],
                        [1484058600000, 118.77, 119.38, 118.3, 119.11, 24462100],
                        [1484145000000, 118.74, 119.93, 118.6, 119.75, 27588600],
                        [1484231400000, 118.9, 119.3, 118.21, 119.25, 27086200],
                        [1484317800000, 119.11, 119.62, 118.81, 119.04, 26111900],
                        [1484663400000, 118.34, 120.24, 118.22, 120, 34439800],
                        [1484749800000, 120, 120.5, 119.71, 119.99, 23713000],
                        [1484836200000, 119.4, 120.09, 119.37, 119.78, 25597300],
                        [1484922600000, 120.45, 120.45, 119.73, 120, 32597900],
                        [1485181800000, 120, 120.81, 119.77, 120.08, 22050200],
                        [1485268200000, 119.55, 120.1, 119.5, 119.97, 23211000],
                        [1485354600000, 120.42, 122.1, 120.28, 121.88, 32377600],
                        [1485441000000, 121.67, 122.44, 121.6, 121.94, 26337600],
                        [1485527400000, 122.14, 122.35, 121.6, 121.95, 20562900],
                        [1485786600000, 120.93, 121.63, 120.66, 121.63, 30377500],
                        [1485873000000, 121.15, 121.39, 120.62, 121.35, 49201000],
                        [1485959400000, 127.03, 130.49, 127.01, 128.75, 111985000],
                        [1486045800000, 127.98, 129.39, 127.78, 128.53, 33710400],
                        [1486132200000, 128.31, 129.19, 128.16, 129.08, 24507300],
                        [1486391400000, 129.13, 130.5, 128.9, 130.29, 26845900],
                        [1486477800000, 130.54, 132.09, 130.45, 131.53, 38183800],
                        [1486564200000, 131.35, 132.22, 131.22, 132.04, 23004100],
                        [1486650600000, 131.65, 132.45, 131.12, 132.42, 28349900],
                        [1486737000000, 132.46, 132.94, 132.05, 132.12, 20065500],
                        [1486996200000, 133.08, 133.82, 132.75, 133.29, 23035400],
                        [1487082600000, 133.47, 135.09, 133.25, 135.02, 33226200],
                        [1487169000000, 135.52, 136.27, 134.62, 135.51, 35623100],
                        [1487255400000, 135.67, 135.9, 134.84, 135.35, 22584600],
                        [1487341800000, 135.1, 135.83, 135.1, 135.72, 22198200],
                        [1487687400000, 136.23, 136.75, 135.98, 136.7, 24507200],
                        [1487773800000, 136.43, 137.12, 136.11, 137.11, 20836900],
                        [1487860200000, 137.38, 137.48, 136.3, 136.53, 20788200],
                        [1487946600000, 135.91, 136.66, 135.28, 136.66, 21776600],
                        [1488205800000, 137.14, 137.44, 136.28, 136.93, 20257400],
                        [1488292200000, 137.08, 137.44, 136.7, 136.99, 23482900],
                        [1488378600000, 137.89, 140.15, 137.6, 139.79, 36414600],
                        [1488465000000, 140, 140.28, 138.76, 138.96, 26211000],
                        [1488551400000, 138.78, 139.83, 138.59, 139.78, 21108100],
                        [1488810600000, 139.37, 139.77, 138.6, 139.34, 21750000],
                        [1488897000000, 139.06, 139.98, 138.79, 139.52, 17446300],
                        [1488983400000, 138.95, 139.8, 138.82, 139, 18707200],
                        [1489069800000, 138.74, 138.79, 137.05, 138.68, 22155900],
                        [1489156200000, 139.25, 139.36, 138.64, 139.14, 19612800],
                        [1489411800000, 138.85, 139.43, 138.82, 139.2, 17421700],
                        [1489498200000, 139.3, 139.65, 138.84, 138.99, 15309100],
                        [1489584600000, 139.41, 140.75, 139.03, 140.46, 25691800],
                        [1489671000000, 140.72, 141.02, 140.26, 140.69, 19232000],
                        [1489757400000, 141, 141, 139.89, 139.99, 43885000],
                        [1490016600000, 140.4, 141.5, 140.23, 141.46, 21542000],
                        [1490103000000, 142.11, 142.8, 139.73, 139.84, 39529900],
                        [1490189400000, 139.85, 141.6, 139.76, 141.42, 25860200],
                        [1490275800000, 141.26, 141.58, 140.61, 140.92, 20346300],
                        [1490362200000, 141.5, 141.74, 140.35, 140.64, 22395600],
                        [1490621400000, 139.39, 141.22, 138.62, 140.88, 23575100],
                        [1490707800000, 140.91, 144.04, 140.62, 143.8, 33374800],
                        [1490794200000, 143.68, 144.49, 143.19, 144.12, 29190000],
                        [1490880600000, 144.19, 144.5, 143.5, 143.93, 21207300],
                        [1490967000000, 143.72, 144.27, 143.01, 143.66, 19661700],
                        [1491226200000, 143.71, 144.12, 143.05, 143.7, 19985700],
                        [1491312600000, 143.25, 144.89, 143.17, 144.77, 19891400],
                        [1491399000000, 144.22, 145.46, 143.81, 144.02, 27717900],
                        [1491485400000, 144.29, 144.52, 143.45, 143.66, 21149000],
                        [1491571800000, 143.73, 144.18, 143.27, 143.34, 16672200],
                        [1491831000000, 143.6, 143.88, 142.9, 143.17, 18933400],
                        [1491917400000, 142.94, 143.35, 140.06, 141.63, 30379400],
                        [1492003800000, 141.6, 142.15, 141.01, 141.8, 20350000],
                        [1492090200000, 141.91, 142.38, 141.05, 141.05, 17822900],
                        [1492435800000, 141.48, 141.88, 140.87, 141.83, 16582100],
                        [1492522200000, 141.41, 142.04, 141.11, 141.2, 14697500],
                        [1492608600000, 141.88, 142, 140.45, 140.68, 17328400],
                        [1492695000000, 141.22, 142.92, 141.16, 142.44, 23319600],
                        [1492781400000, 142.44, 142.68, 141.85, 142.27, 17320900],
                        [1493040600000, 143.5, 143.95, 143.18, 143.64, 17134300],
                        [1493127000000, 143.91, 144.9, 143.87, 144.53, 18871500],
                        [1493213400000, 144.47, 144.6, 143.38, 143.68, 20041200],
                        [1493299800000, 143.92, 144.16, 143.31, 143.79, 14246300],
                        [1493386200000, 144.09, 144.3, 143.27, 143.65, 20860400],
                        [1493645400000, 145.1, 147.2, 144.96, 146.58, 33602900],
                        [1493731800000, 147.54, 148.09, 146.84, 147.51, 45352200],
                        [1493818200000, 145.59, 147.49, 144.27, 147.06, 45697000],
                        [1493904600000, 146.52, 147.14, 145.81, 146.53, 23371900],
                        [1493991000000, 146.76, 148.98, 146.76, 148.96, 27327700],
                        [1494250200000, 149.03, 153.7, 149.03, 153.01, 48752400],
                        [1494336600000, 153.87, 154.88, 153.45, 153.99, 39130400],
                        [1494423000000, 153.63, 153.94, 152.11, 153.26, 25805700],
                        [1494509400000, 152.45, 154.07, 152.31, 153.95, 27255100],
                        [1494595800000, 154.7, 156.42, 154.67, 156.1, 32527000],
                        [1494855000000, 156.01, 156.65, 155.05, 155.7, 26009700],
                        [1494941400000, 155.94, 156.06, 154.72, 155.47, 20048500],
                        [1495027800000, 153.6, 154.57, 149.71, 150.25, 50767700],
                        [1495114200000, 151.27, 153.34, 151.13, 152.54, 33568200],
                        [1495200600000, 153.38, 153.98, 152.63, 153.06, 26960800],
                        [1495459800000, 154, 154.58, 152.91, 153.99, 22966400],
                        [1495546200000, 154.9, 154.9, 153.31, 153.8, 19918900],
                        [1495632600000, 153.84, 154.17, 152.67, 153.34, 19178000],
                        [1495719000000, 153.73, 154.35, 153.03, 153.87, 19235600],
                        [1495805400000, 154, 154.24, 153.31, 153.61, 21927600],
                        [1496151000000, 153.42, 154.43, 153.33, 153.67, 20126900],
                        [1496237400000, 153.97, 154.17, 152.38, 152.76, 24451200],
                        [1496323800000, 153.17, 153.33, 152.22, 153.18, 16404100],
                        [1496410200000, 153.58, 155.45, 152.89, 155.45, 27770700],
                        [1496669400000, 154.34, 154.45, 153.46, 153.93, 25331700],
                        [1496755800000, 153.9, 155.81, 153.78, 154.45, 26624900],
                        [1496842200000, 155.02, 155.98, 154.48, 155.37, 21069600],
                        [1496928600000, 155.25, 155.54, 154.4, 154.99, 21250800],
                        [1497015000000, 155.19, 155.19, 146.02, 148.98, 64882700],
                        [1497274200000, 145.74, 146.09, 142.51, 145.42, 72307300],
                        [1497360600000, 147.16, 147.45, 145.15, 146.59, 34165400],
                        [1497447000000, 147.5, 147.5, 143.84, 145.16, 31531200],
                        [1497533400000, 143.32, 144.48, 142.21, 144.29, 32165400],
                        [1497619800000, 143.78, 144.5, 142.2, 142.27, 50361100],
                        [1497879000000, 143.66, 146.74, 143.66, 146.34, 32541400],
                        [1497965400000, 146.87, 146.87, 144.94, 145.01, 24900100],
                        [1498051800000, 145.52, 146.07, 144.61, 145.87, 21265800],
                        [1498138200000, 145.77, 146.7, 145.12, 145.63, 19106300],
                        [1498224600000, 145.13, 147.16, 145.11, 146.28, 35439400],
                        [1498483800000, 147.17, 148.28, 145.38, 145.82, 25692400],
                        [1498570200000, 145.01, 146.16, 143.62, 143.73, 24761900],
                        [1498656600000, 144.49, 146.11, 143.16, 145.83, 22082400],
                        [1498743000000, 144.71, 145.13, 142.28, 143.68, 31499400],
                        [1498829400000, 144.45, 144.96, 143.78, 144.02, 23024100],
                        [1499088600000, 144.88, 145.3, 143.1, 143.5, 14277800],
                        [1499261400000, 143.69, 144.79, 142.72, 144.09, 21569600],
                        [1499347800000, 143.02, 143.5, 142.41, 142.73, 24128800],
                        [1499434200000, 142.9, 144.75, 142.9, 144.18, 19201700],
                        [1499693400000, 144.11, 145.95, 143.37, 145.06, 21090600],
                        [1499779800000, 144.73, 145.85, 144.38, 145.53, 19781800],
                        [1499866200000, 145.87, 146.18, 144.82, 145.74, 24884500],
                        [1499952600000, 145.5, 148.49, 145.44, 147.77, 25199400],
                        [1500039000000, 147.97, 149.33, 147.33, 149.04, 20132100],
                        [1500298200000, 148.82, 150.9, 148.57, 149.56, 23793500],
                        [1500384600000, 149.2, 150.13, 148.67, 150.08, 17868800],
                        [1500471000000, 150.48, 151.42, 149.95, 151.02, 20923000],
                        [1500557400000, 151.5, 151.74, 150.19, 150.34, 17243700],
                        [1500643800000, 149.99, 150.44, 148.88, 150.27, 26252600],
                        [1500903000000, 150.58, 152.44, 149.9, 152.09, 21493200],
                        [1500989400000, 151.8, 153.84, 151.8, 152.74, 18853900],
                        [1501075800000, 153.35, 153.93, 153.06, 153.46, 15781000],
                        [1501162200000, 153.75, 153.99, 147.3, 150.56, 32476300],
                        [1501248600000, 149.89, 150.23, 149.19, 149.5, 17213700],
                        [1501507800000, 149.9, 150.33, 148.13, 148.73, 19845900],
                        [1501594200000, 149.1, 150.22, 148.41, 150.05, 35368600],
                        [1501680600000, 159.28, 159.75, 156.16, 157.14, 69936800],
                        [1501767000000, 157.05, 157.21, 155.02, 155.57, 27097300],
                        [1501853400000, 156.07, 157.4, 155.69, 156.39, 20559900],
                        [1502112600000, 157.06, 158.92, 156.67, 158.81, 21870300],
                        [1502199000000, 158.6, 161.83, 158.27, 160.08, 36205900],
                        [1502285400000, 159.26, 161.27, 159.11, 161.06, 26131500],
                        [1502371800000, 159.9, 160, 154.63, 155.32, 40804300],
                        [1502458200000, 156.6, 158.57, 156.07, 157.48, 26257100],
                        [1502717400000, 159.32, 160.21, 158.75, 159.85, 22122700],
                        [1502803800000, 160.66, 162.2, 160.14, 161.6, 29465500],
                        [1502890200000, 161.94, 162.51, 160.15, 160.95, 27671600],
                        [1502976600000, 160.52, 160.71, 157.84, 157.86, 27940600],
                        [1503063000000, 157.86, 159.5, 156.72, 157.5, 27428100],
                        [1503322200000, 157.5, 157.89, 155.11, 157.21, 26368500],
                        [1503408600000, 158.23, 160, 158.02, 159.78, 21604600],
                        [1503495000000, 159.07, 160.47, 158.88, 159.98, 19399100],
                        [1503581400000, 160.43, 160.74, 158.55, 159.27, 19818900],
                        [1503667800000, 159.65, 160.56, 159.27, 159.86, 25480100],
                        [1503927000000, 160.14, 162, 159.93, 161.47, 25966000],
                        [1504013400000, 160.1, 163.12, 160, 162.91, 29516900],
                        [1504099800000, 163.8, 163.89, 162.61, 163.35, 27269600],
                        [1504186200000, 163.64, 164.52, 163.48, 164, 26785100],
                        [1504272600000, 164.8, 164.94, 163.63, 164.05, 16591100],
                        [1504618200000, 163.75, 164.25, 160.56, 162.08, 29468500],
                        [1504704600000, 162.71, 162.99, 160.52, 161.91, 21651700],
                        [1504791000000, 162.09, 162.24, 160.36, 161.26, 21928500],
                        [1504877400000, 160.86, 161.15, 158.53, 158.63, 28611500],
                        [1505136600000, 160.5, 162.05, 159.89, 161.5, 31580800],
                        [1505223000000, 162.61, 163.96, 158.77, 160.86, 71714000],
                        [1505309400000, 159.87, 159.96, 157.91, 159.65, 44907400],
                        [1505395800000, 158.99, 159.4, 158.09, 158.28, 23760700],
                        [1505482200000, 158.47, 160.97, 158, 159.88, 49114600],
                        [1505741400000, 160.11, 160.5, 158, 158.67, 28269400],
                        [1505827800000, 159.51, 159.77, 158.44, 158.73, 20810600],
                        [1505914200000, 157.9, 158.26, 153.83, 156.07, 52951400],
                        [1506000600000, 155.8, 155.8, 152.75, 153.39, 37511700],
                        [1506087000000, 151.54, 152.27, 150.56, 151.89, 46645400],
                        [1506346200000, 149.99, 151.83, 149.16, 150.55, 44387300],
                        [1506432600000, 151.78, 153.92, 151.69, 153.14, 36660000],
                        [1506519000000, 153.8, 154.72, 153.54, 154.23, 25504200],
                        [1506605400000, 153.89, 154.28, 152.7, 153.28, 22005500],
                        [1506691800000, 153.21, 154.13, 152, 154.12, 26299800],
                        [1506951000000, 154.26, 154.45, 152.72, 153.81, 18698800],
                        [1507037400000, 154.01, 155.09, 153.91, 154.48, 16230300],
                        [1507123800000, 153.63, 153.86, 152.46, 153.48, 20163800],
                        [1507210200000, 154.18, 155.44, 154.05, 155.39, 21283800],
                        [1507296600000, 154.97, 155.49, 154.56, 155.3, 17407600],
                        [1507555800000, 155.81, 156.73, 155.49, 155.84, 16262900],
                        [1507642200000, 156.06, 158, 155.1, 155.9, 15617000],
                        [1507728600000, 155.97, 156.98, 155.75, 156.55, 16905600],
                        [1507815000000, 156.35, 157.37, 155.73, 156, 16125100],
                        [1507901400000, 156.73, 157.28, 156.41, 156.99, 16394200],
                        [1508160600000, 157.9, 160, 157.65, 159.88, 24121500],
                        [1508247000000, 159.78, 160.87, 159.23, 160.47, 18997300],
                        [1508333400000, 160.42, 160.71, 159.6, 159.76, 16374200],
                        [1508419800000, 156.75, 157.08, 155.02, 155.98, 42584200],
                        [1508506200000, 156.61, 157.75, 155.96, 156.25, 23974100],
                        [1508765400000, 156.89, 157.69, 155.5, 156.17, 21984300],
                        [1508851800000, 156.29, 157.42, 156.2, 157.1, 17757200],
                        [1508938200000, 156.91, 157.55, 155.27, 156.41, 21207100],
                        [1509024600000, 157.23, 157.83, 156.78, 157.41, 17000500],
                        [1509111000000, 159.29, 163.6, 158.7, 163.05, 44454200],
                        [1509370200000, 163.89, 168.07, 163.72, 166.72, 44700800],
                        [1509456600000, 167.9, 169.65, 166.94, 169.04, 36046800],
                        [1509543000000, 169.87, 169.94, 165.61, 166.89, 33637800],
                        [1509629400000, 166.6, 168.5, 165.28, 168.11, 41393400],
                        [1509715800000, 174, 174.26, 171.12, 172.5, 59398600],
                        [1509978600000, 172.37, 174.99, 171.72, 174.25, 35026300],
                        [1510065000000, 173.91, 175.25, 173.6, 174.81, 24361500],
                        [1510151400000, 174.66, 176.24, 174.33, 176.24, 24409500],
                        [1510237800000, 175.11, 176.1, 173.14, 175.88, 29482600],
                        [1510324200000, 175.11, 175.38, 174.27, 174.67, 25145500],
                        [1510583400000, 173.5, 174.5, 173.4, 173.97, 16982100],
                        [1510669800000, 173.04, 173.48, 171.18, 171.34, 24782500],
                        [1510756200000, 169.97, 170.32, 168.38, 169.08, 29158100],
                        [1510842600000, 171.18, 171.87, 170.3, 171.1, 23637500],
                        [1510929000000, 171.04, 171.39, 169.64, 170.15, 21899500],
                        [1511188200000, 170.29, 170.56, 169.56, 169.98, 16262400],
                        [1511274600000, 170.78, 173.7, 170.78, 173.14, 25131300],
                        [1511361000000, 173.36, 175, 173.05, 174.96, 25588900],
                        [1511533800000, 175.1, 175.5, 174.65, 174.97, 14026700],
                        [1511793000000, 175.05, 175.08, 173.34, 174.09, 20716800],
                        [1511879400000, 174.3, 174.87, 171.86, 173.07, 26428800],
                        [1511965800000, 172.63, 172.92, 167.16, 169.48, 41666400],
                        [1512052200000, 170.43, 172.14, 168.44, 171.85, 41527200],
                        [1512138600000, 169.95, 171.67, 168.5, 171.05, 39759300],
                        [1512397800000, 172.48, 172.62, 169.63, 169.8, 32542400],
                        [1512484200000, 169.06, 171.52, 168.4, 169.64, 27350200],
                        [1512570600000, 167.5, 170.2, 166.46, 169.01, 28560000],
                        [1512657000000, 169.03, 170.44, 168.91, 169.32, 25673300],
                        [1512743400000, 170.49, 171, 168.82, 169.37, 23355200],
                        [1513002600000, 169.2, 172.89, 168.79, 172.67, 35273800],
                        [1513089000000, 172.15, 172.39, 171.46, 171.7, 19409200],
                        [1513175400000, 172.5, 173.54, 172, 172.27, 23818400],
                        [1513261800000, 172.4, 173.13, 171.65, 172.22, 20476500],
                        [1513348200000, 173.63, 174.17, 172.46, 173.97, 40169300],
                        [1513607400000, 174.88, 177.2, 174.86, 176.42, 29421100],
                        [1513693800000, 175.03, 175.39, 174.09, 174.54, 27436400],
                        [1513780200000, 174.87, 175.42, 173.25, 174.35, 23475600],
                        [1513866600000, 174.17, 176.02, 174.1, 175.01, 20949900],
                        [1513953000000, 174.68, 175.42, 174.5, 175.01, 16114600],
                        [1514298600000, 170.8, 171.47, 169.68, 170.57, 33185500],
                        [1514385000000, 170.1, 170.78, 169.71, 170.6, 21498200],
                        [1514471400000, 171, 171.85, 170.48, 171.08, 16480200],
                        [1514557800000, 170.52, 170.59, 169.22, 169.23, 25884400],
                        [1514903400000, 170.16, 172.3, 169.26, 172.26, 25555900],
                        [1514989800000, 172.53, 174.55, 171.96, 172.23, 29517900],
                        [1515076200000, 172.54, 173.47, 172.08, 173.03, 22434600],
                        [1515162600000, 173.44, 175.37, 173.05, 175, 23660000],
                        [1515421800000, 174.35, 175.61, 173.93, 174.35, 20567800],
                        [1515508200000, 174.55, 175.06, 173.41, 174.33, 21584000],
                        [1515594600000, 173.16, 174.3, 173, 174.29, 23959900],
                        [1515681000000, 174.59, 175.49, 174.49, 175.28, 18667700],
                        [1515767400000, 176.18, 177.36, 175.65, 177.09, 25226000],
                        [1516113000000, 177.9, 179.39, 176.14, 176.19, 29565900],
                        [1516199400000, 176.15, 179.25, 175.07, 179.1, 34386800],
                        [1516285800000, 179.37, 180.1, 178.25, 179.26, 31193400],
                        [1516372200000, 178.61, 179.58, 177.41, 178.46, 32425100],
                        [1516631400000, 177.3, 177.78, 176.6, 177, 27108600],
                        [1516717800000, 177.3, 179.44, 176.82, 177.04, 32689100],
                        [1516804200000, 177.25, 177.3, 173.2, 174.22, 51105100],
                        [1516890600000, 174.51, 174.95, 170.53, 171.11, 41529000],
                        [1516977000000, 172, 172, 170.06, 171.51, 39143000],
                        [1517236200000, 170.16, 170.16, 167.07, 167.96, 50640400],
                        [1517322600000, 165.53, 167.37, 164.7, 166.97, 46048200],
                        [1517409000000, 166.87, 168.44, 166.5, 167.43, 32478900],
                        [1517495400000, 167.17, 168.62, 166.76, 167.78, 47230800],
                        [1517581800000, 166, 166.8, 160.1, 160.5, 86593800],
                        [1517841000000, 159.1, 163.88, 156, 156.49, 72738500],
                        [1517927400000, 154.83, 163.72, 154, 163.03, 68243800],
                        [1518013800000, 163.09, 163.4, 159.07, 159.54, 51608600],
                        [1518100200000, 160.29, 161, 155.03, 155.15, 54390500],
                        [1518186600000, 157.07, 157.89, 150.24, 156.41, 70672600],
                        [1518445800000, 158.5, 163.89, 157.51, 162.71, 60819500],
                        [1518532200000, 161.95, 164.75, 161.65, 164.34, 32549200],
                        [1518618600000, 163.04, 167.54, 162.88, 167.37, 40644900],
                        [1518705000000, 169.79, 173.09, 169, 172.99, 51147200],
                        [1518791400000, 172.36, 174.82, 171.77, 172.43, 40176100],
                        [1519137000000, 172.05, 174.26, 171.42, 171.85, 33930500],
                        [1519223400000, 172.83, 174.12, 171.01, 171.07, 37471600],
                        [1519309800000, 171.8, 173.95, 171.71, 172.5, 30991900],
                        [1519396200000, 173.67, 175.65, 173.54, 175.5, 33812400],
                        [1519655400000, 176.35, 179.39, 176.21, 178.97, 38162200],
                        [1519741800000, 179.1, 180.48, 178.16, 178.39, 38928100],
                        [1519828200000, 179.26, 180.62, 178.05, 178.12, 37782100],
                        [1519914600000, 178.54, 179.78, 172.66, 175, 48802000],
                        [1520001000000, 172.8, 176.3, 172.45, 176.21, 38454000],
                        [1520260200000, 175.21, 177.74, 174.52, 176.82, 28401400],
                        [1520346600000, 177.91, 178.25, 176.13, 176.67, 23788500],
                        [1520433000000, 174.94, 175.85, 174.27, 175.03, 31703500],
                        [1520519400000, 175.48, 177.12, 175.07, 176.94, 23774100],
                        [1520605800000, 177.96, 180, 177.39, 179.98, 32185200],
                        [1520861400000, 180.29, 182.39, 180.21, 181.72, 32207100],
                        [1520947800000, 182.59, 183.5, 179.24, 179.97, 31693500],
                        [1521034200000, 180.32, 180.52, 177.81, 178.44, 29368400],
                        [1521120600000, 178.5, 180.24, 178.07, 178.65, 22743800],
                        [1521207000000, 178.65, 179.12, 177.62, 178.02, 39404700],
                        [1521466200000, 177.32, 177.47, 173.66, 175.3, 33446800],
                        [1521552600000, 175.24, 176.8, 174.94, 175.24, 19649400],
                        [1521639000000, 175.04, 175.09, 171.26, 171.27, 36338100],
                        [1521725400000, 170, 172.68, 168.6, 168.85, 41490800],
                        [1521811800000, 168.39, 169.92, 164.94, 164.94, 41028800],
                        [1522071000000, 168.07, 173.1, 166.44, 172.77, 37541200],
                        [1522157400000, 173.68, 175.15, 166.92, 168.34, 40922600],
                        [1522243800000, 167.25, 170.02, 165.19, 166.48, 41668500],
                        [1522330200000, 167.81, 171.75, 166.9, 167.78, 38398500],
                        [1522675800000, 166.64, 168.94, 164.47, 166.68, 37586800],
                        [1522762200000, 167.64, 168.75, 164.88, 168.39, 30278000],
                        [1522848600000, 164.88, 172.01, 164.77, 171.61, 34605500],
                        [1522935000000, 172.58, 174.23, 172.08, 172.8, 26933200],
                        [1523021400000, 170.97, 172.48, 168.2, 168.38, 35005300],
                        [1523280600000, 169.88, 173.09, 169.85, 170.05, 29017700],
                        [1523367000000, 173, 174, 171.53, 173.25, 28408600],
                        [1523453400000, 172.23, 173.92, 171.7, 172.44, 22431600],
                        [1523539800000, 173.41, 175, 173.04, 174.14, 22889300],
                        [1523626200000, 174.78, 175.84, 173.85, 174.73, 25124300],
                        [1523885400000, 175.03, 176.19, 174.83, 175.82, 21578400],
                        [1523971800000, 176.49, 178.94, 176.41, 178.24, 26509000],
                        [1524058200000, 177.81, 178.82, 176.88, 177.84, 20754500],
                        [1524144600000, 173.76, 175.39, 172.66, 172.8, 34808800],
                        [1524231000000, 170.6, 171.22, 165.43, 165.72, 65491100],
                        [1524490200000, 166.83, 166.92, 164.09, 165.24, 36515500],
                        [1524576600000, 165.67, 166.33, 161.22, 162.94, 33692000],
                        [1524663000000, 162.62, 165.42, 162.41, 163.65, 28382100],
                        [1524749400000, 164.12, 165.73, 163.37, 164.22, 27963000],
                        [1524835800000, 164, 164.33, 160.63, 162.32, 35655800],
                        [1525095000000, 162.13, 167.26, 161.84, 165.26, 42427400],
                        [1525181400000, 166.41, 169.2, 165.27, 169.1, 53569400],
                        [1525267800000, 175.23, 177.75, 173.8, 176.57, 66539400],
                        [1525354200000, 175.88, 177.5, 174.44, 176.89, 34068200],
                        [1525440600000, 178.25, 184.25, 178.17, 183.83, 56201300],
                        [1525699800000, 185.18, 187.67, 184.75, 185.16, 42451400],
                        [1525786200000, 184.99, 186.22, 183.67, 186.05, 28402800],
                        [1525872600000, 186.55, 187.4, 185.22, 187.36, 23211200],
                        [1525959000000, 187.74, 190.37, 187.65, 190.04, 27989300],
                        [1526045400000, 189.49, 190.06, 187.45, 188.59, 26212200],
                        [1526304600000, 189.01, 189.53, 187.86, 188.15, 20778800],
                        [1526391000000, 186.78, 187.07, 185.1, 186.44, 23695200],
                        [1526477400000, 186.07, 188.46, 186, 188.18, 19183100],
                        [1526563800000, 188, 188.91, 186.36, 186.99, 17294000],
                        [1526650200000, 187.19, 187.81, 186.13, 186.31, 18297700],
                        [1526909400000, 188, 189.27, 186.91, 187.63, 18400800],
                        [1526995800000, 188.38, 188.88, 186.78, 187.16, 15240700],
                        [1527082200000, 186.35, 188.5, 185.76, 188.36, 20058400],
                        [1527168600000, 188.77, 188.84, 186.21, 188.15, 23234000],
                        [1527255000000, 188.23, 189.65, 187.65, 188.58, 17461000],
                        [1527600600000, 187.6, 188.75, 186.87, 187.9, 22514100],
                        [1527687000000, 187.72, 188, 186.78, 187.5, 18690500],
                        [1527773400000, 187.22, 188.23, 186.14, 186.87, 27482800],
                        [1527859800000, 187.99, 190.26, 187.75, 190.24, 23442500],
                        [1528119000000, 191.64, 193.42, 191.35, 191.83, 26266200],
                        [1528205400000, 193.07, 193.94, 192.36, 193.31, 21566000],
                        [1528291800000, 193.63, 194.08, 191.92, 193.98, 20933600],
                        [1528378200000, 194.14, 194.2, 192.34, 193.46, 21347200],
                        [1528464600000, 191.17, 192, 189.77, 191.7, 26656800],
                        [1528723800000, 191.35, 191.97, 190.21, 191.23, 18308500],
                        [1528810200000, 191.39, 192.61, 191.15, 192.28, 16911100],
                        [1528896600000, 192.42, 192.88, 190.44, 190.7, 21638400],
                        [1528983000000, 191.55, 191.57, 190.22, 190.8, 21610100],
                        [1529069400000, 190.03, 190.16, 188.26, 188.84, 61719200],
                        [1529328600000, 187.88, 189.22, 187.2, 188.74, 18484900],
                        [1529415000000, 185.14, 186.33, 183.45, 185.69, 33578500],
                        [1529501400000, 186.35, 187.2, 185.73, 186.5, 20628700],
                        [1529587800000, 187.25, 188.35, 184.94, 185.46, 25711900],
                        [1529674200000, 186.12, 186.15, 184.7, 184.92, 27200400],
                        [1529933400000, 183.4, 184.92, 180.73, 182.17, 31663100],
                        [1530019800000, 182.99, 186.53, 182.54, 184.43, 24569200],
                        [1530106200000, 185.23, 187.28, 184.03, 184.16, 25285300],
                        [1530192600000, 184.1, 186.21, 183.8, 185.5, 17365200],
                        [1530279000000, 186.29, 187.19, 182.91, 185.11, 22737700],
                        [1530538200000, 183.82, 187.3, 183.42, 187.18, 17731300],
                        [1530624600000, 187.79, 187.95, 183.54, 183.92, 13954800],
                        [1530797400000, 185.26, 186.41, 184.28, 185.4, 16604200],
                        [1530883800000, 185.42, 188.43, 185.2, 187.97, 17485200],
                        [1531143000000, 189.5, 190.68, 189.3, 190.58, 19756600],
                        [1531229400000, 190.71, 191.28, 190.18, 190.35, 15939100],
                        [1531315800000, 188.5, 189.78, 187.61, 187.88, 18831500],
                        [1531402200000, 189.53, 191.41, 189.31, 191.03, 18041100],
                        [1531488600000, 191.08, 191.84, 190.9, 191.33, 12513900],
                        [1531747800000, 191.52, 192.65, 190.42, 190.91, 15043100],
                        [1531834200000, 189.75, 191.87, 189.2, 191.45, 15534500],
                        [1531920600000, 191.78, 191.8, 189.93, 190.4, 16393400],
                        [1532007000000, 189.69, 192.55, 189.69, 191.88, 20286800],
                        [1532093400000, 191.78, 192.43, 190.17, 191.44, 20676200],
                        [1532352600000, 190.68, 191.96, 189.56, 191.61, 15989400],
                        [1532439000000, 192.45, 193.66, 192.05, 193, 18697900],
                        [1532525400000, 193.06, 194.85, 192.43, 194.82, 16709900],
                        [1532611800000, 194.61, 195.96, 193.61, 194.21, 19076000],
                        [1532698200000, 194.99, 195.19, 190.1, 190.98, 24024000],
                        [1532957400000, 191.9, 192.2, 189.07, 189.91, 21029500],
                        [1533043800000, 190.3, 192.14, 189.34, 190.29, 39373000],
                        [1533130200000, 199.13, 201.76, 197.31, 201.5, 67935700],
                        [1533216600000, 200.58, 208.38, 200.35, 207.39, 62404000],
                        [1533303000000, 207.03, 208.74, 205.48, 207.99, 33447400],
                        [1533562200000, 208, 209.25, 207.07, 209.07, 25425400],
                        [1533648600000, 209.32, 209.5, 206.76, 207.11, 25587400],
                        [1533735000000, 206.05, 207.81, 204.52, 207.25, 22525500],
                        [1533821400000, 209.53, 209.78, 207.2, 208.88, 23492600],
                        [1533907800000, 207.36, 209.1, 206.67, 207.53, 24611200],
                        [1534167000000, 209.31, 210.95, 207.7, 208.87, 25890900],
                        [1534253400000, 210.16, 210.56, 208.26, 209.75, 20748000],
                        [1534339800000, 209.22, 210.74, 208.33, 210.24, 28807600],
                        [1534426200000, 211.75, 213.81, 211.47, 213.32, 28500400],
                        [1534512600000, 213.44, 217.95, 213.16, 217.58, 35427000],
                        [1534771800000, 218.1, 219.18, 215.11, 215.46, 30287700],
                        [1534858200000, 216.8, 217.19, 214.03, 215.04, 26159800],
                        [1534944600000, 214.1, 216.36, 213.84, 215.05, 19018100],
                        [1535031000000, 214.65, 217.05, 214.6, 215.49, 18883200],
                        [1535117400000, 216.6, 216.9, 215.11, 216.16, 18476400],
                        [1535376600000, 217.15, 218.74, 216.33, 217.94, 20525100],
                        [1535463000000, 219.01, 220.54, 218.92, 219.7, 22776800],
                        [1535549400000, 220.15, 223.49, 219.41, 222.98, 27254800],
                        [1535635800000, 223.25, 228.26, 222.4, 225.03, 48793800],
                        [1535722200000, 226.51, 228.87, 226, 227.63, 43340100],
                        [1536067800000, 228.41, 229.18, 226.63, 228.36, 27390100],
                        [1536154200000, 228.99, 229.67, 225.1, 226.87, 33333000],
                        [1536240600000, 226.23, 227.35, 221.3, 223.1, 34290000],
                        [1536327000000, 221.85, 225.37, 220.71, 221.3, 37619800],
                        [1536586200000, 220.95, 221.85, 216.47, 218.33, 39516500],
                        [1536672600000, 218.01, 224.3, 216.56, 223.85, 35749000],
                        [1536759000000, 224.94, 225, 219.84, 221.07, 49278700],
                        [1536845400000, 223.52, 228.35, 222.57, 226.41, 41706400],
                        [1536931800000, 225.75, 226.84, 222.52, 223.84, 31999300],
                        [1537191000000, 222.15, 222.95, 217.27, 217.88, 37195100],
                        [1537277400000, 217.79, 221.85, 217.12, 218.24, 31571700],
                        [1537363800000, 218.5, 219.62, 215.3, 218.37, 27123800],
                        [1537450200000, 220.24, 222.28, 219.15, 220.03, 26608800],
                        [1537536600000, 220.78, 221.36, 217.29, 217.66, 96246700],
                        [1537795800000, 216.82, 221.26, 216.63, 220.79, 27693400],
                        [1537882200000, 219.75, 222.82, 219.7, 222.19, 24554400],
                        [1537968600000, 221, 223.75, 219.76, 220.42, 23984700],
                        [1538055000000, 223.82, 226.44, 223.54, 224.95, 30181200],
                        [1538141400000, 224.79, 225.84, 224.02, 225.74, 22929400],
                        [1538400600000, 227.95, 229.42, 226.35, 227.26, 23600800],
                        [1538487000000, 227.25, 230, 226.63, 229.28, 24788200],
                        [1538573400000, 230.05, 233.47, 229.78, 232.07, 28654800],
                        [1538659800000, 230.78, 232.35, 226.73, 227.99, 32042000],
                        [1538746200000, 227.96, 228.41, 220.58, 224.29, 33580500],
                        [1539005400000, 222.21, 224.8, 220.2, 223.77, 29663900],
                        [1539091800000, 223.64, 227.27, 222.25, 226.87, 26891000],
                        [1539178200000, 225.46, 226.35, 216.05, 216.36, 41990600],
                        [1539264600000, 214.52, 219.5, 212.32, 214.45, 53124400],
                        [1539351000000, 220.42, 222.88, 216.84, 222.11, 40337900],
                        [1539610200000, 221.16, 221.83, 217.27, 217.36, 30791000],
                        [1539696600000, 218.93, 222.99, 216.76, 222.15, 29184000],
                        [1539783000000, 222.3, 222.64, 219.34, 221.19, 22885400],
                        [1539869400000, 217.86, 219.74, 213, 216.02, 32581300],
                        [1539955800000, 218.06, 221.26, 217.43, 219.31, 33078700],
                        [1540215000000, 219.79, 223.36, 218.94, 220.65, 28792100],
                        [1540301400000, 215.83, 223.25, 214.7, 222.73, 38767800],
                        [1540387800000, 222.6, 224.23, 214.54, 215.09, 40925500],
                        [1540474200000, 217.71, 221.38, 216.75, 219.8, 29855800],
                        [1540560600000, 215.9, 220.19, 212.67, 216.3, 47258400],
                        [1540819800000, 219.19, 219.69, 206.09, 212.24, 45935500],
                        [1540906200000, 211.15, 215.18, 209.27, 213.3, 36660000],
                        [1540992600000, 216.88, 220.45, 216.62, 218.86, 38358900],
                        [1541079000000, 219.05, 222.36, 216.81, 222.22, 58323200],
                        [1541165400000, 209.55, 213.65, 205.43, 207.48, 91328700],
                        [1541428200000, 204.3, 204.39, 198.17, 201.59, 66108400]
                    ]
                }])
            }, 50)
        })
    })
    mock.onGet('/getTimeList').reply(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: {
                        timestampInSeconds: true,
                        units: ["y", "M", "d", "h"],
                        urlByUnit: {
                            y: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-y.json?unit=y&timeZone=UTC",
                            M: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-M.json?unit=M&timeZone=UTC",
                            d: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-d.json?unit=d&timeZone=UTC",
                            h: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-h.json?unit=d&timeZone=UTC"
                        }
                    }
                }])
            }, 50)
        })
    })
    mock.onGet('/getWords').reply(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([200, {
                    code: 0,
                    data: {
                        keywords: [
                            { name: 'lerem', value: 10 },
                            { name: 'lernie', value: 8 },
                            { name: 'cdsge', value: 9 },
                            { name: 'vcbrgrfnhg', value: 10 },
                            { name: 'dfbgfht', value: 6 },
                            { name: 'cbvfghtf', value: 4 },
                            { name: 'dcfbfghtf', value: 5 },
                            { name: 'dbgfhbgfh', value: 6 },
                            { name: 'fbfghf', value: 7 },
                            { name: 'dfbgfh', value: 8 },
                            { name: 'dfbgfhrf', value: 9 },
                            { name: 'dfbfghbgf', value: 10 },
                            { name: 'dfgd', value: 4 },
                            { name: 'k;oio', value: 3 },
                            { name: 'aser', value: 6 },
                            { name: 'asdfw', value: 7 },
                            { name: 'weret', value: 10 },
                            { name: 'vfdg', value: 8 },
                            { name: 'asrgrfdhytk', value: 10 },
                            { name: 'vkasguds', value: 8 },
                            { name: 'sdalkfhgeiu', value: 9 },
                            { name: 'asdasjdh', value: 10 },
                            { name: 'zxcsdd', value: 6 },
                            { name: 'sdfg', value: 4 },
                            { name: 'cxsdf', value: 5 },
                            { name: 'setr', value: 6 },
                            { name: 'atreuy', value: 7 },
                            { name: 'atgruty', value: 8 },
                            { name: 'agfdhy', value: 9 },
                            { name: 'aerey', value: 10 },
                            { name: 'lopju', value: 4 },
                            { name: 'aser4e67', value: 3 },
                            { name: 'a1d5sf', value: 6 },
                            { name: '534fdfdesf', value: 7 },
                            { name: 'qwer5254', value: 10 },
                            { name: 'lerem', value: 10 },
                            { name: 'lerem', value: 8 },
                            { name: 'lerem', value: 9 },
                            { name: 'lerem', value: 10 },
                            { name: 'lerem', value: 6 },
                            { name: 'lerem', value: 4 },
                            { name: 'lerem', value: 5 },
                            { name: 'lerem', value: 6 },
                            { name: 'lerem', value: 7 },
                            { name: 'lerem', value: 8 },
                            { name: 'lerem', value: 9 },
                            { name: 'lerem', value: 10 },
                            { name: 'lerem', value: 4 },
                            { name: 'lerem', value: 3 },
                            { name: 'lerem', value: 6 },
                            { name: 'lerem', value: 7 },
                            { name: 'lerem', value: 10 },
                            { name: 'lerem', value: 8 },
                            { name: 'lerem', value: 10 },
                            { name: 'lerem', value: 8 },
                            { name: 'lerem', value: 9 },
                            { name: 'lerem', value: 10 },
                            { name: 'lerem', value: 6 },
                            { name: 'lerem', value: 4 },
                            { name: 'lerem', value: 5 },
                            { name: 'lerem', value: 6 },
                            { name: 'lerem', value: 7 },
                            { name: 'lerem', value: 8 },
                            { name: 'lerem', value: 9 },
                            { name: 'lerem', value: 10 },
                            { name: 'lerem', value: 4 },
                            { name: 'lerem', value: 3 },
                            { name: 'lerem', value: 6 },
                            { name: 'lerem', value: 7 },
                            { name: 'lerem', value: 10 }
                        ],
                        PER: [

                            { name: 'lernie', value: 8 },
                            { name: 'cdsge', value: 9 },
                            { name: 'vcbrgrfnhg', value: 10 },
                            { name: 'dfbgfht', value: 6 },
                            { name: 'cbvfghtf', value: 4 },
                            { name: 'dcfbfghtf', value: 5 },
                            { name: 'dbgfhbgfh', value: 6 },
                            { name: 'fbfghf', value: 7 },
                            { name: 'dfbgfh', value: 8 },
                            { name: 'dfbgfhrf', value: 9 },
                            { name: 'dfbfghbgf', value: 10 },
                            { name: 'dfgd', value: 4 },
                            { name: 'k;oio', value: 3 },
                            { name: 'aser', value: 6 },
                            { name: 'asdfw', value: 7 },
                            { name: 'weret', value: 10 },
                            { name: 'vfdg', value: 8 },
                            { name: 'asrgrfdhytk', value: 10 },
                            { name: 'vkasguds', value: 8 },
                            { name: 'sdalkfhgeiu', value: 9 },
                            { name: 'asdasjdh', value: 10 },
                            { name: 'zxcsdd', value: 6 },
                            { name: 'sdfg', value: 4 },
                            { name: 'cxsdf', value: 5 },
                            { name: 'setr', value: 6 },
                            { name: 'atreuy', value: 7 },
                            { name: 'atgruty', value: 8 },
                            { name: 'agfdhy', value: 9 },
                            { name: 'aerey', value: 10 },
                            { name: 'lopju', value: 4 },
                            { name: 'aser4e67', value: 3 },
                            { name: 'a1d5sf', value: 6 },
                            { name: '534fdfdesf', value: 7 },
                            { name: 'qwer5254', value: 10 },

                        ],
                        loc: [],
                        org: []
                    }
                }])
            }, 50)
        })
    })
}