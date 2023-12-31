原作者:极光,有删改
前言:
 (1)每写一个对象前,请确认是否有这一对象,没有的话请自行定义
 (2)检测bug用lib.node.debug()
 (3)具体触发内容看game.js内lib.element.event内的函数
 (4)本教程只教框架
1.触发:
 基本框架:
 trigger:{//触发时机
 global:'damageBefore',//例子,任意一名角色受到伤害前
 player:'damageBefore',//例子,玩家受到伤害前
 player:['damageBefore','recoverAfter'], //例子,玩家受到伤害前或玩家恢复体力后
 },
 priority:1,//同时机技能发动的优先度
 check:function(event,player){//告诉ai是否发动这个技能,返回true则发动此技能
 },
 frequent:true,//此技能是否可以被设置为自动发动(不询问)
 forced:true,//此技能是否为锁定技,只能用于触发技
 locked:true,//此技能是否为锁定技
 //判断技能是否为锁定技:get.is.locked(skill)
 popup:false,//player是否logSkill('此技能'),默认为true
 direct:true,//直接发动
 filter:function(event,player){//触发条件,返回true则发动此技能
 /*
 不同时机evevt参数的属性不同
 常见的属性有
 evevt.player  事件角色
 事件卡牌
 evevt.card
 evevt.cards
 在弃牌阶段(phaseDiscard),evevt.card是不存在的,即使只弃了一张牌
 */
 },
 content:function(){//技能内容,分步执行会在后面讲到
 //注意:在content中trigger相当于filter:function(event,player){}内的event
 //而event是content中的存储对象,与filter中的event不同
 player.recover();//例子,玩家回复一点体力
 }
2.主动:
 基本框架:
 enable:"phaseUse",//出牌阶段使用
 usable:1,//每回合限制使用次数 
 //限制使用次数为变量时需写在filter:function(event,player){}内
 filter:function(event,player){//发动条件,返回true则可以发动此技能
 /*限制使用次数为变量时:
 if(player.getStat().skill['技能名']>=变量) return false;(变量可以写player.hp等)
 return true;
 */
 return player.hp<2;//例子,玩家体力小于2时可以发动
 },
 
 selectCard:2,//需要选择多少张牌才能发动
 //为-1时,选择所有牌
 //为数组时,这个数组就是选择牌数的区间
 /*为变量时(具体情况具体分析):
 function(card){//例子,变量为玩家体力时
 var player=get.owner(card);//player定义为选择牌中的牌的拥有者,即"你"
 return [player.hp,Infinity];//返回可选手牌数为你的体力值到无限
 },
 */
 filterCard:function(card){//选择的牌需要满足的条件
 return get.color(card)=='red';//例子,只能选择红色牌
 },
 //filterCard:{color:"red"},//简略写法,卡牌的描述对象,选择的牌需要满足什么条件
 position:'hej',//可以选择什么位置的牌
 //写入其中的字符:'h':手牌区, 'e':装备区, 'j':判定区 
 check:function(card){//ai应该如何选牌,返回值为正则此牌可选,反之,此牌不可选
 //当技能为弃牌类主动技时,check为ai弃牌函数,与触发技不同
 //主动技中的check只指卡牌的ai函数
 //目标target的选取根据ai部分的收益论进行选取
 /*
 在check中定义玩家(你):
 var player=get.owner(card);
 */
 return 6-get.value(card);//例子,ai可选价值小于6的卡牌
 },
 discard:false,//是否弃牌,若没有这一行,选择牌发动技能后,被选择的牌都要弃置
 prepare:'give',//不弃牌,准备用这些牌来干什么
 
 selectTarget:1,//需要选择多少个目标才能发动
 //为-1时,选择全部人
 //为数组时,这个数组就是选择目标数的区间
 //可以为函数
 multitarget:true,//多个目标一起结算,否则每个目标结算一次
 filterTarget:function(card,player,target){//选择的目标需要满足的条件
 //参数中的card是固定参数,即使发动技能不需要弃牌
 return target!==player;
 }, 
 targetprompt:[],//选择的目标武将牌上出现什么字,数组第几元素对应第几个目标
 line:true,//选择目标,发动技能后,玩家指向目标
 
 content:function(){//触发内容,分步执行会在后面讲到
 //当有filterCard时,有参数cards
 //当有filterTarget时,有参数target和targets
 player.recover();//例子,玩家回复一点体力
 }
 
3.视为技:
(1)转化为一张卡牌:
 基本框架:
 name:'技能',//技能按钮名字,不写则默认为此技能的翻译
 enable:['phaseUse','chooseToRespond'],//发动视为技的时机,现在为出牌阶段和响应时
 
 selectCard:2,//需要选择多少张牌才能发动,和主动的selectCard相同,不解释
 position:'hej',//可以选择什么位置的牌,和主动的position相同,不解释
 filterCard:{type:'basic'},//选择的牌需要满足什么条件
 /*上面那种是简便写法,多次判断的话还是要写回旧格式:
 filterCard:function(card){
 return get.color(card)=='black';//例子,只能选择黑色牌
 },
 */
 check:function(card){//ai应该如何选牌,和主动的check相同,不解释
 return true;//例子,ai可以所有所有手牌
 },
 
 viewAs:{name:'tao'},//目标卡牌
 prompt:'将一张基本牌当桃使用或打出',//选择时弹出的提示
 viewAsFilter:function(player){//视为技按钮出现条件(即发动条件)
 return player.maxHp==4;//例子,玩家体力上限为4时可以发动
 },
 onuse:function(result,player){//使用视为牌时触发内容,result.cards是视为前的牌
     player.recover();//例子,使用视为牌时玩家回复一点体力
 }
 
(2)转化为多张卡牌:
 基本框架:
 enable:'phaseUse',//发动视为技的时机,现在为出牌阶段
 usable:1,//每回合限制使用次数,和主动的usable相同,不解释
 filter:function(event,player){//发动条件,和主动的filter相同,不解释
 return player.countCards('h')>0//例子,玩家手牌数大于0时可以发动
 },
 chooseButton:{//选择按钮(牌)
     dialog:function(){//选择内容,一般为选择卡牌,有能力的可以写成选择其他东西
     return ui.create.dialog([['sha','shan'],'vcard']);//可以选择杀和闪(卡牌)
     },
     filter:function(button,player){//卡牌选择条件
     return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
     //例子,你可以选择你可以使用的卡牌
     },
     check:function(button){//ai如何选牌
     /*定义player:
     var player=_status.event.player;
     */
     if(button.link=='sha') return 1;//ai选择杀
     },
     backup:function(links,player){//返回视为(1)部分
         return {//例子
             filterCard:false,//不用弃牌
             selectCard:0,//弃牌数为零
             viewAs:{name:links[0][2]},//视为你使用你选择的牌
         }
     },
     prompt:function(links,player){//选择时弹出的提示
     return'请选择'+get.translation(links[0][2])+'的目标';
     //例子,弹出提示:选择你选择的牌的目标
     }
 }
4.AI:
 (注:可接视为框架、主动框架或触发框架)
 (注2:这部分我不是很熟悉,所以只能简单地说一下)
 基本框架:
 
 ai:{
 save:true, //此技能可以用于自救
 respondTao:true, //此技能可以用于救人,一般用于视为技
 respondShan:true,//此技能可以响应闪,一般用于视为技
 respondSha:true,//此技能可以响应杀,一般用于视为技
 order:8, //ai发动技能的优先度
 /*比什么先:
 order:function(){//例子,比打出杀的优先度高1
 return get.order({name:'sha'})+1;
 },
 */
 expose:0.2, //发动技能是身份暴露度(0~1,相当于概率)
 maixie:true, //卖血技
 threaten:0.5,//嘲讽值
 
 result:{//主动技专属
     target:function(player,target){//ai如何选择目标
         //返回负,选敌人,返回正,选队友
         //没有返回值则不选
         //写了这个就不用写player:function(player){}了
         //因为player可以在这里进行判断
         If(player.hp>2) return -1;//例子,玩家体力大于2时,发动技能并选择敌人
     },
     player:function(player){//ai是否发动此技能,返回正,发动,否则不发动
        if(player.countCards('h')<2)return 1;//例子,玩家手牌数小于2时,发动 },
     },
     effect:{//影响ai出牌(例如什么时候不出杀)等
        //没有深入研究,不讲
     },
     skillTagFilter:function(player){//视为技专属,ai什么时候可以发动视为技
        return player.countCards('h',{type:'basic'})>0;
        //例子,手牌中有基本牌时,ai发动技能
     }
 }

5.标记:
(注:可接视为框架、主动框架或触发框架)
 基本框架:
 marktext:"状",//标记显示文本,一般为一个字
 intro:{
     content:'cards',//标记显示内容,为cards时显示标记内的牌
     
     /*标记显示内容为文本写法:
     content:function(storage,player,skill){//返回值(文本)即为标记显示内容
     return '当前有'+storage+'个标记'//标记显示内容为当前有多少个标记
     },*/
 },
 mark:true,//获得技能时是否显示此标记,若为false,可以用markSkill()来显示此标记
6.获得技能和失去技能时:
(注:可接视为框架、主动框架或触发框架)
 基本框架:
 init:function(player){//获得技能时发动
 player.gainMaxHp();//例子,获得此技能时,玩家增加一点体力上限
 },
 onremove:function(player){//失去技能时发动
 player.loseMaxHp();//例子,失去此技能时,玩家失去一点体力上限
 },
7.技能组与子技能:
(注:可接视为框架、主动框架或触发框架)
 基本框架:
 group:["mashu"],//技能组,拥有这个技能时相当于拥有技能组内的技能
 subSkill:{//子技能,你不会拥有写在这里面的技能,可以调用,可以用技能组联系起来
 "子技能":{//子技能名字:"主技能_子技能",翻译为主技能翻译
 //技能内容
 },
 },
8.mod类锁定技:
(注:可接视为框架、主动框架或触发框架)
 基本框架:
 mod:{
 globalFrom:function(from,to,distance){
 return distance-1; //例子,进攻距离+1
 },//from:玩家;to:目标;distance:进攻距离
 globalTo:function(from,to,distance){
 return distance+1; //例子,防御距离+1
 },//to:玩家;from:目标;distance:防御距离
 maxHandcard:function(player,num){
 return num+1; //例子,手牌上限+1
 },// player:玩家;num:手牌上限
 targetEnabled:function(card,player,target){
 if(player.sex=='male') return false; //例子,你不能成为男性角色的牌的目标
 },//card:牌;player:使用牌的角色;target:玩家
 selectTarget:function(card,player,range){
 if(card.name=='sha') range[1]+=1; //例子,你的杀可以额外选择一名角色
 },//card:牌;player:玩家;range[1]:目标个数; range:不清楚
 targetInRange:function(card,player,target){
 if(card.name=='sha') return true;//例子,你使用的杀可以指定所有角色
 },//card:牌;player:玩家;target:目标
 cardDiscardable:function(card,player){
 if(card.name=='sha') return false; //例子,你无法弃置杀
 },//card:牌;player:玩家
 cardEnabled:function(card,player){//要与cardUsable一起使用
 if(get.suit(card)=='heart') return false;//例子:你无法使用红桃牌
 },//card:牌;player:玩家
 cardUsable:function(card,player){//要与cardEnabled一起使用
 if(get.suit(card)=='heart') return false; //例子:你无法使用红桃牌
 },//card:牌;player:玩家
 cardRespondable:function(card,player){
 if(get.suit(card)=='heart') return false; //例子:你无法使用红桃牌来响应
 },//card:牌;player:玩家
 cardSavable:function(card,player){
 if(get.suit(card)=='heart') return false; //例子:你无法使用红桃牌来救人
 },//card:牌;player:玩家
 /*后4种卡牌禁言类mod技与视为技冲突的解决方法:
 判定内加入_status.event.skill!='冲突视为技'
 意思为你无法使用牌,除非使用这个视为技视为无法使用的牌
 */
 },
9.配音的添加:
(注:可接视为框架、主动框架或触发框架)
 基本框架:
 audio:true,
 
 //数字为配音数量,从1开始
 //配音命名方法:技能名+这是第几个配音
 audio:2,//使用无名杀目录\audio\skill内的配音
 audio:"ext:扩展名:1",//使用无名杀录目\extension\扩展名内的配音
 
10.主公技:
(注:可接视为框架、主动框架或触发框架)
 基本框架:
 zhuSkill:true,//将这个技能设置为主公技
 
11.全局技能:
(注:可接视为框架、主动框架或触发框架)
(注:无论是否拥有此技能,此技能都为全局技能写法:技能名前+_)
 基本框架:
 global:'技能',你用有此技能时,所有角色拥有技能(global的值)
 
12.触发内容分步:
(注:写在触发内容中)
 基本框架:
 'step 0'
 //此步骤触发的内容
 'step 1'
 //此步骤触发的内容
与步骤有关的函数:
(1)evevt.finish() 触发后步骤不再往下走,终止于evevt.finish()所在步骤
(2)event.goto(num) num为步骤数,返回第几步
(3)event.redo() 重新执行这个步骤
注意:
(1)引号要相同,不要'step 0' "step 1"
(2)使用与步骤有关的函数,这个步骤依旧会进行到底
(3)var定义的东西不能在步骤中传递,可以储存到evevt中
(4)函数的result元素可以在相邻的步骤中传递
(5)步骤必须从0开始
(6)step和数字之间有一个空格,word文档中不易看出来
例子:
 "step 0"//步骤0
 player.chooseTarget('请选择一名角色',function(card,player,target){
 return player!=target;
 }).ai=function(target){
 return get.attitude(player,target);//告诉ai选择队友
 };//选择一名其他角色
 "step 1"//步骤1
 if(result.bool){//如果有选择角色
 event.target=result.targets[0];//将选择的角色储存到event.target中
 player.chooseCard('请选择给予牌',2,'h').set('ai',function(card){
 return 1;//告诉ai可以选择所有手牌
 });//选择两张手牌
 }else{//否则
 event.finish();//步骤将于这里终止
 }
 "step 2"//步骤2
 if(result.bool){//如果有选择手牌
 player.$give(result.cards.length,event.target);
 event.target.gain(result.cards,player);//被选择的角色获得这两张牌
 };
