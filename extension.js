game.import("extension", function (lib, game, ui, get, ai, _status) {
return {name: "传奇武将",content: function (config, pack) { },precontent: function () { }, help: {}, config: {},
package: {
    card: {
        card:{
            htchui:{
                fullskin: true,
                type: 'equip',
                subtype: 'equip1',
                skills: ['htchui_skill'],
                enable: true,
                filterTarget:function(card,player,target){
                    if(player!=target) return false;
                    return target.canEquip(card,true);
                },
                modTarget:true,
                allowMultiple:false,
                content:function(){
                    if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
                },
                toself:true,
                
            },
        },
        translate:{
            htchui:"昊天锤",
            "htchui_info":"123231321",
        },
        list:[["spade","9","昊天锤"]],
    },
    character: {
        character: {
            xzhangjiao: ["male", "shen", 4, ["xguidao", "xyizhao", "xtianshu", "xleiji"], ['ext:传奇武将/img/xzhangjiao.jpg']],
            xniuyeye: ["male", "qun", 3, ["xfandou", "xhuayuan", "xguahu"], ["des:翻斗花园第一男神", 'ext:传奇武将/img/xniuyeye.jpg']],
            xmachao: ["male", "shen", 4, ["mashu", "xtieji", "xshenwei"], ['ext:传奇武将/img/xmachao.jpg']],
            xzhipeilvzhe: ["none", "jin", 3, ["xzhipei", "xqianren"],['ext:传奇武将/img/xzhipeilvzhe.jpg']],
            xxiao: ["male", "shen", 3, ["xchaoli", "xboshi", "xxiuse", "xwulai"], ['ext:传奇武将/img/xxiao.jpg']],
            xguaxian: ['male', 'qun', 3, ['xbugua', 'xnigua'], ['ext:传奇武将/img/xguaxian.jpg']],
            xysqh: ['male', 'wei', 12, ['xfeiqiu', 'xgandi', 'xshilian', 'xdawei', 'xtest'], ['ext:传奇武将/img/xysqh.jpg']],
            xmabaoguo:['male','jin',4,[],[]],
        },
        translate: {
            xzhangjiao: "张角",
            xniuyeye: "牛爷爷",
            xmachao: "神马超",
            xzhipeilvzhe: "支配之律者",
            xxiao: "肖吊毛",
            xguaxian: "卦仙",
            xysqh: "一帅千欢",
            xmabaoguo:"马保国",
        },
    },
    
    skill: {
        skill: {
            //此处写装备牌的技能
            htchui_skill: {
                equipSkill: true,
                enable: 'phaseUse',
                shaRelated: true,
                frequent: true,
                trigger: { player: "useCardToPlayered", },
                filter: function (event, player) { return event.card.name == 'sha'; },
                content: function () {
                    player.draw(3);
                }
            },






            //非酋：锁定技,每名玩家出牌阶段开始时,若你体力大于1则你进行判定：若点数不为“648”,则你失去一点体力,获得一枚“非”标记。
            xfeiqiu: {
                forced: true,
                frequent: true,
                mark: true,
                marktext: '非',
                intro: { name: "非", content: "你是非酋！", },
                trigger: { global: "phaseUseBegin", },
                filter: function (event, player) {
                    return player.hp > 1;
                },
                content: function () {
                    'step 0'
                    player.judge(function () { return 0 });
                    'step 1'
                    //如果点数不为4,6,8，则失去一点体力，获得一枚“非”标记
                    if (result.number != 4 && result.number != 6 && result.number != 8) {
                        player.loseHp();
                        player.addMark('xfeiqiu', 1);
                    }
                }
            },
            //肝帝：出牌阶段限一次,你可以主动触发【非酋】的效果并摸一张牌。此回合你每造成一点伤害或每使用三张牌,此技可发动次数+1。
            xgandi: {
                enable:"phaseUse",
                filter: function (event, player) {
                    return player.storage.xgandi >= 1;
                },
                group: ["xgandi_1",'xgandi_usecard','xgandi_damage'],
                content: function () { 
                    'step 0'
                    player.draw();
                    player.storage.xgandi--;
                    player.judge(function () { return 0 });
                    'step 1'
                    //如果点数不为4,6,8，则失去一点体力，获得一枚“非”标记
                    if (result.number != 4 && result.number != 6 && result.number != 8) {
                        player.loseHp();
                        player.addMark('xfeiqiu', 1);
                    }
                },
                subSkill: {
                    1: {
                        forced: true,
                        frequent: true,
                        trigger:{player:'phaseBegin',},
                        content: function () {
                            player.storage.xgandi = 1;
                        }
                    },
                    damage: {
                        frequent: true,
                        forced: true,
                        trigger:{source:"damageSource",},
                        content: function () {
                            player.storage.xgandi++;
                        }
                    },
                    usecard: {
                        frequent: true,
                        trigger: { player: "useCard", },
                        filter:function(event,player){
                            var evt=event.getParent('phaseUse');
                            if(!evt||evt.player!=player) return false;
                            var num=player.getHistory('useCard',evtx=>evtx.getParent('phaseUse')==evt).length;
                            return num%3==0;
                        },
                        content: function () { 
                            player.storage.xgandi++;
                        }
                    },
                }
            },
            /**
             * 十连：出牌阶段限一次，你可以移除5枚“非”进行判定从牌堆或弃牌区随机获得对应数量的基本/装备/锦囊牌。
             * ♥2~9,视为【欧】,否则视为【歪】;若点数与体力值相同,视为【皇】。
             *（①歪,1/1/1,获得【保】;②欧,1/2/3,失去5点体力上限;③皇,3/5/5,失去7点体力上限；
             * ④【保】,增加2点体力上限并回复两点体力,下次十连视为【欧】）你的体力上限至少为2。
             */
            xtest: {
                enable: "phaseUse",
                usable: 1,
                content: function () { 
                    player.addMark('xfeiqiu', 20);
                }
            },
            xshilian: {
                enable: "phaseUse",
                usable: 1,
                filter: function (event, player) {
                    return player.countMark('xfeiqiu') >= 5;
                },
                content: function () { 
                    'step 0'
                    player.removeMark('xfeiqiu', 5);
                    if (player.hasSkill('xshilian_bao')) {
                        event.insert(lib.skill.xshilian.ou,{player:player});
                        player.removeSkill('xshilian_bao');
                        event.finish();
                    }
                    'step 1'
                    player.judge(function () { return 0 });
                    'step 2'
                    if(result.number>=2&&result.number<=9&&result.suit=='heart'){
                        event.insert(lib.skill.xshilian.ou,{player:player});
                    } else {
                        event.insert(lib.skill.xshilian.wai,{player:player});
                    }
                    if(result.number==player.hp){
                        event.insert(lib.skill.xshilian.huang,{player:player});
                    }
                    
                },
                subSkill: {
                    bao: {
                        sub: true,
                        parentskill: "xshilian",
                        mark: true,
                        marktext: '【保】',
                        intro: { name: "【保】", content: "保底附体：下次十连一定欧！" },
                        init:function(player){
                            player.gainMaxHp(2);
                            player.recover(2);
                        },
                    }
                },
                //1/1/1,获得【保】
                "wai": function () {
                    var cards = [];
                    var card = get.cardPile2(function (card) {
                        return get.type2(card) == 'basic';
                    });
                    cards.push(card);
                    card = get.cardPile2(function (card) {
                        return get.type2(card) == 'equip';
                    });
                    cards.push(card);
                    card = get.cardPile2(function (card) {
                        return get.type2(card) == 'trick';
                    });
                    cards.push(card);
                    player.directgain(cards);
                    player.addSkill('xshilian_bao');
                },
                //1/2/3,失去5点体力上限
                "ou": function () { 
                    var cards = [];
                    var card = get.cardPile2(function (card) {
                        return get.type2(card) == 'basic';
                    });
                    cards.push(card);
                    for (var i = 0; i < 2; i++) {
                        card = get.cardPile2(function (card) {
                            return get.type2(card) == 'equip';
                        });
                        if (card) {
                            ui.special.appendChild(card);
                            cards.push(card);
                        }
                    }
                    for (var i = 0; i < 3; i++) {
                        card = get.cardPile2(function (card) {
                            return get.type2(card) == 'trick';
                        });
                        if (card) {
                            ui.special.appendChild(card);
                            cards.push(card);
                        }
                    }
                    player.directgain(cards);
                    if (player.maxHp >= 7) {
                        player.loseMaxHp(5);
                    } else {
                        player.loseHp(player.maxHp - 2);
                    }
                },
                //3/4/5,失去7点体力上限
                "huang": function () { 
                    var cards = [];
                    var b_num = 3;
                    var e_num = 4;
                    var t_num = 5;
                    while (b_num) {
                        var card = get.cardPile2(function (card) {
                            return get.type2(card) == 'basic';
                        });
                        if (card) {
                            b_num--;
                            ui.special.appendChild(card);
                            cards.push(card);
                        }
                    }
                    while (e_num) {
                        card = get.cardPile2(function (card) {
                            return get.type2(card) == 'equip';
                        });
                        if (card) {
                            e_num--;
                            ui.special.appendChild(card);
                            cards.push(card);
                        } else {
                            while (e_num) {
                                card = get.discardPile(function (card) {
                                    return get.type2(card) == 'equip';
                                });
                                if (!card) {
                                    e_num = 0;
                                    break;
                                }
                                e_num--;
                                ui.special.appendChild(card);
                                cards.push(card);
                            }
                        }
                    }
                    while (t_num) {
                        card = get.cardPile2(function (card) {
                            return get.type2(card) == 'trick';
                        });
                        if (card) {
                            t_num--;
                            ui.special.appendChild(card);
                            cards.push(card);
                        } else {
                            while (t_num) {
                                card = get.discardPile(function (card) {
                                    return get.type2(card) == 'trick';
                                });
                                if (!card) {
                                    t_num = 0;
                                    break;
                                }
                                t_num--;
                                ui.special.appendChild(card);
                                cards.push(card);
                            }
                        }
                    }
                    player.directgain(cards);
                    if (player.maxHp >= 9) {
                        player.loseMaxHp(7);
                    } else {
                        player.loseHp(player.maxHp - 2);
                    }
                },

            },
            //大胃：你使用【桃】、【酒】时，效果结算两次。
            xdawei: {
                audio: "rechunlao",
                trigger: { player: "useCard", },
                frequent: true,
                filter: function (event, player) {
                    return event.card.name == 'tao' || event.card.name == 'jiu';
                },
                content: function () {
                    trigger.effectCount++;
                },
            },
            






            //卜卦:转换技，阳：当你使用锦囊牌时。阴：当你使用或打出非锦囊牌时。你可以进行判定：
            //♥，回复一点体力（若满则摸一张牌）；♦，令一名角色失去一点体力（限一次）；♣，摸一张牌；♠，弃置一名其他角色的一张牌。
            xbugua: {
                zhuanhuanji: true,
                mark: true,
                intro:{
                    content:function(storage,player,skill){
                        if(player.storage.xbugua==true) return '当你使用或打出非锦囊牌时。';
                        return '当你使用锦囊牌时。';
                    },
                },
                group: ["xbugua_yang", "xbugua_yin",'xbugua_diamond'],
                subSkill: {
                    yang: {
                        audio: 'th_tianshu',
                        trigger: { player: "useCard", },
                        filter: function (event, player) {
                            return get.type2(event.card) == 'trick' && player.storage.xbugua != true && player.storage.diamond <= 1;
                        },
                        content: function () {
                            player.changeZhuanhuanji('xbugua');
                            event.insert(lib.skill.xbugua.panding,{player:player});
                        },
                        sub: true,
                        parentskill: "xbugua",
                    },
                    yin: {
                        audio: 'th_tianshu',
                        trigger: {player:['useCard','respond'],},
                        filter: function (event, player) {
                            return get.type2(event.card) != 'trick' && player.storage.xbugua == true && player.storage.diamond <= 1;
                        },
                        content: function () { 
                            player.changeZhuanhuanji('xbugua');
                            event.insert(lib.skill.xbugua.panding,{player:player});
                        },
                        sub: true,
                        parentskill: "xbugua",
                    },
                    diamond: { 
                        sub: true,
                        parentskill: "xbugua",
                        trigger: { player: "phaseBegin", },
                        frequent: true,
                        forced: true,
                        content: function () {
                            player.storage.diamond = 1;
                        }
                    },
                },
                "panding": function () {
                    "step 0"
                    player.judge(function () { return 0 });
                    "step 1"
                    var suit = result.suit;
                    if (suit == 'heart') {
                        if (player.hp < player.maxHp) player.recover();
                        else player.draw();
                        event.finish();
                    }
                    else if (suit == 'diamond') {
                        event.goto(2);
                    }
                    else if (suit == 'club') {
                        player.draw();
                        event.finish();
                    }
                    else if (suit == 'spade') {
                        event.goto(4);
                    }
                    'step 2'
                    player.chooseTarget('请选择一名角色失去一点体力',function(card,player,target){
                        return player!=target;
                    })
                    'step 3'
                    if (result.bool) {
                        if (player.storage.diamond >= 1) {
                            player.storage.diamond--;
                            result.targets[0].loseHp();
                            event.finish();
                        }
                        event.finish();
                    }
                    'step 4'
                    player.chooseTarget('请弃置一名角色的一张牌',function(card,player,target){
                        return player!=target;
                    })
                    'step 5'
                    if (result.bool) {
                        player.discardPlayerCard(result.targets[0], true, 'he');
                    }
                }
                
            },
            //限定技，出牌阶段，你可以令某种花色视为另一种花色，同时获得阴阳技（强制进行判定）并解除♦生效的次数上限直至回合结束。
            xnigua: {
                audio:"th_yufeng",
                enable:"phaseUse",
                limited:true,
                skillAnimation:true,
                animationColor: "orange",
                content: function () {
                    'step 0'
                    player.awakenSkill('xnigua');
                    player.draw(2);
                    player.storage.diamond = 100;
                    player.addTempSkill('xnigua_yy');
                    'step 1'
                    player.chooseControl(['♥️️', '♦️️', '♠️️', '♣️️']).set('prompt', '请选择要改变的花色:');
                    'step 2'
                    switch (result.control) {
                        case '♥️️': _status.event.player.storage.a = 'heart'; break;
                        case '♦️️': _status.event.player.storage.a = 'diamond'; break;
                        case '♠️️': _status.event.player.storage.a = 'spade'; break;
                        case '♣️️': _status.event.player.storage.a = 'club'; break;
                    }
                    'step 3'
                    player.chooseControl(['♥️️', '♦️️', '♠️️', '♣️️']).set('prompt', '请选择改变后的花色:');
                    'step 4'
                    switch (result.control) {
                        case '♥️️': _status.event.player.storage.b = 'heart'; break;
                        case '♦️️': _status.event.player.storage.b = 'diamond'; break;
                        case '♠️️': _status.event.player.storage.b = 'spade'; break;
                        case '♣️️': _status.event.player.storage.b = 'club'; break;
                    }
                    player.addTempSkill('xnigua_huase');
                },
                subSkill: {
                    yy: {
                        sub: true,
                        parentskill: "xnigua",
                        audio: 'th_tianshu',
                        frequent: true,
                        trigger: { player: "useCard", },
                        content: function () {
                            event.insert(lib.skill.xbugua.panding,{player:player});
                        }
                    },
                    huase: {
                        sub: true,
                        parentskill: "xbugua",
                        forced: true,
                        mark: true,
                        intro:{
                            content: function (storage, player, skill) {
                                var a = '';
                                var b = '';
                                switch (_status.event.player.storage.a) {
                                    case 'heart': a = '♥️️'; break;
                                    case 'diamond': a = '♦️️'; break;
                                    case 'spade': a = '♠️️'; break;
                                    case 'club': a = '♣️️'; break;
                                }
                                switch (_status.event.player.storage.b) {
                                    case 'heart': b = '♥️️'; break;
                                    case 'diamond': b = '♦️️'; break;
                                    case 'spade': b = '♠️️'; break;
                                    case 'club': b = '♣️️'; break;
                                }
                                return '将' + a + '视为' + b;
                            },
                        },
                        mod: {
                            suit: function (card, suit) {
                                if(suit==_status.event.player.storage.a) return _status.event.player.storage.b;
                            }
                        },
                    },
                },
            },

            //异兆
            xyizhao: {
                audio: "yizhao",
                group: "xyizhao_s1",
                forced: true,
                locked: true,
                marktext: "雷",
                mark: true,
                intro: { name: "雷", content: "mark", },
                trigger: { player: "loseAfter", },
                filter: function (event, player) {
                    if (event.cards && event.cards.length >= 1) {
                        for (const card of event.cards) {
                            if (card.name == 'shan') return true;
                        }
                    }
                    return false;
                },
                content: function () {
                    player.draw();
                    if (player.countMark('xyizhao') < 3) { player.addMark('xyizhao', 1); }
                },
                subSkill: {
                    s1: {
                        trigger: { player: "phaseBegin", },
                        forced: true,
                        content: function () { player.draw(player.countMark("xyizhao")); },
                    },
                },
                mod: {
                    maxHandcard: function (player, num) {
                        return num + player.countMark('xyizhao');
                    },
                },
            },
            //天术
            xtianshu: {
                audio: "tianjie",
                enable: "phaseUse",
                viewAsFilter: function (player) { return player.countMark('xyizhao') == 3; },
                filterCard: function (card) { return true; },
                viewAs: { name: "shandian", },
                prompt: "将一张牌当做【闪电】使用",
                onuse: function (result, player) { player.removeMark('xyizhao', 3); },
            },
            //鬼道
            xguidao: {
                trigger: { global: "judge", },
                direct: true,
                content: function () {
                    "step 0"
                    player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
                        get.translation(trigger.player.judging[0]) + ',' + get.prompt('guidao'), 'hes', function (card) {
                            // if(get.color(card)!='black') return false;
                            var player = _status.event.player;
                            var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                            if (mod2 != 'unchanged') return mod2;
                            var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
                            if (mod != 'unchanged') return mod;
                            return true;
                        }).set('ai', function (card) {
                            var trigger = _status.event.getTrigger();
                            var player = _status.event.player;
                            var judging = _status.event.judging;
                            var result = trigger.judge(card) - trigger.judge(judging);
                            var attitude = get.attitude(player, trigger.player);
                            if (attitude == 0 || result == 0) return 0;
                            if (attitude > 0) {
                                return result;
                            }
                            else {
                                return -result;
                            }
                        }).set('judging', trigger.player.judging[0]);
                    "step 1"
                    if (result.bool) {
                        player.respond(result.cards, 'highlight', 'guidao', 'noOrdering');
                    }
                    else {
                        event.finish();
                    }
                    "step 2"
                    if (result.bool) {
                        player.$gain2(trigger.player.judging[0]);
                        player.gain(trigger.player.judging[0]);
                        trigger.player.judging[0] = result.cards[0];
                        trigger.orderingCards.addArray(result.cards);
                        game.log(trigger.player, '的判定牌改为', result.cards[0]);
                    }
                    "step 3"
                    game.delay(2);
                },
            },
            //雷击
            xleiji: {
                group: "xinleiji_misa",
                audio: "xinleiji",
                derivation: "xinleiji_faq",
                audioname: ["boss_qinglong"],
                trigger: { player: ["useCard", "respond"], },
                filter: function (event, player) {
                    return event.card.name == 'shan' || event.name == 'useCard' && event.card.name == 'shandian';
                },
                judgeCheck: function (card, bool) {
                    var suit = get.suit(card);
                    if (suit == 'spade') {
                        if (bool && get.number(card) > 1 && get.number(card) < 10) return 5;
                        return 4;
                    }
                    if (suit == 'club') return 2;
                    return 0;
                },
                content: function () {
                    player.judge(lib.skill.xinleiji.judgeCheck).judge2 = function (result) {
                        return result.bool ? true : false;
                    };
                },
            },

            //翻斗
            xfandou: {
                enable: "phaseUse",
                usable: 1,
                content: function () {
                    var h_num = player.countCards('h');
                    var max_hp = player.maxHp;
                    "step 0"
                    if (h_num > max_hp) {
                        player.gainMaxHp(h_num - max_hp);
                        player.chooseToDiscard(h_num - max_hp, true);
                    } else {
                        player.loseMaxHp(max_hp - h_num);
                        player.draw(max_hp - h_num);
                    }
                    "step 1"
                    player.recover();
                    player.draw();
                },
            },
            //花园
            xhuayuan: {
                frequent: true,
                trigger: {
                    player: "phaseBegin",
                },
                content: function () {
                    var lost_hp = player.maxHp - player.hp;
                    player.draw(lost_hp);
                },
            },
            //刮胡
            xguahu: {
                forced: true,
                trigger: {
                    player: "damageEnd",
                },
                filter: function (event) {
                    return event.nature == 'thunder' || event.nature == 'fire';
                },
                content: function () {
                    player.loseMaxHp();
                },
            },
    
            //铁骑
            xtieji: {
                audio: "tieji",
                shaRelated: true,
                trigger: { player: "useCardToPlayered", },
                filter: function (event, player) { return event.card.name == 'sha'; },
                logTarget: "target",
                content: function () {
                    "step 0"
                    player.judge(function () { return 0 });
                    if (!trigger.target.hasSkill('xfengyin')) {
                        trigger.target.addTempSkill('xfengyin', { player: 'phaseBegin' });
                    }
                    "step 1"
                    var suit = result.suit;
                    var target = trigger.target;
                    var num = target.countCards('h', 'shan');
                    target.chooseToDiscard('请弃置一张' + get.translation(suit) + '牌,否则不能使用闪抵消此杀', 'he', function (card) {
                        return get.suit(card) == _status.event.suit;
                    }).set('ai', function (card) {
                        var num = _status.event.num;
                        if (num == 0) return 0;
                        if (card.name == 'shan') return num > 1 ? 2 : 0;
                        return 8 - get.value(card);
                    }).set('num', num).set('suit', suit);
                    "step 2"
                    if (!result.bool) {
                        trigger.getParent().directHit.add(trigger.target);
                    }
                },
            },
            //神威:当你使用【杀】造成伤害后,你可以选择一项:1.弃置一张【杀】,令此伤害+1; 2.摸两张牌; 3.获得其一张牌
            xshenwei: {
                audio: "hengwu",
                frequent: true,
                trigger: { source: "damageBegin", },
                filter: function (event, player) {
                    return event.card.name == 'sha';
                },
                content: function () {
                    "step 0"
                    var list = [];
                    if (player.countCards('h', { name: 'sha' })) { list.push('选项一'); }
                    list.push('选项二');
                    if (event.player.countGainableCards(player, 'he') > 0) { list.push('选项三'); }
                    player.chooseControl(list).set("choiceList", ["弃置一张【杀】令伤害+1", "摸两张牌", "获得其一张牌"]);
                    "step 1"
                    if (result.control == '选项一') {
                        player.chooseToDiscard('h', { name: 'sha' }, true);
                        trigger.num++;
                    } else if (result.control == '选项二') {
                        player.draw(2);
                    } else if (result.control == '选项三') {
                        player.gainPlayerCard(trigger.player, true, 'he');
                    }
                },
            },
            //封印
            xfengyin: {
                init: function (player, skill) {
                    player.addSkillBlocker(skill);
                },
                onremove: function (player, skill) {
                    player.removeSkillBlocker(skill);
                },
                charlotte: true,
                skillBlocker: function (skill, player) {
                    return true;
                },
                mark: true,
                intro: {
                    content: function (storage, player, skill) {
                        var list = player.getSkills(null, false, false);
                        if (list.length) return '失效技能：' + get.translation(list);
                        return '无失效技能';
                    },
                },
            },

            /*支配：每轮限一次,你可以与一名角色拼点。
            若你赢, 你可以废除你的一个装备栏, 然后获得其一个非限觉主的技能直到下个回合开始;
            若你没赢, 其对你造成一点伤害并获得一枚“傀”标记。
            拥有“傀”标记的角色手牌上限- 1, 摸牌阶段少摸一张牌, 其回合结束时移除该标记。*/
            xzhipei: {
                enable: 'phaseUse',
                round: 1,
                filter: function (event, player) {
                    return !player.hasSkill('xzhipei_clear')&&player.countCards('h')>0;
                },
                filterTarget:function(card,player,target){
                    return player!=target&&target.countCards('h');
                },
                content: function () {
                    'step 0'
                    player.chooseToCompare(target);
                    'step 1'
                    if (result.bool) {
                        event.goto(2);
                    } else {
                        event.goto(4);
                    }
                    'step 2'
                    event.target = target;
                    var list = [];
                    var listm = [];
                    var listv = [];
                    if (event.target.name1 != undefined) listm = lib.character[event.target.name1][3];
                    else listm = lib.character[event.target.name][3];
                    if (event.target.name2 != undefined) listv = lib.character[event.target.name2][3];
                    listm = listm.concat(listv);
                    var func = function (skill) {
                        var info = get.info(skill);
                        if (!info || info.charlotte || info.hiddenSkill || info.zhuSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable)) return false;
                        return true;
                    }
                    for (var i = 0; i < listm.length; i++) {
                        if (func(listm[i])) list.add(listm[i]);
                    }
                    event.skills = list;
                    if (player.countDisabled() < 5) {
                        player.chooseToDisable();
                    }
                    if (event.skills.length > 0) {
                        player.chooseControl(event.skills);
                    } else { event.finish(); }
                    'step 3'
                    player.addTempSkill(result.control, { player: 'phaseBegin' });
                    player.addTempSkill('xzhipei_clear', { player: 'phaseBegin' });
                    event.target.disableSkill('xzhipei2', result.control);
                    event.target.addAdditionalSkill('xzhipei_' + player.playerid, 'xzhipei2');
                    var mark = get.translation(result.control);
                    event.target.markSkill('xzhipei2', '', '被支配 ' + mark);
                    event.finish();
                    'step 4'
                    player.damage(event.target);
                    event.target.addTempSkill('xzhipei_kui', { player: 'phaseAfter' });
                    event.target.markSkill('xzhipei_kui', '傀','傀');
                    
                },
                subSkill: {
                    clear: {
                        onremove: function (player) {
                            game.countPlayer(function (current) {
                                current.removeAdditionalSkill('xzhipei_' + player.playerid);
                            })
                        },
                        sub: true,
                        parentskill: "xzhipei",
                    },
                    kui: {
                        frequent: true,
                        trigger: {
                            player: "phaseDrawBegin2",
                        },
                        filter:function(event,player){
                            return !event.numFixed;
                        },
                        content:function(){
                            trigger.num--;
                        },
                        mod: {
                            maxHandcard: function (player, num) {
                                return num - 1;
                            }
                        },
                        sub: true,
                        parentskill: "xzhipei",
                    },
                },

            },
            xzhipei2: {
                onremove: function (player, skill) {
                    player.enableSkill(skill);
                },
                intro: {},
                locked: true,
                charlotte: true,
            },

            /*千人：觉醒技,当你死亡时,你复活、复原装备栏并将体力上限改为1点,获得技能【剧场】和1点护盾;
            全场存活角色进入支配剧场,获得技能【信标】和一枚“支”标记。 */
            xqianren: {
                skillAnimation: true,
                animationColor: 'wood',
                juexingji: true,
                forced: true,
                trigger: {
                    player: "dieBefore",
                },
                content: function () {
                    'step 0'
                    trigger.cancel();
                    player.revive(1);
                    player.loseMaxHp(player.maxHp - 1);
                    var num = player.countDisabled();
                    if (num) {
                        for (var i = 1; i < 6; i++){
                            if(player.isDisabled(i)){player.enableEquip(i);}
                        }
                    }
                    player.addSkill('xjuchang');
                    player.changeHujia(1);
                    'step 1'
                    game.countPlayer(function (current) {
                        if(current!=player){
                            current.addSkill('xxinbiao');
                        }
                    }),
                    player.awakenSkill('xqianren');
                }
            },

            /*剧场：锁定技,拥有“支”标记的角色对你造成伤害后,你获得其一个技能直到你下个回合结束。
            每轮开始时,该轮你额外执行X个回合,你的手牌上限+X(X为全场“支”的数量)。 */
            xjuchang: {
                forced: true,
                trigger: {
                    player:"damageAfter",
                },
                filter: function (event, player) {
                    return event.source && event.source.hasSkill('xxinbiao');
                },
                content: function () {
                    'step 0'
                    event.target = trigger.source;
                    var list = [];
                    var listm = [];
                    var listv = [];
                    if (event.target.name1 != undefined) listm = lib.character[event.target.name1][3];
                    else listm = lib.character[event.target.name][3];
                    if (event.target.name2 != undefined) listv = lib.character[event.target.name2][3];
                    listm = listm.concat(listv);
                    var func = function (skill) {
                        var info = get.info(skill);
                        if (!info || info.charlotte || info.hiddenSkill || info.zhuSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable)) return false;
                        return true;
                    }
                    for (var i = 0; i < listm.length; i++) {
                        if (func(listm[i])) list.add(listm[i]);
                    }
                    event.skills = list;
                    if (event.skills.length > 0) {
                        player.chooseControl(event.skills);
                    } else { event.finish(); }
                    'step 1'
                    player.addTempSkill(result.control, { player: 'phaseAfter' });
                    player.addTempSkill('xzhipei_clear', { player: 'phaseAfter' });
                    event.target.disableSkill('xzhipei2', result.control);
                    event.target.addAdditionalSkill('xzhipei_' + player.playerid, 'xzhipei2');
                    var mark = get.translation(result.control);
                    event.target.markSkill('xzhipei2', '', '被支配 ' + mark);
                },
                mod: {
                    maxHandcard: function (player, num) {
                        return num + game.countPlayer(function (current) {
                            return current.hasSkill('xxinbiao');
                        });
                    }
                },
                group: ["xjuchang_huihe","xjuchang_lun"],
                subSkill: {
                    huihe: {
                        trigger: {
                            player: "phaseBefore",
                        },
                        forced: true,
                        frequent: true,
                        content: function () {
                            var num = player.countMark('xjuchang');
                            for (var i = 0; i < num; i++) {
                                player.removeMark('xjuchang', 1);
                                player.insertPhase();
                            }
                        },
                    },
                    lun: {
                        frequent: true,
                        trigger: {
                            global: "roundStart",
                        },
                        content: function () {
                            var num = game.countPlayer(function (current) {
                                return current.hasSkill('xxinbiao');
                            });
                            player.addMark('xjuchang', num);
                        },
                    },
                },
            },

            /*信标：锁定技,当你进入濒死状态时,你移除一枚“支”标记。*/
            xxinbiao: {
                mark: true,
                marktext: "支",
                intro: {
                    name: "支",
                    content: "锁定技,当你进入濒死状态时,你移除一枚“支”标记。",
                },
                forced: true,
                locked: true,
                frequent: true,
                init: function (player) {
                    player.addMark('xxinbiao', 1);
                },
                trigger: {
                    player: "dyingBegin",
                },
                content: function () {
                    player.removeMark('xxinbiao');
                    player.removeSkill('xxinbiao');
                }
            },



            /*钞力：锁定技,你使用或打出一张牌后,获得等于此牌点数的“钞”标记。
            出牌阶段限X次, 你可以移去20张“钞”, 视为使用一种任意基本牌或者普通锦囊牌(X为3-体力上限)。*/
            xchaoli: {
                audio:1,
                enable:"phaseUse",
                filter: function (event, player) {
                    var num = 3-player.maxHp;
                    return (player.getStat("skill").xchaoli||0) < num && player.countMark('xchaoli_chao') >= 20;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var list=[];
                        for(var i=0;i<lib.inpile.length;i++){
                            var name=lib.inpile[i];
                            if(name=='sha'){
                                list.push(['基本','','sha']);
                                for(var j of lib.inpile_nature) list.push(['基本','','sha',j]);
                            }
                            else if(get.type(name)=='trick') list.push(['锦囊','',name]);
                            else if(get.type(name)=='basic') list.push(['基本','',name]);
                        }
                        return ui.create.dialog('钞力',[list,'vcard']);
                    },
                    filter:function(button,player){
                        return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
                    },
                    backup:function(links,player){
                        return {
                            filterCard:true,
                            audio:'scstaoluan',
                            selectCard:0,
                            viewAs: { name: links[0][2], nature: links[0][3]},
                            onuse: function (result, player) {
                                player.removeMark('xchaoli_chao', 20);
                            }
                        }
                    },
                    
                },
                group: "xchaoli_chao",
                subSkill: {
                    chao: {
                        sub: true,
                        parent: "xchaoli",
                        forced: true,
                        trigger: {
                            player: ["useCard", "respond"],
                        },
                        filter: function (event, player) {
                            return typeof get.number(event.card) == 'number';
                        },
                        marktext: "钞",
                        intro: {
                            content: "mark",
                        },
                        content: function () {
                            player.addMark('xchaoli_chao', get.number(trigger.card));
                        },
                    },
                },
            },
            /**博识：摸牌阶段,你可以改为展示牌堆顶的一张牌：若结果与此阶段内以此法展示的结果的点数均不同,
             * 你可以重复此流程,然后你获取一半的展示牌(向上取整),其余牌置于牌堆底,若此时你的手牌全场最多,你失去一点体力。*/
            xboshi: {
                audio:'shuishi',
                trigger:{
                    player:"phaseDrawBegin1",
                },
                filter:function(event,player){
                    return !event.numFixed;
                },
                content: function () {
                    'step 0'
                    trigger.changeToZero();
                    event.numbers = [];
                    event.cards = [];
                    'step 1'
                    var card = get.cards()[0];
                    game.cardsGotoOrdering(card);
                    event.cards.push(card);
                    var card_num = get.number(card);
                    player.showCards(card,);
                    game.delay(2);
                    if (!event.numbers.contains(card_num)) {
                        event.numbers.push(card_num);
                        event.goto(1);
                    }
                    'step 2'
                    game.delay(1);
                    var num = Math.floor(event.cards.length / 2);
                    var num2 = Math.ceil(event.cards.length / 2);
                    var next = player.chooseToMove('获得' + get.cnNumber(num2) + '张牌并将其余牌置于牌堆底', true);
                    next.set('list', [
                        ['牌堆顶的展示牌'],
                        ['牌堆底',cards],
                    ]);
                    next.set('filterMove', function (from, to, moved) {
                        if (moved[0].contains(from) && to == 1) return moved[1].length < _status.event.num;
                        return true;
                    });
                    next.set('filterOk', function (moved) {
                        return moved[1].length == _status.event.num;
                    });
                    next.set('num', num);
                    'step 3'
                    if (result.bool) {
                        var list = result.moved;
                        if (list[0].length) player.gain(list[0], 'gain2');
                        while (list[1].length) ui.cardPile.appendChild(list[1].shift().fix());
                    }
                }
            },
            //秀色：你对女性角色造成伤害时,你可以获得其一张牌;当女性角色对你造成伤害时,你随机弃置一张手牌或装备牌。
            xxiuse: {
                group: ['xxiuse_1', 'xxiuse_2'],
                subSkill: {
                    1: {
                        audio:'roulin',
                        sub: true,
                        parent: "xxiuse",
                        trigger: {
                            source: "damageBegin",
                        },
                        filter: function (event, player) {
                            return event.player.hasSex('female');
                        },
                        content: function () {
                            player.gainPlayerCard(trigger.player, true, 'he');
                        }
                    },
                    2: {
                        audio:'roulin',
                        sub: true,
                        parent: "xxiuse",
                        frequent: true,
                        trigger: {
                            player: "damageBegin",
                        },
                        filter: function (event, player) {
                            return event.source.hasSex('female');
                        },
                        content: function () {
                            card = player.get('he').randomGet();
                            if (card) {
                                player.discard(card);
                            }
                        },
                    },
                }
                
            },
            /*无赖：锁定技,当你处于濒死状态时,若体力上限大于1:
            你减少一点体力上限, 并回复一点体力;若此时体力上限为1, 你进入免伤状态持续到回合开始。*/
            xwulai: {
                forced: true,
                frequent: true,
                trigger: {
                    player: "dyingBegin",
                },
                filter: function (event, player) {
                    return player.maxHp > 1;
                },
                content: function () {
                    'step 0'
                    player.loseMaxHp();
                    player.revive();
                    'step 1'
                    if (player.maxHp == 1) {
                        player.addTempSkill('xwulai_1', {player:'phaseBegin'});
                    }
                },
                subSkill: {
                    1: {
                        sub: true,
                        parent: "xwulai",
                        forced: true,
                        mark: true,
                        marktext: "免伤",
                        intro:{},
                        trigger: {
                            player: "damageBegin",
                        },
                        content: function () {
                            trigger.cancel();
                        },
                    },
                }
            },

        },
        translate: {
            xfeiqiu: "非酋",
            "xfeiqiu_info": "锁定技,每名玩家出牌阶段开始时,若你体力大于1则你进行判定：若点数不为“648”,则你失去一点体力,获得一枚“非”标记。",
            xgandi: "肝帝",
            "xgandi_info": "出牌阶段限一次,你可以主动触发【非酋】的效果并摸一张牌。此回合你每造成一点伤害或每使用三张牌,此技可发动次数+1。",
            xshilian: "十连",
            "xshilian_info": "出牌阶段限一次，你可以移除5枚“非”进行判定从牌堆或弃牌区获得对应数量的基本/装备/锦囊牌。♥2~9,视为【欧】,否则视为【歪】;若点数与体力值相同,视为【皇】。（①歪,1/1/1,获得【保】;②欧,1/2/3,失去5点体力上限;③皇,3/4/5,失去7点体力上限;④【保】,增加2点体力上限并回复两点体力,下次十连视为【欧】）你的体力上限至少为2。",
            xdawei: "大胃",
            "xdawei_info": "你使用【桃】、【酒】时，效果结算两次。",
            xbugua: "卜卦",
            "xbugua_info": "转换技，阳：当你使用锦囊牌时。阴：当你使用或打出非锦囊牌时。你可以进行判定：♥，回复一点体力（若满则摸一张牌）；♦，令一名角色失去一点体力（限一次）；♣，摸一张牌；♠，弃置一名其他角色的一张牌。",
            xnigua: "逆卦",
            "xnigua_info": "限定技，出牌阶段，你可以令某种花色视为另一种花色，同时获得阴阳技（强制进行判定）并解除♦生效的次数上限直至回合结束。",
            xguidao: "鬼道",
            "xguidao_info": "当一名角色的判定牌生效前,你可以打出一张牌替换之",
            xyizhao: "异兆",
            "xyizhao_info": "锁定技,当你失去【闪】时,你可以摸一张牌并获得一枚“雷”标记(最多3个)。准备阶段开始时,你摸X张牌,你的手牌上限+X（X为“雷”的数量）。",
            xtianshu: "天术",
            "xtianshu_info": "出牌阶段,你可以移去3枚“雷”标记,将一张牌当做【闪电】使用。",
            xleiji: "雷击",
            "xleiji_info": "①当你使用【闪】或【闪电】,或打出【闪】时,你可以进行判定。②当你的判定的判定牌生效后,若结果为：黑桃,你可对一名其他角色造成2点雷电伤害；梅花：你回复1点体力并可对一名其他其他角色造成1点雷电伤害。",
            xfandou: "翻斗",
            "xfandou_info": "出牌阶段限一次,你可以将手牌数量与体力上限对调,之后回复一点体力并摸一张牌。",
            xhuayuan: "花园",
            "xhuayuan_info": "准备阶段,你摸已损生命值数量的牌。",
            xguahu: "刮胡",
            "xguahu_info": "锁定技,当你受到属性伤害后,你减少一点体力上限。",
            xtieji: "铁骑",
            "xtieji_info": "当你使用【杀】指定目标后,其所有技能失效直到其下个回合开始,然后你进行判定,除非其弃置与结果花色相同的一张牌,否则不能使用【闪】。",
            xfengyin: "封",
            xshenwei: "神威",
            "xshenwei_info": "当你使用【杀】造成伤害后,你可以选择一项:1.弃置一张【杀】,令此伤害+1; 2.摸两张牌; 3.获得其一张牌",
            xzhipei: "支配",
            "xzhipei_info": "每轮限一次,你可以与一名角色拼点。若你赢, 你可以废除你的一个装备栏, 然后获得其一个非限觉主的技能直到下个回合开始; 若你没赢, 其对你造成一点伤害并获得一枚“傀”标记。拥有“傀”标记的角色手牌上限- 1, 摸牌阶段少摸一张牌, 其回合结束时移除该标记。",
            xqianren: "千人",
            "xqianren_info": "觉醒技,当你死亡时,你复活、复原装备栏并将体力上限改为1点,获得技能【剧场】和1点护盾; 全场存活角色进入支配剧场,获得技能【信标】和一枚“支”标记。",
            xjuchang: "剧场",
            "xjuchang_info": "锁定技,拥有“支”标记的角色对你造成伤害后,你获得其一个技能直到你下个回合结束。每轮开始时,该轮你额外执行X个回合,你的手牌上限+X(X为全场“支”的数量)。",
            xxinbiao: "信标",
            "xxinbiao_info": "锁定技,当你进入濒死状态时,你移除一枚“支”标记。",
            xchaoli: "钞力",
            "xchaoli_info": "锁定技,当你使用或打出一张牌后,获得等于此牌点数的“钞”标记。出牌阶段限X次, 你可以移去20张“钞”, 视为使用一种任意基本牌或者普通锦囊牌(X为3-体力上限)。",
            xboshi: "博识",
            "xboshi_info": "摸牌阶段,你可以改为展示牌堆顶的一张牌：若结果与此阶段内以此法展示的结果的点数均不同,你可以重复此流程,然后你获取一半的展示牌(向上取整),其余牌置于牌堆底,若此时你的手牌全场最多,你失去一点体力。",
            xxiuse: "秀色",
            "xxiuse_info": "你对女性角色造成伤害时,你可以获得其一张牌;当女性角色对你造成伤害时,你随机弃置一张手牌或装备牌。",
            xwulai: "无赖",
            "xwulai_info": "锁定技,当你处于濒死状态时,若体力上限大于1:你减少一点体力上限, 并回复一点体力;若此时体力上限为1, 你进入免伤状态持续到回合开始。",

        },
    },
    intro: "",
    author: "wking",
    diskURL: "",
    forumURL: "",
    version: "1.0",
},
    files: {
        "character": [],
        "card": ["htchui.jpg"],
        "skill": []
    },
}
})