　　【阶段类】
	phaseName:['phaseZhunbei','phaseJudge','phaseDraw','phaseUse','phaseDiscard','phaseJieshu'],
	
	enterGame
　　gameStart
　　所有人都展示武将牌后 (前缀必须为global)
　　gameDrawBefore/Begin/End/After
　　游戏开始阶段 前/时/后/结束后 (前缀必须为global)
　　phaseBefore/Begin/End/After
　　回合阶段 开始前/时/后/结束后
    phaseZhunbeiBefore/Begin/End/After
　　准备阶段 开始前/时/后/结束后
　　phaseJudgeBefore/Begin/End/After
　　判定阶段 开始前/时/后/结束后
　　phaseDrawBefore/Begin/End/After
　　摸牌阶段 开始前/时/后/结束后
　　phaseUseBefore/Begin/End/After
　　出牌阶段 开始前/时/后/结束后
　　phaseDiscardBefore/Begin/End/After
　　弃牌阶段 开始前/时/后/结束后
    phaseJieshuBefore/Begin/End/After
　　结束阶段 开始前/时/后/结束后
　　【卡牌类】
　　shaBefore/Begin/End/After/Miss
　　使用杀 之前/时/后/结束后/被闪后
    player:"shaMiss"
    使用杀未命中
    
　　juedouBeforeBegin/End/After
　　使用决斗 之前/时/后/结束后
　　loseBefore/Begin/End/After
　　失去卡牌 之前/时/后/结束后
　　gainBefore/Begin/End/After
　　获得卡牌 之前/时/后/结束后
　　useCardBefore/Begin/End/After
　　使用卡牌 之前/时/后/结束后
　　useCardToBefore/Begin/End/After
　　使用卡牌指定 之前/时/后/结束后
　　respondBefore/Begin/End/After
　　打出卡牌 之前/时/后/结束后
　　drawBefore/Begin/End/After
　　从牌堆摸牌 之前/时/后/结束后
　　equipBefore/Begin/End/After
　　装备装备牌 之前/时/后/结束后
　　【体力类】
　　damageBefore/Begin/End/After
　　受到伤害 之前/时/后/结束后
　　(若前缀为source则为你造成伤害)
　　loseHpBefore/Begin/End/After
　　失去(流失)体力 之前/时/后/结束后
　　recoverBefore/Begin/End/After
　　回复体力 之前/时/后/结束后
　　changeHpBefore/Begin/End/After
　　体力值发生改变  之前/时/后/结束后
　　loseMaxHpBefore/Begin/End/After
　　减少体力上限 之前/时/后/结束后
　　gainMaxHpBefore/Begin/End/After
　　增加体力上限 之前/时/后/结束后
　　【状态类】
　　chooseToRespondBefore/Begin/End/After
　　在你需要响应卡牌 之前/时/后/结束后
　　turnOverBefore/Begin/End/After
　　武将牌翻面 之前/时/后/结束后
　　linkBefore/Begin/End/After
　　武将牌横置(连环) 之前/时/后/结束后
　　dyingBefore/Begin/End/After
　　进入濒临状态 之前/时/后/结束后
　　dieBefore/Begin/End/After
　　死亡 之前/时/后/结束后



    【主动技时机】
　　enable:"phaseUse", 回合使用
　　enable:"chooseToUse", 挑选卡牌以使用
　　enable:"chooseToRespond", 挑选卡牌以响应



技能效果
player.draw(x) 玩家摸x张牌,x可不填,不填时默认为1

player.recover(x) 玩家回复x点体力,x可不填,不填时默认为1

player.damage(a,'b') 玩家受到a点b属性伤害,b为thunder是时雷属性,b为fire时是火属性

player.loseHp(x) 玩家流失x点体力,x可不填,不填时默认为1

player.gainMaxHp(x) 玩家体力上限+x,x可不填,不填时默认为1

player.loseMaxHp(x) 玩家体力上限-x,x可不填,不填时默认为1

player.chooseToDiscard(a,b) 玩家选择弃置a张牌,a不填时默认为1,b不填时可以取消弃置,b为true时强制弃置

player.discard(a) 玩家选择失去a张牌

player.turnOver(a) a不填时玩家翻面,a填false时玩家解除翻面,填其他时未尝试

player.link(a) a不填时玩家横置,a填false时玩家解除横置,填其他时未尝试



player.die() 玩家立刻死亡

player.revive() 玩家复活,体力回复至一点

player.out() 玩家离开游戏

player.remove() 玩家移出游戏,回不来的这种

player.delete() 神圣死亡

player.awakenSkill('a') 限定技专用,a为技能名,让技能不可再次使用,该语句需要和player.storage.a=true连用  如player.storage.神音=true;    player.awakenSkill('神音');

    

player.removeSkill('a') 玩家失去a技能,a为技能名

player.clearSkills() 玩家清空所有技能

player.update() 玩家刷新状态

player.setIdentity('a') 设置玩家身份/势力为a,需要和player.identity=a 和player.node.identity.dataset.color='xxx'和player.identityShown=true等语句连用

player.goMad() 玩家陷入混乱

player.skip('a')玩家跳过a阶段,如a为phaseJudge时,跳过判定阶段

player.init('a') 将玩家的武将牌替换为a,a为武将名

player.addSkill('a') 玩家获得a技能,a为技能名

player.addTempSkill('a','b') 玩家获得a技能直至b时刻,a为技能名。b为时机,如phaseAfter



player.logSkill('a',b) 游戏记录里出现 玩家+a+b 的说明,其中a为字符串,可以打任意汉字,b为之前代码中已定义的事件或时点或角色,也可不填

player.gain(a,b) 玩家获得a张牌,a不填时默认为1,b不填时可以取消弃置,b为true等杂七杂八的东西时强制获得 
如  player.gain(2,target);
    target.$giveAuto(1,player);
获得目标的2张牌,还给他1张牌

player.changeHujia(a);  玩家获得a点护甲,可填负数
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

常用词汇:
trigger触发,phase阶段, player玩家,current当前玩家, target其他玩家, global场上所有角色, event事件,card牌, handCard手牌 ,equip装备牌, trick锦囊牌,
delay延时性锦囊, h手牌, e装备牌 , j判定牌, hp体力(即是血量), maxHp体力上限, damage受伤 , lose失去, recover回复体力, discard弃置牌, draw摸牌, sep 步骤,
fire火焰伤害,thunder雷属性伤害,true成功, false失败,storage可理解为技能的标记,mark标记,countCard牌数, result结果,random随机,compare比较、拼点,gain获得,$gain给出牌,
skill技能, add增加





举例:目标受到一点火焰伤害:target.damage('fire');
 你摸3张牌:player.draw(3);
注:受伤和失去体力是不一样的,语句结束用分号;函数框架结束用逗号,所有符号都要英文输入法状态,代码里出现中文一般要用英文单引用 '' 括着。
selectTarget目标  如  selectTarget:[1,5],指主动技选择1~5个目标    content:function ()里写技能的效果 
   filter:function (event,player){},里写发动技能的条件 小括号内的词随技能而变 
如  filter:function (event,player){
        return get.color(event.card)=='black';
    },判断黑色牌的条件 红色是red替换black即可
filter:function (event,player){
        return event.card.name=='shan'
    },判断某种牌的条件 将牌名替换即可
filter:function (event,player){
        return get.type(event.card)=='basic';
    },判断基本牌的条件 trick,绵囊equip装备
filter:function (event,player){
        return event.player.sex=='female';      
    },判断性别的条件 male男 female女
filterCard 选择卡牌的条件
position 可选择卡牌的类型
如position:"he",表可选择手牌和装备牌
filterCard:function (card,player){
        
        return get.suit(card)=='club';
    },判断某种花色牌的条件  



type类型,basic基本牌,color卡牌颜色,spade黑桃,heart红桃,club梅花,diamond方块equip1武器 equip2 防具 equip3防御马 equip4进攻马 equip5宝物




如  trigger:{
        player:"shaBegin",
    },
filter:function (event,player){
        return event.card&&get.color(event.card)=='red';
    },  event.card触发事件的卡牌 在该条件下为杀为红色杀的条件 





用上面的符号连接两个条件成新条件 颜色为红且是杀等于红色杀
filterTarget指定目标的条件
如 
 filterTarget:function (card,player,target){
        if(player==target) return false;
        if如果         反回假表失效
return true;表能生效

    },目标不能为自己,为指定一名其它角色





时机模版




主动类这样写:
enable:"phaseUse", 表示出牌阶段,phase是阶段的意思
usable:1,数字可以更改,表示每回合可发动次数
round:2,数字可以更改,表示每几轮限1次
frequent:true,是否可以设置自动发动
forced:true,表示锁定技






触发类:
格式:global:{触发者:"触发时机"},
触发者先确定是谁触发,一般有三种:场上的人写global,自己写player,自己为来源写source,其他人为target
多个时机触发如
player:["useCard","respond"],这样写用中括号括起来
trigger.cancel();取消
trigger:{
    player:"damageBefore",
},
content:function (){
trigger.cancel()
}




trigger:{
    player:["loseHpBefore","loseMaxHpBefore"],
},
forced:true,
unique:true,
content:function (){
trigger.untrigger();
trigger.finish();
},体力流失和失去体力上限 对你无效的代码



子技能,为实现一个技能实现多个效果
group:["a","b"],a b为技能名
group:["技能名_1"],
    subSkill:{
        "1":{
            trigger:{
                player:"shaBegin",
            },
            filter:function (event,player){
        return game.roundNumber*2>player.hp;
    },
            mod:{
                targetInRange:function (card){
            if(card.name=='sha') return true;
        },
                cardUsable:function (card,player,num){
            if(card.name=='sha') return Infinity;
        },
            },
            sub:true,
        },
    },写在一个技能内的模版






常用mod技


mod:{
        maxHandcard:function (player,num){
            return num+=a;
        },手牌上限加a
        cardUsable:function (card,player,num){
            if(card.name=='sha') return num+1;
        },使用杀的数量限制加1
        globalFrom:function (from,to,distance){
            return distance-a;攻击距离加a
        },
    },


mod:{
        globalTo:function (from,to,distance){
            return distance+a;防御距离加a
        },
    },



转换牌技能



奇袭为例
  viewAs:{
        name:"guohe",
    },要转化的牌的名称
    viewAsFilter:function (player){
        if(!player.countCards('he',{color:'black'})) return false;
    },被转化牌的条件
    prompt:"将一张黑色牌当过河拆桥使用",


判定模版
 target.judge(function(card){
            if(get.color(card)=='black'){} return -5;
         
        });}来源为洛神



令角色获得一个技能,持续a回合
target.storage.技能名=a;
        target.addSkill('技能名');
在35秒后对目标造成3点伤害
setTimeout(
            function () {
            target.damage(3);},
            35000);
    },



player.hp自己的血量
用处
如player.draw(player.hp);摸玩家当前体力数的牌
mod:{
        maxHandcard:function (player,num){
            return num+=a;
        },},手牌上限加玩家当前体力数




*乘  /除  player.draw(player.hp*2);摸玩家当前体力数两倍的牌
可灵活运用+ - * /表数量关系





var 赋值 var num=player.maxHp-player.hp 此时num代表玩家已损失体力数
.randomGet()随机





运用
var num=[1,2,3].randomGet();
        if(num==1) player.draw();
        if(num==2) player.draw(2);
        if(num==3) player.draw(3);
随机摸1~3张牌
var n=[1,2,3].randomGet();
            if(n==1) player.gainMaxHp();
            if(n==2) target.changeHujia(2);
            if(n==3) player.recover();




随机发动1种效果
&&Math.random()<=0.4概率为40% 可改数字
要与条件连用



标记模版
mark:true,标记
    init:function (player){
        player.storage.技能名=0;自己的初始标记数
        game.addVideo('storage',player,['技能名',player.storage.技能名]);
    },
marktext:"甲",标记显示的字




标记显示
    intro:{
name:"寒星甲",标记名
        content:function (storage){
            return '当前能量:'+storage+'/700';标记上限
        },
    },
skill={
    audio:"ext:武将突破:true",
    trigger:{
        player:"useCard",
    },
    forced:true,
    mark:true,
    init:function (player){
        player.storage.技能名=1;
        game.addVideo('storage',player,['技能名',player.storage.技能名]);
    },
    content:function (player){
        player.storage.技能名+=1;增加1个标记
        game.addVideo('storage',player,['技能名',player.storage.技能名]);游戏显示
    },
    intro:{
        content:"mark",
    },
}  使每使用一张牌获得一个标记








常用短语







damage()._triggered=null 神圣伤害

player.disableEquip(2);  废除装备

player.enableEquip() 回复装备

player.countCards('h') 当前的牌数

player.getStat().card.sha--; 出杀次数+1

game.countPlayer() 场上的玩家

player.chooseToDiscard(true,'h')玩家选择弃置一张手牌

return player.isMinHp(); 体力为最少或其中之一

var num=game.countPlayer(function(current){
            return current.hp>player.hp;
        });场上血量比玩家多的角色数

game.countPlayer(function(current){                                
return current.group=='wei'});场上的魏势力角色数

game.countGroup();场上的势力

player.draw(); 摸一张牌

player.recover(); 回复一点体力

player.damage(); 受到一点伤害

player.changeHujia(); 增加一点护甲

player.addSkill('技能的名字'); 玩家增加技能
player.addTempSkill('技能的名字',{时机}); 玩家获得临时技能时机那里填持续到什么时间

player.loseHp(); 玩家失去X点体力,X为()里填的数字

player.init('武将的名字');玩家将武将替换为括号里所填写的武将

player.link(); 玩家横置

player.turnOver(); 玩家翻面














----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
本教程默认配音文件都是两个,数字2可以根据配音文件数更改。
第一种方法是无须将配音文件放在扩展内的,比如引用攻习的配音,写法是audio:['gongxin',2],如果要将配音文件打包到扩展内就是另一种写法,先讲武将技能的。
编辑器直接写audio:2,就行了,保存后会自动变成audio:"ext:扩展名:2", 其他地方要写成audio:"ext:扩展名:2",将配音打包一起导入很方便玩家。。。。。。
很多人写扩展时起的技能名会直接起中文名(如图),这样虽然也能保存,但问题重重,因为这种忽视掉技能ID的做法会让配音失灵,
而且如果你是直接引用其他技能甚至是其他扩展的技能,会出现技能与原技能效果一样甚至有一大堆BUG卡死游戏,毕竟不是每个人安装的扩展都一样。所以写技能最好要写ID,
切记:ID要唯一,不能与其他技能的ID一样,而且最好尽量用英文小写！！！否则自带编辑器会保存不了,即使用其他软件编辑也会有问题。

 
 


格式:id+|+技能中文名 ,| 是英文输入法下输入的长竖。ID要唯一,不能重复,如我想重写个攻心,ID起gongxin ,它就会提示与现有的重复。所以我另起一个xingongxin,它就能保存了,
保存后这个ID会隐藏的, 然后你的配音文件就命名为xingongxin1和xingongxin2放到扩展文件夹里就行,有了这个ID,它就会定向找到这两个文件并随机播放其中一个！这里有一个要注意的地方,
整个技能内的所有技能凡出现都要统一,不能外面写xingongxin,然后里面还是gongxin。武将命名最好也用这个格式




常见问题:有些触发类的技能在武将简介处明明有声音,也有配音接口代码audio:"ext:扩展名:2",,但游戏过程中却没有声音！这是因为direct:true,在捣乱,它是直接跳过询问到下一步所以没声音,
那该怎么办？删除这句又会降游戏体验。这时只需logSkill一下(终于知道这句有什么用了吧),在content:function里面合适的步骤(比如一般在if(result.bool){ )
这句里面加一句player.logSkill('id');即可。有些简介有声音游戏中没声音,还有个原因是这个技能是技能组,游戏时响应的是子技能,所以配音要配子技能的,配音文件名也是对应子技能的
卡牌配音问题:有些卡牌是没有引用卡牌技能而是直接将技能写在卡面上的,你会发现写这句接口代码audio:"ext:扩展名:2", 已经没用,解决办法是写成audio:true,
但要将配音文件放在游戏主目录audio-card-male/female里各一个,很麻烦,有没有更好的办法？有！




那就是在主函数区重新定义一个播放函数game.playxxx ,比如:
game.playXu = function(fn, dir, sex) {
			if (lib.config.background_speak) {
				if (dir && sex)
					game.playAudio(dir, sex, fn);
				else if (dir)
					game.playAudio(dir, fn);
				else
					game.playAudio('..', 'extension', '扩展包名', fn);
			}
		};
然后在代码里的content:function{} 或precontent:function{}(某些视为类技能没content:function{}的可额外写precontent:function{})里面写上
game.playXu(['xxx1','xxx2'].randomGet());即可
 
扩展的阵亡配音写法(可与扩展一起打包)
 	lib.skill._zhengwangpeiyin={
				    trigger:{global:'dieBegin',},
							//direct:true,
							priority:2,
							forced:true,
         unique:true,
         frequent:true,
         /*filter:function (event,player){
                  return !event.player.isAlive();
          },*/
					   content:function(){					
	//方法一:				   	   
 game.playAudio('..','extension','扩展包名',trigger.player.name);
					//另一种陈列写法:		 
					  /*  if(trigger.player.name=='xwj_xhuoying_itachi'){
								   game.playXu('itachi');					            
						        }*/			   
				        
 					  	},
			   			}			

注:将这段代码复制到主代码区里,建议将zhengwangpeiyin重新改另一个名,前面的_不能删,扩展包名必须改成你的扩展名,阵亡配音文件改成与你的武将id一致。


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
配音问题



第一种方法是无须将配音文件放在扩展内的,如果要将配音文件打包到扩展内就是另一种写法,先讲武将技能的。编辑器直接写audio:2,就行了,保存后会自动变成audio:"ext:扩展名:2", 其他地方要写成audio:"ext:扩展名:2",将配音打包一起导入很方便玩家。。。。。。很多人写扩展时起的技能名会直接起中文名(如图),这样虽然也能保存,但问题重重,因为这种忽视掉技能ID的做法会让配音失灵,而且如果你是直接引用其他技能甚至是其他扩展的技能,会出现技能与原技能效果一样甚至有一大堆BUG卡死游戏,毕竟不是每个人安装的扩展都一样。所以写技能最好要写ID,切记:ID要唯一,不能与其他技能的ID一样,而且最好尽量用英文小写！！！否则自带编辑器会保存不了,即使用其他软件编辑也会有问题。




第一种方法是无须将配音文件放在扩展内的,比如引用攻习的配音,写法是audio:['gongxin',2],


默认配音文件都是两个,数字2可以根据配音文件数更改



格式:id+|+技能中文名 ,| 是英文输入法下输入的长竖。ID要唯一,不能重复,如我想重写个攻心,ID起gongxin ,它就会提示与现有的重复。所以我另起一个xingongxin,它就能保存了,保存后这个ID会隐藏的, 然后你的配音文件就命名为xingongxin1和xingongxin2放到扩展文件夹里就行,有了这个ID,它就会定向找到这两个文件并随机播放其中一个！这里有一个要注意的地方,整个技能内的所有技能凡出现都要统一,不能外面写xingongxin,然后里面还是gongxin。(武将命名最好也用这个格式)



常见问题:有些触发类的技能在武将简介处明明有声音,也有配音接口代码audio:"ext:扩展名:2",,但游戏过程中却没有声音！这是因为direct:true,在捣乱,它是直接跳过询问到下一步所以没声音,那该怎么办？删除这句又会降游戏体验。这时只需logSkill一下(终于知道这句有什么用了吧),在content:function里面合适的步骤(比如一般在if(result.bool){ )这句里面加一句player.logSkill('id');即可。


补充一下:有些简介有声音游戏中没声音,还有个原因是这个技能是技能组,游戏时响应的是子技能,所以配音要配子技能的,配音文件名也是对应子技能的


卡牌配音问题:有些卡牌是没有引用卡牌技能而是直接将技能写在卡面上的,你会发现写这句接口代码audio:"ext:扩展名:2", 已经没用,解决办法是写成audio:true, 但要将配音文件放在游戏主目录audio-card-male/female里各一个,很麻烦,有没有更好的办法？有！


那就是重新定义一个播放函数


扩展阵亡配音写法(可一起打包):
lib.skill._zhengwangpeiyin={
trigger:{global:'dieBegin',},
//direct:true,
priority:2,
forced:true,
unique:true,
frequent:true,
/*filter:function (event,player){
return !event.player.isAlive();
},*/
content:function(){
//方法一: 
game.playAudio('..','extension','扩展包名',trigger.player.name);
//另一种陈列写法: 
/* if(trigger.player.name=='xwj_xhuoying_itachi'){

game.playXu('itachi'); 

}*/ 

},
}

注:将这段代码复制到主代码区里,建议将zhengwangpeiyin重新改另一个名,前面的_不能删,扩展包名必须改成你的扩展名,阵亡配音文件改成与你的武将id一致。


关于6、7、8楼提到的重定义写法:
那就是在主函数区重新定义一个播放函数game.playxxx ,比如:
game.playXu = function(fn, dir, sex) {
if (lib.config.background_speak) {
if (dir && sex)
game.playAudio(dir, sex, fn);
else if (dir)
game.playAudio(dir, fn);
else
game.playAudio('..', 'extension', '扩展包名', fn);
}
};
然后在代码里的content:function 或precontent:function里写
game.playXu(['xxx1','xxx2'].randomGet());即可
。注:群英会扩展用了game.playXu函数,为避免重复,可另改一个名game.playAs、game.playCXK……都行

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


无名杀技能编写教程





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
		player:['damageBefore', 'recoverAfter'], //例子,玩家受到伤害前或玩家恢复体力后
	},



	priority: 1,//同时机技能发动的优先度
	check:function(event,player){//告诉ai是否发动这个技能,返回true则发动此技能
		//无例子,因为不同时机evevt参数内的元素不同
		//要了解evevt参数内的元素,具体看game.js内lib.element.event内的函数	
	},


	frequent:true,//此技能是否可以被设置为自动发动(不询问)
	forced:true,//此技能是否能固定触发,true为固定触发(锁定技)
	nopop:true,//player是否logSkill('此技能'),true为不
	direct:true,//相当于上面两行相加
	filter:function(event,player){//触发条件,返回true则发动此技能
		//无例子,因为不同时机evevt参数内的元素不同
		//要了解evevt参数内的元素,具体看game.js内lib.element.event内的函数
	},



	content:function(){//触发内容,分步执行会在后面讲到
	               //参数trigger相当于filter:function(event,player){}内的event
		player.recover()//例子,玩家回复一点体力
	},



2.主动:
	基本框架:
	enable:"phaseUse",//出牌阶段使用
	usable:1,//每回合限制使用次数	
	       //限制使用次数为变量时需写在filter:function(event,player){}内
	filter:function(event,player){ //发动条件,返回true则可以发动此技能
	    /*限制使用次数为变量时:
		 if(player.getStat().skill['技能名']>=变量) return false;(变量可以写player.hp等)
		 return true;
		*/
		return player.hp<2;//例子,玩家体力小于2时可以发动
	},



	filterCard:function(card){//选择的牌需要满足的条件
		return get.color(card)=='red';//例子,只能选择红色牌
	},



	position:'hej',//可以选择什么位置的牌
	           //写入其中的字符:'h':手牌区, 'e':装备区, 'j':判定区
	selectCard:2,//需要选择多少张牌才能发动
	           //为-1时,选择所有牌
	           //为数组时,这个数组就是选择牌数的区间
	           /*为变量时(具体情况具体分析):
	             function(card){//例子,变量为玩家体力时
	                  var pl=get.owner(card);//pl定义为选择牌中的牌的拥有者,即"你"
	                  return [pl.hp,Infinity];//返回可选手牌数为你的体力值到无限
	             },
	           */
	check:function(card){//ai应该如何选牌,返回值为正则此牌可选,反之,此牌不可选
		/*在check中定义玩家(你):
		 var player=get.owner(card);
		*/
		return 6-get.value(card);//例子,ai可选价值大于6的卡牌
	},
	discard:false,//是否弃牌,若没有这一行,选择牌发动技能后,被选择的牌都要弃置
	prepare:'give',//不弃牌,准备用这些牌来干什么
	filterTarget:function(card,player,target){//选择的目标需要满足的条件
		return target!=player;//例子,目标不是玩家
	},
	selectTarget:1, //需要选择多少个目标才能发动
	             //为-1时,选择全部人
	             //为数组时,这个数组就是选择目标数的区间
	multitarget:true,//是否每个目标都结算一次,true为否
	targetprompt:[],//选择的目标武将牌上出现什么字,数组第几元素对应第几个目标
	content:function (){//触发内容,分步执行会在后面讲到
	               //当有filterCard时,有参数cards
	               //当有filterTarget时,有参数target和targets
		player.recover()//例子,玩家回复一点体力
	},




3.视为:
(1)转化为一张卡牌:
	基本框架:
	name:'技能',//技能按钮名字,不写则默认为此技能的翻译
	enable:['phaseUse','chooseToRespond'],//发动视为技的时机,现在为出牌阶段和响应时
	viewAsFilter:function(player){//视为技按钮出现条件(即发动条件)
		return player.maxHp==4;//例子,玩家最大体力值为4时可以发动
	},
	filterCard:{type:'basic'},//选择的牌需要满足什么条件
	/*上面那种是简便写法,多次判断的话还是要写回旧格式:
	 filterCard:function(card){
		 return get.color(card)=='black';//例子,只能选择黑色牌
	 },
	*/
	position:'hej',//可以选择什么位置的牌,和主动的position相同,不解释
	selectCard:2, //需要选择多少张牌才能发动,和主动的selectCard相同,不解释
	check:function(card){// ai应该如何选牌,和主动的check相同,不解释
		return 1;//例子,ai可以所有所有手牌
	},
	viewAs:{name:'tao'},//目标卡牌
	prompt:'将一张基本牌当桃使用或打出',//选择时弹出的提示
	onuse:function(result,player){//使用视为牌时触发内容,result.cards是视为前的牌
		player.recover();//例子,使用视为牌时玩家回复一点体力
	},



(2)转化为多张卡牌:
	基本框架:
	enable:'phaseUse', //发动视为技的时机,现在为出牌阶段
	usable:1, //每回合限制使用次数,和主动的usable相同,不解释
	filter:function(event,player){ //发动条件,和主动的filter相同,不解释
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
  				selectCard:0, //弃牌数为零
				viewAs:{name:links[0][2]},//视为你使用你选择的牌
    		};
		},
		prompt:function(links,player){ //选择时弹出的提示
			return '请选择'+get.translation(links[0][2])+'的目标';
			//例子,弹出提示:选择你选择的牌的目标
		},
	},






4.AI:
 (注:可接视为框架、主动框架或触发框架)
 (注2:这部分我不是很熟悉,所以只能简单地说一下)
	基本框架:
	ai:{ 
		save:true, //此技能可以用于自救
		respondTao:true, //此技能可以用于救人,一般用于视为技
		respondShan:true,//此技能可以响应杀,一般用于视为技
		respondSha:true, //此技能可以响应闪,一般用于视为技
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
				if(player. countCards('h')<2) return 1;//例子,玩家手牌数小于2时,发动				},
		},
		effect:{//影响ai出牌(例如什么时候不出杀)等
			  //没有深入研究,不讲
		},
		skillTagFilter:function(player){//视为技专属,ai什么时候可以发动视为技
			player.countCards('h',{type:'basic'})>0;//例子,手牌中有基本牌时,ai发动技能
		},
	},





5.标记:
(注:可接视为框架、主动框架或触发框架)
	基本框架:
	marktext:"状",//标记显示文本,一般为一个字
	locked:true,//是否实时更新
	intro:{
		content:'cards',// 标记显示内容,为cards时显示标记内的牌
		/*标记显示内容为文本写法:
		content:function (storage,player,skill){//返回值(文本)即为标记显示内容
			return '当前有'+storage+'个标记'//标记显示内容为当前有多少个标记
		},*/
	},
	mark:true,//获得技能时是否显示此标记,若为false,可以用markSkill()来显示此标记




6.获得技能和失去技能时:
(注:可接视为框架、主动框架或触发框架)
	基本框架:
	init:function (player){//获得技能时发动
		player.gainMaxHp();//例子,获得此技能时,玩家增加一点最大体力
	},
	onremove:function(player){//失去技能时发动
		player.loseMaxHp();//例子,失去此技能时,玩家失去一点最大体力
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
		},// to:玩家;from:目标;distance:防御距离
    	maxHandcard:function (player,num){
           return num+1; //例子,手牌上限+1
    	},// player:玩家;num:手牌上限
		targetEnabled:function(card,player,target){
			if(player.sex=='male') return false; //例子,你不能成为男性角色的牌的目标
		},// card:牌;player:使用牌的角色;target:玩家
		selectTarget:function (card,player,range){
			if(card.name=='sha') range[1]+=1; //例子,你的杀可以额外选择一名角色
		},// card:牌;player:玩家;range[1]:目标个数; range:不清楚
		targetInRange:function(card,player, target){
			if(card.name=='sha') return true;//例子,你使用的杀可以指定所有角色
		},// card:牌;player:玩家;target:目标
		cardDiscardable:function(card,player){
			if(card.name=='sha') return false; //例子,你无法弃置杀
		},// card:牌;player:玩家
		cardEnabled:function(card,player){//要与cardUsable一起使用
			if(get.suit(card)=='heart') return false;//例子:你无法使用红桃牌
		},// card:牌;player:玩家
		cardUsable:function(card,player){ //要与cardEnabled一起使用
			if(get.suit(card)=='heart') return false; //例子:你无法使用红桃牌
		},// card:牌;player:玩家
		cardRespondable:function(card,player){
			if(get.suit(card)=='heart') return false; //例子:你无法使用红桃牌来响应
		},// card:牌;player:玩家
		cardSavable:function(card,player){
			if(get.suit(card)=='heart') return false; //例子:你无法使用红桃牌来救人
		},// card:牌;player:玩家
		/*后4种卡牌禁言类mod技与视为技冲突的解决方法:
		 判定内加入_status.event.skill!='冲突视为技'
		 意思为你无法使用牌,除非使用这个视为技视为无法使用的牌
		*/
	},



9.配音的添加:
(注:可接视为框架、主动框架或触发框架)
	基本框架:
	//数字为配音数量,从1开始
	//配音命名方法:技能名+这是第几个配音
	audio:2,//使用无名杀目录\audio\skill内的配音
	audio:"ext:扩展名:1",//使用无名杀录目\extension \扩展名内的配音


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
		event.target=result.targets[0]; //将选择的角色储存到event.target中
		player.chooseCard('请选择给予牌',2,'h').set('ai',function(card){
			return 1;//告诉ai可以选择所有手牌
		});//选择两张手牌
	}else{//否则
		event.finish();//步骤将于这里终止
	};
	"step 2"//步骤2
	if(result.bool){ //如果有选择手牌
		player.$give(result.cards.length,event.target);
		event.target.gain(result.cards,player);//被选择的角色获得这两张牌
	};


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


　AI教程

　　『1』名词解释:

　　1.1 基本名词

　　order:『优先级』,用来设定技能发动的优先程度,此程度以卡牌使用的优先级为参考。

　　为了实现合理的牌序(例如先拆后顺再杀),须将每种卡牌设定一个优先级,优先级越大的

　　卡牌ai会优先使用,技能也是如此,例如枪舞,新苦肉等技能的优先级须高一些,因为等你杀

　　了一刀再判"枪舞"或者酒红杀都用了再"苦肉"是没什么意义的。合理的优先级如下图:

　　例如拆的优先级为9,顺为7,杀为4:

　　-10(枪舞)--9(拆)--8(苦肉)--7(顺)--6--5--4(杀)--;

　　expose:『身份暴露程度』,取值范围为0~1,用于帮助AI判断身份,AI中未写expose其他AI将会无法判断其身份;

　　threaten:『嘲讽值』,嘲讽值越大的角色越容易遭受到敌方的攻击,默认为1,一般在0~4中取值即可(缔盟threaten值为3);

　　respondShan:true,『响应闪』,作用是告诉AI手里没『闪』也可能出『闪』,防止没『闪』直接掉血;

　　respondSha:true,与respondShan类似;

　　save:true,告诉AI可能救人,防止没桃xxx;

　　maixie:true,技能标签『卖血』,用于其他AI检测是否是卖血流(if(target.hasSkillTag('maixie')))。并非加了这个AI就会卖血;

　　noh:true,技能标签『无牌』,目前只出现在"连营"和"伤逝"中,用于其它AI检测是否含有标签『无牌』,从而告诉其他AI不要拆迁(因为生生不息)。

　　1.2 AI获取(玩家):

　　ai.get.attitude(玩家1,玩家2):『态度值检测』检测玩家1对玩家2的态度值;

　　ai.get.effect(target,content,player,viewer):『效果检测』检测卡牌/技能对目标角色的效果值,content代表卡牌或者技能,例如

　　{name:'sha'}/'挑衅';viewer代表视角,一般填player或者target,例如我方杀敌方满血『曹丕』,对我方来说是负效果,但对敌方是正效果,

　　视角决定效果的正负。

　　ai.get.damageEffect(玩家1,玩家2,viewer,nature):『检测伤害效果』这里检测的是[玩家2对玩家1]的伤害效果,nature代表属性(雷/火);

　　ai.get.recoverEffect(玩家1,玩家2,viewer):『检测回复效果』 与上段类似;

　　1.3 AI获取(卡牌):

　　useful:回合外留牌的价值(弃牌阶段按useful顺序选)

　　value:牌的使用价值(五谷按value顺序选)

　　举例:ai.get.useful(card)/ai.get.value(card)

　　『2』AI的分类与写法:

　　2.1 AI的合理位置

　　1.AI须选择角色/卡牌/按钮等等时

　　2.check中检测条件时的收益时

　　3.主动技的结尾,用来检测是否发动和对谁发动

　　4.需要声明有某技能时某牌的使用效果发生改变时(大部分是卖血技)

　　2.2 不同位置的AI写法

　　2.2.1 选择(choose类):

　　target.chooseToDiscard().ai=function(card){

　　return 8-ai.get.value(card);

　　}

　　return 8-ai.get.value(card)这句是告诉AI如果手里有价值小于8的牌就弃置,否则不弃置

　　弃置的规则是价值越小的牌优先丢,一个return 5和return 3 AI会选return 5的卡牌。

　　当return值不大于0时,例如最后一张手牌价值为9 (return 8-9)=-1,AI将会放弃。

　　target.chooseTarget().ai=function(target){

　　return ai.get.attitude(player,target);

　　}

　　同理,att值越大的会优先选。注意att值只与身份有关,一个鲁肃一个于禁队友,并不一定会选鲁肃。

　　player,chooseControl('摸牌','回血').ai=function(event,player){

　　if(player.hp>=2) return '摸牌';

　　return '回血';

　　}

　　2.2.2 检测(check类):

　　举例:『魅步』

　　check:function(event,player){

　　if(ai.get.attitude(player,event.player)>=0) return false;

　　//对当前角色态度大于等于0,不发动;

　　var e2=player.get('e','2');

　　//定义一个变量e2代表获取玩家的装备区的防具;

　　if(e2){

　　if(e2.name=='tengjia') return true;

　　if(e2.name=='bagua') return true;

　　//有藤甲和八卦就发动。。。老大这是瞧不起仁王吗。。。。

　　}

　　return player.num('h','shan')>0;

　　//如果上述条件均不满足,如果玩家手里有『闪』 发动,否则不发动;

　　},

　　发动技能规则:check最终的return值大于0;

　　举例:『峻刑』(这是个主动技,不过也需要check决定是否发动)

　　check:function(card){

　　if(ui.selected.cards.length) return -1;

　　//告诉AI只选一张牌;

　　if(get.type(card)=='basic') return 8-ai.get.value(card);

　　//只有价值小于8的基本牌可被选;

　　return 5-ai.get.value(card);

　　//如果手中有价值小于5的牌就发动,否则不发动;

　　},

　　2.2.3 主动技结尾

　　一般格式为:

　　ai:{

　　order:xx,

　　threaten:xx,

　　//上述为定义/标签

　　result:{

　　player:xx;

　　target:xx;

　　}

　　//收益值

　　}

　　2.2.4 卖血技能

　　一般格式为:

　　ai:{

　　maixie:true,

　　threaten:xx,

　　//上述为定义/标签

　　effect:{

　　xx;

　　}

　　//效果值的重新定义

　　}

　　更多内容详见第三章『收益论』;

　　『3』收益论

　　3.1 收益论用途

　　1.告诉AI会发动技能,

　　2.告诉AI会卖血,

　　3.告诉AI倾向于卡牌/行为,

　　3.2 收益论名词:

　　result:『收益』收益值未在AI声明默认为0(对玩家对目标均是如此).收益值可以直接在AI声明;

　　result在player部分里声明就是对玩家的收益,在target部分里声明就是对目标的收益;

　　effect:『效果』效果值为正代表正效果,反之为负效果,AI会倾向于最大效果的目标/卡牌;

　　attitude:『态度』态度只由identity决定。不同身份对不同身份的att不同。例如在身份局中,主对忠att值为6,

　　忠对主att值为10;

　　3.3 收益论应用:

　　3.3.1 【主动技】:

　　?如果技能发动无须指定目标: effect=result*ai.get.attitude(player,player);

　　即: 总效果=收益值*使用者对自己的att;

　　举例『制衡』:

　　ai:{

　　result:{

　　player:1

　　}}

　　*由于制衡基本是每回合都会发动,所以AI中将『收益值』直接定为1,假设孙权对自己的att为10,这将代表:

　　总效果=(1)收益值*(10)=10;由于效果值为正(正收益) 所以AI将会发动『制衡』

　　举例『急袭』:

　　ai:{

　　order:10,

　　result:{

　　player:function(player){

　　return player.storage.tuntian.length-1;

　　}}}

　　*这个很容易看出来,只有一个田就不发动了...只要田大于1,对使用者就是正收益,再乘以对自己的att,也是正效果,所以AI将会发动『急袭』

　　?如果技能发动须指定目标

　　总效果=对使用者的收益值*使用者对自己的att+对目标的收益值*使用者对目标的att;

　　实际还会考虑嘲讽值,这里简化了;

　　举例『挑衅』:

　　ai:{

　　order:4,

　　expose:0.2,

　　threaten:1.1,

　　result:{

　　target:-1,

　　//直接定义目标的收益值为-1,

　　player:function(player,target){

　　if(target.num('h')==0) return 0;

　　if(target.num('h')==1) return -0.1;

　　if(player.hp<=2) return -2;

　　if(player.num('h','shan')==0) return -1;

　　return -0.5;

　　//上述表示目标角色不同的情况,玩家将会return不同的收益值;

　　}}}

　　『挑衅』是一个作死技,技能发动对自己没有正收益,只会给目标角色带来负收益。所以

　　player部分中收益值最大也不会超过0,因为是弃置对方一张牌,所以直接将目标角色的收益

　　定为了-1;如果对自己的负收益大于对敌方的负收益的话,姜维将不会发动『挑衅』

　　举例『排异』:

　　ai:{

　　order:1,

　　result:{

　　target:function(player,target){

　　if(player!=target) return 0;

　　if(player.num('h')+2<=player.hp+player.storage.quanji.length) return 1;

　　return 0;

　　}}}

　　『排异』为什么没有声明player部分呢,因为除非你排异自己,否则你自己是没收益的,只是对你选择的目标

　　有收益(摸2牌)。

　　3.3.2 【卖血技】

　　总效果=对使用者的收益值*使用者对自己的att+对目标的收益值*使用者对目标的att;

　　实际还会考虑嘲讽值,这里简化了;

　　ai.effect:告诉ai有某技能时某牌的使用效果发生改变,

　　设对目标的原收益为n,对使用者的原收益为n',n>0代表正收益,n<0代表负收益;

　　函数传入4个参数,分别为卡牌、使用者、目标以及n;

　　返回值可有3种形式

　　1. 一个数a,对目标总的收益为a*n;

　　2. 一个长度为2的数组[a,b],对目标的总收益为a*n+b;

　　3. 一个长度为4的数组[a,b,c,d],对目标的总收益为a*n+b,对使用者的总收益为c*n'+d;

　　假设n代表火杀对目标的效果

　　1. 技能为防止火焰伤害:return 0;

　　2. 技能为防止火焰伤害并令目标摸一张牌:return [0,1];

　　3. 技能为防止火焰伤害并令使用者弃置一张牌:return [0,0,1,-1];

　　举例『遗计』:

　　ai:{

　　maixie:true,

　　effect:{

　　target:function(card,player,target){

　　if(get.tag(card,'damage')){

　　if(player.skills.contains('jueqing')) return [1,-2];

　　if(!target.hasFriend()) return;

　　//如果没有存活队友,也就是说你方阵营就你一个活着的了,直接跳出effect,避免单挑永远不杀你;

　　if(target.hp>=4) return [1,get.tag(card,'damage')*2];

　　if(target.hp==3) return [1,get.tag(card,'damage')*1.5];

　　if(target.hp==2) return [1,get.tag(card,'damage')*0.5];

　　//以『杀』为例,杀对目标角色为-1.5收益,计算效果得:

　　4血及以上:-1.5*1+2=0.5 正收益;

　　3血:-1.5*1+1.5=0 无收益;

　　2血:-1.5*1+0.5=-1 负收益;

　　}}}}

　　这个get.tag是什么意思呢？其实和技能标签一样,卡牌也有自己的标签,例如

　　杀:{

　　tag:{

　　respond:1,

　　respondShan:1,

　　damage:function(card){

　　if(card.nature=='poison') return;

　　return 1;

　　}}}

　　为了方便删了一些tag,那么『杀』有如下tag:respond;respondShan;damage等等,所以get.tag(card,'damage')

　　代表有伤害属性的卡牌,例如杀,南蛮,决斗等等。

　　*特别注意ai里面的effect是上帝视角,target不代表目标角色,player也不代表拥有此技能的玩家本身,

　　因为effect是写给别的AI看的,所以target代表玩家本身,player代表其他人,可以是正在犹豫是否要杀

　　你的任何一位玩家。

　　那么队友会杀卖血流队友还是杀敌方呢？还是套公式:

　　总效果=对使用者的收益值*使用者对自己的att+对目标的收益值*使用者对目标的att;

　　因为『杀』对使用者是没收益的,所以公式变为:

　　总效果=对目标的总收益值*使用者对目标的att;

　　比如杀对目标角色的收益是-1.5,满血曹丕的effect是return [0.5,1],那最终的收益是0.25,如果对曹丕的attitude是1,对某白板敌人的attitude是-1,那杀曹丕的效果为1*0.25,

　　杀敌人的效果为-1*-1.5,所以最终会选敌人(实际稍复杂点,详见ai.get.effect函数)

　　3.3.2 【倾向技】

　　这个占比例非常少,略说明一下

　　举例『忘隙』:

　　ai:{

　　effect:{

　　player:function(card,player){

　　if(card.name=='nanman'||card.name=='wanjian') return [1,3];

　　}}}

　　这里的意思是尽量放南蛮万剑之类,类似的,激昂也是强调AI尽量用红杀;

　　因为上述AI中effect里面的为player,所以代表的是对使用者的收益。



---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

无名杀联机扩展编写教程
前言:
用这个方法相当于源码添加武将包(卡包),跳过了一些禁止联机的判断,从而达到扩展联机效果。
框架:
game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"扩展名",content:function (config,pack){
	if(config.武将包名英文){
		for(var i in lib.characterPack['武将包名英文']) {
			if(lib.character[i][4].indexOf("forbidai")<0) lib.character[i][4].push("forbidai");
		};
	};//选项触发内容,原因见config
},precontent:function(武将包名英文){
	if(武将包名英文.enable){
		//武将包
		game.import('character',function(){
			var 武将包名英文={
				name:'武将包名英文',//武将包命名(必填)
				connect:true,//该武将包是否可以联机(必填)
				character:{ 
					//武将格式:
					//"武将名字":["性别","势力",体力,[技能],[]],
					//格式内每一样东西都不能缺少,否则无法导入该武将包及其以下内容
				},//武将(必填)
				characterIntro:{}, //武将介绍(选填)
				characterTitle:{},//武将标题(用于写称号或注释)(选填)
				skill:{},//技能(必填)
				translate:{},//翻译(必填)
				perfectPair:{},//珠联璧合武将(选填)
			};
			if(lib.device||lib.node){
				for(var i in 武将包名英文.character){武将包名英文.character[i][4].push('ext:扩展名/'+i+'.jpg');}
			}else{
				for(var i in 武将包名英文.character){武将包名英文.character[i][4].push('db:extension-扩展名:'+i+'.jpg');}
			}//由于以此法加入的武将包武将图片是用源文件的,所以要用此法改变路径
			return 武将包名英文;
		});
		lib.config.all.characters.push('武将包名英文');
		if(!lib.config.characters.contains('武将包名英文')) lib.config.characters.push('武将包名英文');
		lib.translate['武将包名英文_character_config']='武将包名';// 包名翻译
		//卡包(手牌)
		game.import('card',function(){
			var 卡包名英文={
			name:'卡包名英文',//卡包命名
			connect:true,//卡包是否可以联机
			card:{
				'卡名':{
					image:'ext:扩展名/卡名.jpg',	//卡牌图片
					//以下与一般卡牌一样
				},//卡 格式
				skill:{},//技能
				translate:{},//翻译
				list:[],//牌堆添加
			};
			return 卡包名英文;
		});
		lib.translate['卡包名英文_card_config']='卡包名';
		lib.config.all.cards.push('卡包名英文');
		if(!lib.config.cards.contains('卡包名英文')) lib.config.cards.push('卡包名英文');//包名翻译
	};
},config:{
	"武将包名英文":{"name":"将武将包名内武将设为禁用","init":false},
	//由于以此法添加的武将包自带的禁用按钮无法使用,需要写这个选项来禁用该武将包武将(单机)
},help:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:"",
    author:"Aurora",
    diskURL:"",
    forumURL:"",
    version:"",
},files:{"character":[],"card":[],"skill":[]}}})
注意事项:
1.有些函数触发时,主机不会发送触发内容给客机,这是就要用game.broadcastAll(function(){})或game.broadcast (function(){})。(具体用法看源码,不举例)
2.如果是储存类的联机扩展(不如联机皮肤什么的)解决方法:
(1)数据位于服务器,直接读取。
(2)数据位于本地,在主机将信息发送给客机时改动。(我找不到端口,不具体说明)
3.联机时,客机扩展要和主机一致,否则客机发生错误。
4.同一个扩展可以以此法添加多个武将包或卡包。

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


第一卷 第一章 js语法规则和css
　　js是一种网页编程语言,本章是我在网上查阅大量相关资料后,自己整理改写的,加上了一些自己的理解和心得,让js更容易被学习。
　　1:变量(自由改变的数字)
　　"        "或者'       '将数字括起来
　　2:运算符
　　输出  return
　　真(成立/正确)true
　　假(不成立/错误)false
　　加+
　　减-
　　乘*
　　除/
　　取模%
　　数值加1         ++
　　数值减1          --
　　小于<
　　等于=
　　大于>
　　大于等于>=
　　与&
　　与之后赋值&=
　　或之后赋值|=
　　小于等于<=
　　等于等于==
　　不等于!=
　　绝对值abs()
　　四舍五入round()
　　空值null
　　//这个符号是解释用的,无实际意义,符号后不翻译,但仅隐藏一行文字或数据
　　2.1常量:
　　无穷大,最大
　　lnfinity
　　负无穷
　　-lnfinity
　　不能和自己比较的唯一值
　　NaN:    not a number
　　2.2number的特殊常量
　　number.MAX_VALUE最大值
　　number.MIN_VALUE最小值
　　number.NaN空值
　　2.3:语句(共5种,目前介绍一种)
　　if:加上判断条件,如果成立(成立用true表示)则执行
　　else:不成立(用false表示)则执行
　　例:
　　if(1==1&&6>3)
　　{
　　alert(return true);
　　}
　　else
　　{
　　alert(return false);
　　}
　　执行语句:Function{
　　}
　　2.35算数式
　　var pingguo=6;
　　var lizi=3;
　　var huaqian=pingguo+li;
　　document.write("花费:"=huaqian)
　　//苹果6元,李子3元,花钱=苹果和李子加起来,输出花钱=
　　2.4赋值语句:
　　var a=10;
　　//赋值让a=10
　　var x=1/0;
　　//x==lnfinity
　　var y=-1/0;
　　//y==-lnfinity
　　var x=0/0;
　　//x==NaN
　　var m=0+"1";
　　//m==1
　　var n=0+"string";
　　//n==NaN
　　注:首字母大写,区分大小写,不大写和大写分别表示二个意义
　　工具电脑版:firebox和firebug
　　编辑器:
　　Aptana
　　记事本
　　WebStrom
　　DreamWeaver
　　……
　　第二章
　　简易css
　　外部样式:<link href="layout.css" rel="stylesheet" type="text/css" />
　　内部样式:<style>
　　h2 { color:#f00;} </style>
　　属性名:内容(content)、填充(padding)、边框(border)、边界(margin), CSS盒子模式都具备这些属性。
　　本章暂时写到这里,更复杂的在以后会添加,此章节是为了高难度技能打基础,不会的可以先看武将技能那些然后结合本章理解,我会让教程更加完善。

番外篇 AI教程
　　AI教程
　　『1』名词解释:
　　1.1 基本名词
　　order:『优先级』,用来设定技能发动的优先程度,此程度以卡牌使用的优先级为参考。
　　为了实现合理的牌序(例如先拆后顺再杀),须将每种卡牌设定一个优先级,优先级越大的
　　卡牌ai会优先使用,技能也是如此,例如枪舞,新苦肉等技能的优先级须高一些,因为等你杀
　　了一刀再判"枪舞"或者酒红杀都用了再"苦肉"是没什么意义的。合理的优先级如下图:
　　例如拆的优先级为9,顺为7,杀为4:
　　-10(枪舞)--9(拆)--8(苦肉)--7(顺)--6--5--4(杀)--;
　　expose:『身份暴露程度』,取值范围为0~1,用于帮助AI判断身份,AI中未写expose其他AI将会无法判断其身份;
　　threaten:『嘲讽值』,嘲讽值越大的角色越容易遭受到敌方的攻击,默认为1,一般在0~4中取值即可(缔盟threaten值为3);
　　respondShan:true,『响应闪』,作用是告诉AI手里没『闪』也可能出『闪』,防止没『闪』直接掉血;
　　respondSha:true,与respondShan类似;
　　save:true,告诉AI可能救人,防止没桃xxx;
　　maixie:true,技能标签『卖血』,用于其他AI检测是否是卖血流(if(target.hasSkillTag('maixie')))。并非加了这个AI就会卖血;
　　noh:true,技能标签『无牌』,目前只出现在"连营"和"伤逝"中,用于其它AI检测是否含有标签『无牌』,从而告诉其他AI不要拆迁(因为生生不息)。
　　1.2 AI获取(玩家):
　　ai.get.attitude(玩家1,玩家2):『态度值检测』检测玩家1对玩家2的态度值;
　　ai.get.effect(target,content,player,viewer):『效果检测』检测卡牌/技能对目标角色的效果值,content代表卡牌或者技能,例如
　　{name:'sha'}/'挑衅';viewer代表视角,一般填player或者target,例如我方杀敌方满血『曹丕』,对我方来说是负效果,但对敌方是正效果,
　　视角决定效果的正负。
　　ai.get.damageEffect(玩家1,玩家2,viewer,nature):『检测伤害效果』这里检测的是[玩家2对玩家1]的伤害效果,nature代表属性(雷/火);
　　ai.get.recoverEffect(玩家1,玩家2,viewer):『检测回复效果』 与上段类似;
　　1.3 AI获取(卡牌):
　　useful:回合外留牌的价值(弃牌阶段按useful顺序选)
　　value:牌的使用价值(五谷按value顺序选)
　　举例:ai.get.useful(card)/ai.get.value(card)
　　『2』AI的分类与写法:
　　2.1 AI的合理位置
　　1.AI须选择角色/卡牌/按钮等等时
　　2.check中检测条件时的收益时
　　3.主动技的结尾,用来检测是否发动和对谁发动
　　4.需要声明有某技能时某牌的使用效果发生改变时(大部分是卖血技)
　　2.2 不同位置的AI写法
　　2.2.1 选择(choose类):
　　target.chooseToDiscard().ai=function(card){
　　return 8-ai.get.value(card);
　　}
　　return 8-ai.get.value(card)这句是告诉AI如果手里有价值小于8的牌就弃置,否则不弃置
　　弃置的规则是价值越小的牌优先丢,一个return 5和return 3 AI会选return 5的卡牌。
　　当return值不大于0时,例如最后一张手牌价值为9 (return 8-9)=-1,AI将会放弃。
　　target.chooseTarget().ai=function(target){
　　return ai.get.attitude(player,target);
　　}
　　同理,att值越大的会优先选。注意att值只与身份有关,一个鲁肃一个于禁队友,并不一定会选鲁肃。
　　player,chooseControl('摸牌','回血').ai=function(event,player){
　　if(player.hp>=2) return '摸牌';
　　return '回血';
　　}
　　2.2.2 检测(check类):
　　举例:『魅步』
　　check:function(event,player){
　　if(ai.get.attitude(player,event.player)>=0) return false;
　　//对当前角色态度大于等于0,不发动;
　　var e2=player.get('e','2');
　　//定义一个变量e2代表获取玩家的装备区的防具;
　　if(e2){
　　if(e2.name=='tengjia') return true;
　　if(e2.name=='bagua') return	true;
　　//有藤甲和八卦就发动。。。老大这是瞧不起仁王吗。。。。
　　}
　　return player.num('h','shan')>0;
　　//如果上述条件均不满足,如果玩家手里有『闪』 发动,否则不发动;
　　},
　　发动技能规则:check最终的return值大于0;
　　举例:『峻刑』(这是个主动技,不过也需要check决定是否发动)
　　check:function(card){
　　if(ui.selected.cards.length) return -1;
　　//告诉AI只选一张牌;
　　if(get.type(card)=='basic') return 8-ai.get.value(card);
　　//只有价值小于8的基本牌可被选;
　　return 5-ai.get.value(card);
　　//如果手中有价值小于5的牌就发动,否则不发动;
　　},
　　2.2.3 主动技结尾
　　一般格式为:
　　ai:{
　　order:xx,
　　threaten:xx,
　　//上述为定义/标签
　　result:{
　　player:xx;
　　target:xx;
　　}
　　//收益值
　　}
　　2.2.4 卖血技能
　　一般格式为:
　　ai:{
　　maixie:true,
　　threaten:xx,
　　//上述为定义/标签
　　effect:{
　　xx;
　　}
　　//效果值的重新定义
　　}
　　更多内容详见第三章『收益论』;
　　『3』收益论
　　3.1 收益论用途
　　1.告诉AI会发动技能,
　　2.告诉AI会卖血,
　　3.告诉AI倾向于卡牌/行为,
　　3.2 收益论名词:
　　result:『收益』收益值未在AI声明默认为0(对玩家对目标均是如此).收益值可以直接在AI声明;
　　result在player部分里声明就是对玩家的收益,在target部分里声明就是对目标的收益;
　　effect:『效果』效果值为正代表正效果,反之为负效果,AI会倾向于最大效果的目标/卡牌;
　　attitude:『态度』态度只由identity决定。不同身份对不同身份的att不同。例如在身份局中,主对忠att值为6,
　　忠对主att值为10;
　　3.3 收益论应用:
　　3.3.1 【主动技】:
　　?如果技能发动无须指定目标: effect=result*ai.get.attitude(player,player);
　　即: 总效果=收益值*使用者对自己的att;
　　举例『制衡』:
　　ai:{
　　result:{
　　player:1
　　}}
　　*由于制衡基本是每回合都会发动,所以AI中将『收益值』直接定为1,假设孙权对自己的att为10,这将代表:
　　总效果=(1)收益值*(10)=10;由于效果值为正(正收益) 所以AI将会发动『制衡』
　　举例『急袭』:
　　ai:{
　　order:10,
　　result:{
　　player:function(player){
　　return player.storage.tuntian.length-1;
　　}}}
　　*这个很容易看出来,只有一个田就不发动了...只要田大于1,对使用者就是正收益,再乘以对自己的att,也是正效果,所以AI将会发动『急袭』
　　?如果技能发动须指定目标
　　总效果=对使用者的收益值*使用者对自己的att+对目标的收益值*使用者对目标的att;
　　实际还会考虑嘲讽值,这里简化了;
　　举例『挑衅』:
　　ai:{
　　order:4,
　　expose:0.2,
　　threaten:1.1,
　　result:{
　　target:-1,
　　//直接定义目标的收益值为-1,
　　player:function(player,target){
　　if(target.num('h')==0) return 0;
　　if(target.num('h')==1) return -0.1;
　　if(player.hp<=2) return -2;
　　if(player.num('h','shan')==0) return -1;
　　return -0.5;
　　//上述表示目标角色不同的情况,玩家将会return不同的收益值;
　　}}}
　　『挑衅』是一个作死技,技能发动对自己没有正收益,只会给目标角色带来负收益。所以
　　player部分中收益值最大也不会超过0,因为是弃置对方一张牌,所以直接将目标角色的收益
　　定为了-1;如果对自己的负收益大于对敌方的负收益的话,姜维将不会发动『挑衅』
　　举例『排异』:
　　ai:{
　　order:1,
　　result:{
　　target:function(player,target){
　　if(player!=target) return 0;
　　if(player.num('h')+2<=player.hp+player.storage.quanji.length) return 1;
　　return 0;
　　}}}
　　『排异』为什么没有声明player部分呢,因为除非你排异自己,否则你自己是没收益的,只是对你选择的目标
　　有收益(摸2牌)。
　　3.3.2 【卖血技】
　　总效果=对使用者的收益值*使用者对自己的att+对目标的收益值*使用者对目标的att;
　　实际还会考虑嘲讽值,这里简化了;
　　ai.effect:告诉ai有某技能时某牌的使用效果发生改变,
　　设对目标的原收益为n,对使用者的原收益为n',n>0代表正收益,n<0代表负收益;
　　函数传入4个参数,分别为卡牌、使用者、目标以及n;
　　返回值可有3种形式
　　1. 一个数a,对目标总的收益为a*n;
　　2. 一个长度为2的数组[a,b],对目标的总收益为a*n+b;
　　3. 一个长度为4的数组[a,b,c,d],对目标的总收益为a*n+b,对使用者的总收益为c*n'+d;
　　假设n代表火杀对目标的效果
　　1. 技能为防止火焰伤害:return 0;
　　2. 技能为防止火焰伤害并令目标摸一张牌:return [0,1];
　　3. 技能为防止火焰伤害并令使用者弃置一张牌:return [0,0,1,-1];
　　举例『遗计』:
　　ai:{
　　maixie:true,
　　effect:{
　　target:function(card,player,target){
　　if(get.tag(card,'damage')){
　　if(player.skills.contains('jueqing')) return [1,-2];
　　if(!target.hasFriend()) return;
　　//如果没有存活队友,也就是说你方阵营就你一个活着的了,直接跳出effect,避免单挑永远不杀你;
　　if(target.hp>=4) return [1,get.tag(card,'damage')*2];
　　if(target.hp==3) return [1,get.tag(card,'damage')*1.5];
　　if(target.hp==2) return [1,get.tag(card,'damage')*0.5];
　　//以『杀』为例,杀对目标角色为-1.5收益,计算效果得:
　　4血及以上:-1.5*1+2=0.5 正收益;
　　3血:-1.5*1+1.5=0 无收益;
　　2血:-1.5*1+0.5=-1 负收益;
　　}}}}
　　这个get.tag是什么意思呢？其实和技能标签一样,卡牌也有自己的标签,例如
　　杀:{
　　tag:{
　　respond:1,
　　respondShan:1,
　　damage:function(card){
　　if(card.nature=='poison') return;
　　return 1;
　　}}}
　　为了方便删了一些tag,那么『杀』有如下tag:respond;respondShan;damage等等,所以get.tag(card,'damage')
　　代表有伤害属性的卡牌,例如杀,南蛮,决斗等等。
　　*特别注意ai里面的effect是上帝视角,target不代表目标角色,player也不代表拥有此技能的玩家本身,
　　因为effect是写给别的AI看的,所以target代表玩家本身,player代表其他人,可以是正在犹豫是否要杀
　　你的任何一位玩家。
　　那么队友会杀卖血流队友还是杀敌方呢？还是套公式:
　　总效果=对使用者的收益值*使用者对自己的att+对目标的收益值*使用者对目标的att;
　　因为『杀』对使用者是没收益的,所以公式变为:
　　总效果=对目标的总收益值*使用者对目标的att;
　　比如杀对目标角色的收益是-1.5,满血曹丕的effect是return [0.5,1],那最终的收益是0.25,如果对曹丕的attitude是1,对某白板敌人的attitude是-1,那杀曹丕的效果为1*0.25,
　　杀敌人的效果为-1*-1.5,所以最终会选敌人(实际稍复杂点,详见ai.get.effect函数)
　　3.3.2 【倾向技】
　　这个占比例非常少,略说明一下
　　举例『忘隙』:
　　ai:{
　　effect:{
　　player:function(card,player){
　　if(card.name=='nanman'||card.name=='wanjian') return [1,3];
　　}}}
　　这里的意思是尽量放南蛮万剑之类,类似的,激昂也是强调AI尽量用红杀;
　　因为上述AI中effect里面的为player,所以代表的是对使用者的收益。
　　更多问题可以提问

第一卷 第三章 武将编写
　　1:武将格式如下
　　caocao:['male','wei',4,['hujia','jianxiong'],['zhu']],
　　武将名字:['性别','势力',生命,['技能']],
　　性别有男和女
　　男male
　　女female
　　势力
　　魏wei
　　蜀shu
　　吴wu
　　群qun
　　设置主公选将
　　,['zhu']
　　复制到技能后面即可
　　武将名字用_这个设置前缀,前缀是不显示的,用于区别武将名字,然后_后面的是武将显示的名字,可以在自由选将的拼音里找到,武将名字不能重复,否则会出bug
　　性别如果不写则视为无性别,国家可以自由改,如果你要弄的的武将包,
　　技能的添加'jineng','jineng2'在第一个技能后面用,再加'技能'就行,用'      '括起来,加多个也如此。
　　注:这些是内部文件改法,制作扩展比较简单。
　　2:武将背景故事
　　caocao:'魏武帝曹操,字孟德,小名阿瞒、吉利,沛国谯人。精兵法,善诗歌,乃治世之能臣,乱世之奸雄也。',
　　代码:武将名字:'背景故事内容',
　　2.5武将名字翻译
　　caocao:'曹操',
　　加上这个在相应位置(在内部文件查看)。
　　3:图片和配音
　　图片名字为caocao.jpg
　　格式为jpg,名字是武将的拼音/其他英语
　　角色图片文件夹(image/character)
　　皮肤命名
　　1.jpg
　　2.jpg
　　…
　　按数值排序
　　皮肤文件夹(image/skin/武将名字)
　　死亡配音
　　caocao.mp3
　　武将名字.格式
　　mp3/ogg均可,但是不能重复
　　死亡配音文件夹(audio/die)

第一卷 第四章 初识技能mod
　　大概分触发类、主动使用类、mod类和viewAs(视为)类、觉醒类、变身类…
　　在这里不细分了。
　　mod:被动技能/锁定技能(类似技能的属性,无法改变)
　　不能含有变量
　　//可以改变数值的数据,只能是固定数值
　　//不可触发配音
　　这类技能就是马术,咆哮…
　　格式:
　　jineng:{
　　mod:{
　　:function:(                ){
　　return
　　}
　　}
　　},
　　//空格处加代码:类别、条件…
　　举例:
　　【马术】:攻击距离+1
　　mashu:{
　　mod:{
　　globalFrom:function(from,to,distance){
　　return distance-1;
　　}
　　}
　　},
　　【飞影】:防御距离+1
　　feiying:{
　　mod:{
　　globalTo:function(from,to,distance){
　　return distance+1;
　　}
　　}
　　},
　　【咆哮】:杀的次数+最大
　　paoxiao:{
　　mod:{
　　cardUsable:function(card,player,num){
　　if(card.name=='sha') return Infinity;
　　}
　　},
　　},

解答篇 1扩展多开关
　　格式如下:
　　game.import('extension',{
　　name:'武将扩展名字',
　　//下面可以添加主题设置,不加也可。
　　//下面是分类武将包
　　if(config.武将扩展包的英文名){
　　game.addCharacterPack({
　　character:{
　　//下面是武将
　　技能
　　翻译
　　结尾
　　然后跳到下一个分类武将包
　　},'显示的名字');
　　}
　　if(config.英文名2){
　　game.addCharacterPack({
　　character:{
　　//下面是武将
　　技能
　　翻译
　　结尾
　　然后跳到下一个分类武将包
　　},'武将包名字2');
　　}
　　//以此类举,不断添加
　　//添加完武将包后,写最后的开关
　　//添加以下代码
　　},
　　config:{
　　武将扩展的英文名字:{
　　name:'显示的名字',
　　init:true,
　　},
　　//举例如下
　　sgk_sk:{
　　name:'SK武将',
　　init:true,
　　},
　　sgk_soul:{
　　name:'魂烈包',
　　init:true,
　　},
　　others:{
　　name:'武将补全',
　　init:true,
　　}
　　}
　　});
　　//init:true,是默认打开
　　//init:false,是默认关闭
　　有相关问题可以找我,QQ2691330040,解答篇将陆续更新…

第一卷 第五章 初识触发技能
　　0.5:简介
　　什么样的技能该写成触发类？就像我们常常看到的,回合开始阶段,回合结束阶段,指定一名目标后,都是触发类,这类技能占了大多数。
　　模板:
　　audio:2,
　　trigger:{player:'phaseBegin'},
　　//这片区域填写 forced:true,direct:true,等等一些需要声明的
　　filter:function(event,player){
　　if() return true;
　　return false;
　　},
　　content:function(){
　　'step 0'
　　.
　　.
　　'step 1'
　　.
　　.
　　}
　　//这个技能删除了执行部分。
　　1.0:触发时机://第二个单词要首字母大写、第三个也如此……
　　这个也就是触发这个技能的条件
　　首先写好 trigger:{xxx1:'xxx2'},
　　xxx1:可替换内容 player global target source
　　xxx2:拥有的触发条件经我回忆,有这么几种
　　gameDrawAfter 所有人摸牌结束之后,游戏开始
　　phaseBofore 回合开始前
　　phaseBegin 回合开始阶段
　　phaseJudgeBegin 判定阶段开始时
　　phaseJudgeBefore判定阶段开始前
　　phaseJudge 判定阶段
　　phaseDrawBefore摸牌之前
　　phaseDrawBegin摸牌之时
　　phaseDrawEnd摸牌结束
　　phaseUseBefore出牌阶段之前
　　phaseUseBegin出牌阶段开始时
　　phaseUseEnd出牌阶段结束时
　　phaseDiscardBefore弃牌阶段之前
　　phaseDiscardBegin弃牌阶段开始时
　　phaseDiscardEnd弃牌阶段结束时
　　phaseEnd回合结束时
　　loseEnd失去一张牌时
　　gainEnd获得一张牌后
　　chooseToRespondBegin打出一张牌响应之前
　　chooseToUseBegin使用一张牌后
　　damageEnd受伤害后
　　shaMiss杀被闪避
　　(触发条件有很多,可能不全,欢迎补充)
　　比如你要写
　　玩家失去一张牌之后 trigger:{player:'loseEnd'},
　　同理若你有多个触发条件
　　玩家失去或获得一张牌后trigger:{player:['loseEnd','gainEnd']},
　　附加说明:
　　global 代表所有人 比如全场其他角色摸牌阶段开始时触发 trigger:{global:'phaseDrawBegin'},
　　target 代表你成为目标 当你成为【杀】目标的时候 trigger:{target:'shaBefore'},
　　source 代表来源是你 当你造成伤害之后 trigger:{source:'damageEnd'},
　　1.5:通过某个事件触发的技能。触发时机的写法为事件角色+事件名+事件时机,事件时机分为开始前(Before)、开始时(Begin)、结束时(End)及结束后(After)
　　举例:英姿
　　trigger:{player:'phaseDrawBegin'},
　　content:function(){
　　trigger.num++;
　　}
　　player:触发时件中,技能拥有者的角色为事件的发起者
　　phaseDraw:摸牌阶段
　　Begin:事件时机为开始时
　　content:技能内容,trigger为触发此技能的事件,即摸牌阶段,该事件的摸牌数为num,trigger.num++即让摸牌阶段的摸牌数+1
　　举例:激昂(杀)
　　trigger:{player:'shaBegin',target:'shaBegin'},
　　filter:function(event,player){
　　return get.color(event.card)=='red';
　　},
　　content:function(){
　　player.draw();
　　}
　　player:'shaBegin',target:'shaBegin':代表技能拥有者作为事件(杀)的使用者或事件的目标时皆可触发
　　举例:旧秘计(仅摸牌部分)
　　trigger:{player:['phaseBegin','phaseEnd']},
　　filter:function(event,player){
　　return player.hp<player.maxHp;
　　},
　　content:function(){
　　'step 0'
　　player.judge();
　　'step 1'
　　if(result.color=='black'){
　　player.draw(player.maxHp-player.hp);
　　}
　　}
　　['phaseBegin','phaseEnd']:多个触发事件用数组表示

第一卷 第五卷 初识主动技能
　　主动技能
　　在出牌阶段使用:enable:'phaseUse';在任意用牌时机使用:enable:'chooseToUse';在需打出牌时使用:enable:'chooseToRespond'
　　举例:苦肉
　　enable:'phaseUse',
　　content:function(){
　　"step 0"
　　player.loseHp(1);
　　"step 1"
　　player.draw(2);
　　}
　　举例:制衡
　　enable:'phaseUse',
　　usable:1,
　　filterCard:true,
　　position:'he',
　　selectCard:[1,Infinity],
　　prompt:'弃置任意张牌并摸等量的牌',
　　content:function(){
　　player.draw(cards.length);
　　},
　　usable:出牌阶段可发动的次数
　　filterCard:什么样的牌可被选,true为没限制
　　position:要选择卡牌的区域,h为手牌;he为手牌和装备牌;hej为手牌、装备牌和判定牌
　　selectCard:需选择卡牌数,[1,Infinity]代表最少为1,最大无上限,若定义了filterCard,则默认为[1,1]
　　promot:选择技能后的提示框
　　举例:结姻
　　enable:'phaseUse',
　　filterCard:true,
　　selectCard:2,
　　filterTarget:function(card,player,target){
　　if(target.sex!='male') return false;
　　if(target.hp>=target.maxHp) return false;
　　if(target==player) return false;
　　return true;
　　},
　　content:function(){
　　player.recover();
　　target.recover();
　　}
　　selectCard:2代表最少选两张,最多选两张
　　filterTarget:选择目标需满足的条件
　　selectTarget:类似selectCard,由于定义了filterTarget,默认为[1,1],所以已省略
　　//enable:'phaseUse',
　　上面的是主动使用
　　//usable:1,
　　上面是使用次数,如果想任意使用,删除代码即可。
　　注://这个符号是解释说明用的,如果复制了会导致后面的代码无法使用。
　　编写阶段即将开始。

第一卷 终章 初识视为技能
　　主要代码viewAs:{"卡牌名字"},
　　1.0:简介武圣:
　　audio:'xx',
　　enable:['chooseToRespond','chooseToUse'],
　　filterCard:function(card){
　　return get.color(card)=='red';
　　},
　　position:'he',
　　viewAs:{name:'sha'},
　　viewAsFilter:function(player){
　　if(!player.num('he',{color:'red'})) return false;
　　},
　　prompt:'将一张红色牌当杀使用或打出',
　　如果你只想把手牌当做某张牌,将position改为你想要的。前文提过:h代表手牌,e代表装备区的牌,j代表判定区的牌
　　position:'h', 手牌
　　position:'he',手牌+装备区
　　position:'hej', 手牌+装备区+判定区
　　无非这么三种,不写就是默认手牌。
　　2.0:半自动视为技能
　　龙胆
　　longdan:{
　　group:['longdan_sha','longdan_shan'],
　　subSkill:{
　　sha:{
　　audio:2,
　　enable:['chooseToUse','chooseToRespond'],
　　filterCard:{name:'shan'},
　　viewAs:{name:'sha'},
　　viewAsFilter:function(player){
　　if(!player.num('h','shan')) return false;
　　},
　　prompt:'将一张闪当杀使用或打出',
　　check:function(){return 1},
　　ai:{
　　effect:{
　　target:function(card,player,target,current){
　　if(get.tag(card,'respondSha')&&current<0) return 0.6
　　}
　　},
　　respondSha:true,
　　skillTagFilter:function(player){
　　if(!player.num('h','shan')) return false;
　　},
　　order:4,
　　useful:-1,
　　value:-1
　　}
　　},
　　shan:{
　　audio:2,
　　enable:['chooseToRespond'],
　　filterCard:{name:'sha'},
　　viewAs:{name:'shan'},
　　prompt:'将一张杀当闪打出',
　　check:function(){return 1},
　　ai:{
　　respondShan:true,
　　skillTagFilter:function(player){
　　if(!player.num('h','sha')) return false;
　　},
　　effect:{
　　target:function(card,player,target,current){
　　if(get.tag(card,'respondShan')&&current<0) return 0.6
　　}
　　},
　　order:4,
　　useful:-1,
　　value:-1
　　}
　　}
　　}
　　},
　　'chooseToRespond'这个是响应
　　'chooseToUse'这个是主动用
　　forced:true,自动发动,与被动技能差不多,但是国战可以触发亮将。
　　被动触发视为技能=被动技能mod

解答篇 2技能数值加标记
sizhan: {
	group: ['sizhan1', 'sizhan2'],
		subSkill: {
		sizhan1: {
			audio: 2,
				trigger: { player: 'damageBegin' },
			forced: true,
				content: function() {
					trigger.untrigger();
					trigger.finish();
					if (player.storage.sizhan1 == undefined) {
						player.markSkill('sizhan1');
						player.storage.sizhan1 = 0;
					}
					player.storage.sizhan1 += trigger.num;
					player.syncStorage('sizhan1');
				},
			intro: {
				content: 'mark'
			}
		},
		sizhan2: {
			trigger: { player: 'phaseEnd' },
			filter: function(event, player) {
				return player.storage.sizhan1 > 0;
			},
			forced: true,
				content: function() {
					player.loseHp(player.storage.sizhan1);
					player.unmarkSkill('sizhan1');
					delete player.storage.sizhan1;
				}
		}
	}
　　shenli:{
　　trigger:{source:'damageBegin'},
　　filter:function(event){
　　return event.card&&(event.card.name=='sha')&&
　　event.parent.name!='_lianhuan'&&event.parent.name!='_lianhuan2';
　　},
　　forced:true,
　　content:function(){
　　if(typeof player.storage.sizhan1=='number'){
　　trigger.num+=player.storage.sizhan1;
　　}
　　},
　　ai:{
　　sava:true,
　　},
　　例子是古之恶来
　　死战: 锁定技,当你受到伤害时,防止该伤害并获得与伤害点数等量的死战标记.
　　神力: 锁定技,出牌阶段,你使用【杀】造成的伤害+X,X为当前死战标记数
　　注:原神力如下
　　神力: 锁定技,出牌阶段,你使用【杀】造成的第一次伤害+X,X为当前死战标记数

扩充篇 第一卷 第一章1
　　下面的运算符是触发技能的判定条件用的,其他判断类也可。
　　&=或之后赋值
　　!反
　　!=不等于
　　|=不等于
　　||或
　　&与
　　&&且
　　或:是多个判断条件满足一个时发动
　　且:满足多个判断条件发动
　　小于等于<=
　　小于<

解答篇 觉醒文字3
　　skillAnimation:true,
　　animationStr:'你们一起上吧！',
　　//你们一起上吧可以自己选择,加在技能里面用,最好是觉醒,限定技。
　　//建议做个连杀技能
　　例如:
　　skillAnimation:true,
　　animationStr:'一血 卧龙出山',

第二卷 准备阶段,基础词汇
　　//第一种卡牌名字小写加首字母大写的时机
　　Before之前
　　Begin开始
　　End结束
　　After之后
　　gameStart游戏开始时
　　shaBefore杀之前
　　player.hp自己的血
　　maxHandcard最大手牌数
　　trigger.num触发的数值
　　player.draw();摸牌//在括号里添加数字就是摸几个牌
　　damageEnd受伤后
　　player.loseHp();失去体力
　　target目标//与player对应
　　player.gain(trigger.cards);获得该牌
　　equip1武器
　　equip2防具
　　equip3攻马
　　equip4防马
　　equip5法宝
　　dieAfter死后
　　maxHp生命上限
　　addSkill('技能');获得永久技能
　　addTempSkill('技能');获得临时技能
　　discard();失去牌
　　source伤害来源,对应目标target,玩家player
　　trigger.directHit=true;此伤害无法闪避
　　length最大值

解答篇 觉醒文字颜色
　　2.0觉醒颜色
　　animationColor:'metal',
　　animationColor:'fire',
　　animanimationColor:'water',
　　animationColor:'thunder',
　　'       '里可以自己改颜色,例如黑色black

解答篇 4基本牌视为杀,被动触发
　　龙胆
　　longdan:{
　　group:['longdan_sha','longdan_shan'],
　　subSkill:{
　　sha:{
　　audio:2,
　　enable:['chooseToUse','chooseToRespond'],
　　filterCard:{name:'shan'},
　　viewAs:{name:'sha'},
　　viewAsFilter:function(player){
　　if(!player.num('h','shan')) return false;
　　},
　　prompt:'将一张闪当杀使用或打出',
　　check:function(){return 1},
　　ai:{
　　effect:{
　　target:function(card,player,target,current){
　　if(get.tag(card,'respondSha')&&current<0) return 0.6
　　}
　　},
　　respondSha:true,
　　skillTagFilter:function(player){
　　if(!player.num('h','shan')) return false;
　　},
　　order:4,
　　useful:-1,
　　value:-1
　　}
　　},
　　shan:{
　　audio:2,
　　enable:['chooseToRespond'],
　　filterCard:{name:'sha'},
　　viewAs:{name:'shan'},
　　prompt:'将一张杀当闪打出',
　　check:function(){return 1},
　　ai:{
　　respondShan:true,
　　skillTagFilter:function(player){
　　if(!player.num('h','sha')) return false;
　　},
　　effect:{
　　target:function(card,player,target,current){
　　if(get.tag(card,'respondShan')&&current<0) return 0.6
　　}
　　},
　　order:4,
　　useful:-1,
　　value:-1
　　}
　　}
　　}
　　},
　　集智
　　jizhi:{
　　audio:2,
　　audioname:['jianyong'],
　　trigger:{player:'useCard'},
　　frequent:true,
　　filter:function(event){
　　return (get.type(event.card)=='trick'&&event.cards[0]&&event.cards[0]==event.card);
　　},
　　content:function(){
　　player.draw();
　　},
　　ai:{
　　threaten:1.4,
　　noautowuxie:true,
　　}
　　},
　　代码如下
　　viewAs:{name:'sha'},
　　触发技能被动形态
　　jineng:{
　　audio:true,
　　forced:true,
　　trigger:{player:'useCard'},
　　filter:function(event,player){
　　return (get.type(event.card)=='basic';
　　},
　　content:function(){
　　viewAs:{name:'sha'},
　　}
　　},
　　注:
　　filter:function(event,player){
　　return 判断条件
　　},
　　注:
　　content:function(){
　　执行代码
　　}
　　},
　　注:audio:2,
　　2可以自己改,技能发动时有配音
　　注:forced:true,
　　加了这个代码技能自己发动
　　注:	audioname:['caocao'],
　　这个代码意思是别人有此技能会触发不同配音。
　　延时锦囊牌delay
　　锦囊牌trick
　　基本牌basic
　　红桃heart
　　黑桃spade
　　草花club
　　方块diamond
　　红red
　　黑black
　　gain获得
　　recover恢复

DIY篇即将发布
　　如果谁有好的技能,或者想编写的技能可以发到我这里。QQ2691330040
　　QQ1448890505
　　反馈建议,询问问题均可…

第二卷 第一章触发技能格式
　　//技能名字 	ganglie:{
　　//配音		audio:2,
　　//触发时机		trigger:{player:'damageEnd'},
　　//检测条件		filter:function(event,player){
　　return (event.source!=undefined);
　　},
　　//检测态度				check:function(event,player){
　　return (ai.get.attitude(player,event.source)<=0);
　　},
　　//	执行	content:function(){
　　执行代码;
　　}
　　},
　　//结束
　　被动触发
　　forced:true,
　　加在配音的下一行
　　更多内容可以自行研究或者找我提问,本章内容需要看以前内容,注意标点符号。
　　执行代码后面加;
　　英文字符;
　　audio:true,
　　一般结尾加,

扩展篇 联机解锁
　　注:限制是联机的二个人的联机部分文件必须一致。
　　联机代码:
　　connect:true,
　　添加到内部文件的武将或者模式的名字下面。
　　例如标准包:
　　'use strict';
　　game.import('character',function(lib,game,ui,get,ai,_status){
　　return {
　　name:'sp',
　　connect:true,
　　//这里只复制部分代码,位置不要看错,注意事项在上面。

DIY 咆哮
　　作者:我只是赵云
　　paoxiao:{
　　audio:2,
　　trigger:{player:'useCard'},
　　forced:true,
　　filter:function(event,player){
　　return event.card.name=='sha';
　　},
　　content:function(){
　　player.getStat().card.sha--;
　　}
　　},

番外篇 扩展联机教程
　代码还是
　　connect:true,
　　位置添加到扩展名字下面
　　例如:
　　game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"列女传",content:function (config,pack){
    
    
    
lib.config.lnzGXJZ;
game.saveConfig('lnzGXJZ',1);
lib.config.lnzGXJZ1=0;		
                if (config.lnz){
			for (var i in lib.characterPack['lnz']) {	
			if (lib.character[i][4].indexOf("forbidai")<0){
			lib.character[i][4].push("forbidai");
			}			
		}					
				};	    
    
},precontent:function (lnz){
       if(lnz.enable){		
            game.import('character',function(){
                var lnz = {
                    name: 'lnz',
                    connect:true,				
                    
                    character:{
                         "ln_hyy":["female","shu",3,["LX","dc","机巧"],["des:诸葛亮之妻,诸葛瞻之母,有奇才,上通天文,下察地理,精通兵法,近乎诸略无所不晓,善于发明制造,传授诸葛亮很多学识,在诸葛亮病逝之后不久也随之仙逝,死前以"忠孝"勉励其子诸葛瞻;"]],
            "ln_nw":["female","G",4,["SD","SN"],["des:上古传说中的人物,华胥氏之女,人首蛇身,有圣德(五行属土德),与伏羲兄妹通婚,创造婚姻制度,结束了只知其母不知其父的原始社会,有补天造人、治水平乱等的传说,和伏羲一起治理族人,制造乐器等物品,对后世产生了极大的影响(由于女娲伏羲属于一家人,故而"三皇"中只选取其中一人为代表);"]],

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


1. 扩展的基本格式
扩展为zip格式,包含extension.js

extension.js的格式:
game.import('extension',{
name:'扩展名称',
content:function(config){
//扩展内容
},
image:['xxx.png','xxx.png'],//扩展包内所有图片名
config:{
//在扩展界面提供的选项,作为content函数的参数
},
help:{
//帮助界面中显示的内容
}
});

2.content函数
content函数调用时机为游戏最初载入时,可用来修改游戏本身的内容。
若要修改现有的武将或卡牌的内容,须等扩展载入完毕后再触发,写法如下
lib.arenaReady.push(function(){
//要执行的内容
})

3. 添加武将
通过扩展添加的武将与武将包有部分区别,它的管理方式与自带武将相同,可自由决定放在哪个现有武将包(或创建新武将包)
示例:
name:'xxx',
content:function(config){
if(config.x_caocao){
lib.character.x_caocao=['male','wei',4,['x_jianxiong'],['db:extension-xxx:x_caocao.jpg','zhu']]
}
lib.translate.x_caocao='曹操';
lib.skill.x_jianxiong={
//自定义技能
}
dlib.translate.x_jianxiong='奸雄';
lib.translate.x_jianxiong_info='技能描述';
},
image:['x_caocao.jpg'],
config:{
x_caocao:{
name:'启用曹操',
init:true
}
}
其中
'db:extension-xxx:x_caocao.jpg'表示武将图为导入的图片
'zhu'表示这是一个常备主公

config里表示在扩展界面加一个选项(即content中的config.x_caocao),init:true表示这个选项默认为true

3.1 将武将放入一个扩展包
3.1.1创建一个新武将包
var caocao=['male','wei',4,['x_jianxiong'],['db:extension-xxx:x_caocao.jpg','zhu']];
lib.character.x_caocao=caocao;
lib.characterPack.mode_extension_xxx={x_caocao:caocao};
lib.translate.mode_extension_xxx_character_config='示例';
mode_前缀代表这是一个由扩展创建的武将包,不能在武将页面关闭

3.1.2放入一个现有的武将包中
lib.packageReady.push(function(){
//将武将放入标准包
lib.characterPack.standard.x_caocao=lib.character.x_caocao
});
packageReady发动时机为扩展载入完毕,界面创建之前
arenaReady发动时机为界面创建完毕
由于创建菜单时用到了武将包,所以修改现有武将包的时机为界面创建之前,即packageReady

3.2 武将的其它设置  lib.character[character][4]

设为boss:
lib.character.x_caocao=['male','wei',4,['x_jianxiong'],['db:extension-xxx:x_caocao.jpg','zhu','boss']]
设为boss且可在正常模式中出现:
lib.character.x_caocao=['male','wei',4,['x_jianxiong'],['db:extension-xxx:x_caocao.jpg','zhu','boss','bossallowed']]

设置ai禁选:lib.config.forbidai.push('x_caocao')
设置双将禁选:lib.config.forbiddouble.push('x_caocao')
设置武将强度
(影响部分ai,屏蔽弱将时不出现c及以下的武将,屏蔽强将时不出现ap及以上的武将)
强度分为9个等级:s>ap>a>am>bp>b>bm>c>d
lib.arenaReady.push(function(){
lib.rank.s.push('x_caocao');//将强度设为S级
})
设置珠联壁合:
lib.arenaReady.push(function(){
if(!lib.perfectPair.x_caocao) lib.perfectPair.x_caocao=[];
lib.perfectPair.x_caocao.push('dianwei');//设置与典韦珠联壁合
})

3.3 添加武将的简便写法
game.addCharacter('x_caoca',{
sex:'male',
translate:'曹操',
skills:['x_jianxiong'],
tags:['zhu']
});
等价于
var caocao=['male','wei',4,['x_jianxiong'],['db:extension-xxx:x_caocao.jpg','zhu']];
lib.character.x_caocao=caocao;
lib.translate.x_caocao='曹操';
lib.characterPack.mode_extension_xxx={x_caocao:caocao};
lib.translate.mode_extension_xxx_character_config='xxx';

4. 添加卡牌
lib.card.yuanshengfazhang={
fullimage:true,
image:'db:extension-示例扩展:yuanshengfazhang.jpg',
enable:true,
type:'trick',
filterTarget:true,
content:function(){
target.damage('thunder');
}
}
lib.translate.yuanshengfazhang='原生法杖';
lib.translate.yuanshengfazhang_info='造成1点雷电伤害';
var n=parseInt(config.yuanshengfazhang);
while(n--){
lib.card.list.push(['club',3,'yuanshengfazhang']);
}
lib.cardPack.mode_extension_example=['yuanshengfazhang'];
lib.translate.mode_extension_example_card_config='示例';


等价写法:
game.addCard('yuanshengfazhang',{
fullimage:true,
enable:true,
type:'trick',
filterTarget:true,
content:function(){
target.damage('thunder');
}
},
translate:'原生法杖',
description:'造成1点雷电伤害',
number:parseInt(config.yuanshengfazhang)
});


fullskin(左)与fullimage(右)

4. 创建模式
name:'新模式',
content:function(config){
game.addMode('xxmode',{
//模式内容
}
},{
translate:'新模式',
config:{
xxx:{
name:'一个选项',
init:'a',
item:{
a:'A',
b:'B',
c:'C'
},
frequent:true,
restart:true,
}
},
});
},
help:{
'新模式':'帮助内容'
}
},
onremove:function(){
game.clearModeConfig('xxmode');
},
image:['xxmode.jpg']

其中
image应包含与模式同名的图片(即xxmode.jpg),用于在开始界面显示
config为模式选择菜单中的选项,不是扩展菜单中的选项
onremove为此扩展被删除时的操作,模式添加的选项需手动删除(clearModeConfig)

4.1 载入现有模式的内容

'step 0'
game.loadMode('identity');
'step 1'
for(var i in result.ai.get){
ai.get[i]=result.ai.get[i];
}
//引用身份模式的ai

1.9写法改变:


1. 添加/移除技能必须使用addSkill/removeSkill或addAdditionalSkill/removeAdditionalSkill函数
2. 添加/移除全局技能必须使用addGlobalSkill/removeGlobalSkill函数
3. 禁用/启用技能必须使用disableSkill/enableSkill函数
4. 检查是否有某技能必须使用hasSkill函数
5. 装备不再能直能通过appendChild函数添加,也不再能通过remove函数移除
6. 使用createEvent创建事件,事件的content必须用setContent添加

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

HMLT教程


字体标记
字号:h……
居中:<h2  align="center">
段落:<p>内容</p>
水平线:hr
换行:br
加粗:文本b,强调stong
斜体:文本i,强调em
删除线:<del>内容</del>    s也是
下划线:<ins>内容</ins>     u也是

图片标记
<img sro="路径/图片"/>
代替图片的文字:alt
悬停文字:title
图像宽度:width
图像高度:height
边框:border
顶底空白:vspace
左右空白:hspace
图字调整:align="x"
对齐到左边:left
对齐到右边:right
文字与图片顶对齐:rop
文字与图片中对齐:middle
文字与图片底对齐:bottom
超链接

<a  href="跳转的目标">内容</a>
原窗口:target="_self"
新窗口:target="_blank"


=================================================================================================================================================================================================================================================================================================================================


暂时完结