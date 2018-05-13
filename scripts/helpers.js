/*
CREDITS:Hytham Shiehab <hytham.shiehab.2@gmail.com>, <https://twitter.com/hythamshiehab2>
DISCLAIMER:
THIS IS NOT TO BE USED BY ANY (KNWON BY *OTHERS* AS BAD) PARTIES TO HARM ANY GOOD PARTIES.
BY *OTHERS* I MEAN ME, AND/OR ANY OTHER GOOD PARTIES
*/
"use strict";

function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) {
            eventType = name;
            break;
        }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
   
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function doItNow() {
    chrome.runtime.sendMessage({
        data: "doItNow_REQUEST"
    }, function (response) {});
}

function parseSitemap() {
    //Parse the givn XML
    var xmlDoc = $.parseXML(xml);
    var $xml = $(xmlDoc);
    // Find Person Tag
    var $url = $xml.find("url");
    var image_loc = [];
    var urls = [];
    var images = [];
    $url.each(function () {
        var loc = $(this).find('loc').text();
        urls.push(loc);
    });
    var $image = $xml.find("image");
    console.log($image);
    $image.each(function () {
        var loc = $(this).find('image_loc').text();
        images.push(loc);
    });
    var data = [urls, images];
    return data;
}

function getRandomImage() {
    //Parse the givn XML
    var xmlDoc = $.parseXML(xml);
    var $xml = $(xmlDoc);
    // Find Person Tag
    var $image = $xml.find("image");
    var images = [];
    $image.each(function () {
        var loc = $(this).find('image_loc').text();
        images.push(loc);
    });
    var randomArrayPosition = Math.floor(Math.random() * images.length);
    return images[randomArrayPosition];
}

function getLink(i) {
    return links[i];
}

function getText(i) {
    return texts[i];
}

var texts = ['نسخ من المحاضر والأوراق الرسميه والأخبار التي توضح حقيقة أمن الدوله المستمره تحت ستار مايسمى بـ"الأمن الوطني" والتي يباشرها نفس الضباط ونفس العقول ونفس القلوب، دون وازع من ضمير او رادع من رقابه','لا يوجد مختصر لأن هذه المقالة محمية بكلمة مرور.','كما ذكرت آنفا، قمت بتطوير برنامج لنشر التعليقات آليا، أثناء فترة عمل المدونة السّابقة، والآن أقوم بتطوير برنامج جديد، يقوم بنفس الوظيفه السّابقة، لكن بشكل أكثر كفاءة وسلاسه. كان من عيوب البرنامج السّابق المركزية، فليس من السهل نشره على أجهزة','إنّ أي دولة أو حتّى شبه دوله تستطيع عبر أجهزتها الأمنية رفيعة المستوى، أن تراقب أجهزة الهاتف المحمول (وغيره)، وليس سرّا أن المكالمات الدّولية هي الخطّ الأول لعمليات المراقبة (الرّوتينية على الأقل). (أ) وإذا تمّ تحديد توقيت الإتصال، من جزيرة ','العميل السرّي الخّاص جدّا','مخطط للأحداث منذ ان قامت امن الدوله بالافتئات والالتفاف حول حكم القضاء بالبراءة، وممارسه الضغوط علي للعمل معهم تحت ماسموه كذبا بـ"مكاف','بعض ما أباشره من عمليات ردّا على فعاليات وعمليات أمن الدوله التي تستتر بالعمل الأمني والقانون، والعمل الأمني والقانون برئ منها براءة الصدّيق من الكذب والخيانه والغدر والفجور','نسخ من المحاضر والأوراق الرسميه والأخبار التي توضح حقيقة أمن الدوله المستمره تحت ستار مايسمى بـ"الأمن الوطني" والتي يباشرها نفس الضباط ونفس العقول ونفس القلوب، دون وازع من ضمير او رادع من رقابه','ما قمت وأقوم بتوزيعه من منشورات، حسبما تيسر، فضحا لما يسمى بالعمل الأمني المزعوم لما يسمى بامن الدوله ومسماها الجديد بالامن الوطني','ما بني على حقّ، فاحتمال الحقّ والباطل في سواء، إلّا بحقّ البيّنة التي جعلت من الأساس حقّا. وما بني على باطل، فهو باطل. وللفرِح الفخور، المحتال المختال، الخارق ولا خرق، المتطاول ولا طول، عارم الشّكر. ولاستحمارات برمودا المخترمه. النّكاي','يعرفها الكثيرين على انها مربّع الرعب وغرق الطائرات وطيران السفن وابحار المركبات، والذّهاب بلا إياب، وهي كلّها أوهام وتضليل والهاء عن الحقيقه. اما الحقيقه فهي ملجأ لكل المتهرّبين من “القانون المحلّي”، والمحلّي هنا نسبة الى محل تقا','التروجان ببساطة هو برنامج برئ المظهر خبيث المبطن، اذ يقوم بفتح منفذ في جهاز الضحية، دون علمه، ويقوم بانشاء قناة اتصال سرّيه (بصفة أن الضحية لا تعلم، وان كان من الممكن باستخدام برامج التنصّت والفرز الشّبكي، مثل برنامج wireshark – الاطلاع على ','هل ترى أن ما يسمّى بأمن الدّولة قد حاد وانحرف عن مساره؟ (polls)','احنا عاوزينك تساعدنا في مكافحة غسيل الأموال والجريمه المنظمه — عرض الغمّاية احنا بنأهلك لمهمه عشان مصر — معصوبا بالغمّاية مرة أخرى، وفي اتجاه المعتقل ايه بقى موضوع التروجان!؟ — معصوبا بالغمّاية، واثناء التّعذيب، وفور ','وحتّى لا تبذل الأطراف المختلفه، من ذراع الأمن القومي وكفّها أمن الدّوله وأصابعها الدّاخلية مجهودا في البحث، وحتى لا تتحجّج بالمجهوليه، أو تتبجّح بالمعلوميّة، فسوف تجد هنا الأماكن الجغرافية التي تئول إليّ، محدّثة بحسب ما تيسّر. السبت 12','كانت “حجر الأساس” لم تؤت ثمارها، فقد كان أقصى ماوصلت اليه هو “اجتماع لجنة الدّفاع والأمن القومي“، وان كانت هناك فائدة واضحه هو “اثبات حالة” انني قد ذهبت الى “الأمن القومي” (الكيان وليس اللجنة)،','فصل مابين الطّمع والطّمح، والسّمت والصّمت الكيانات الأمنيه، وعناصرها، تدّعي دوما أهميه السريه والصمت فيما يخصّ “العمل الأمني”، قد يكون هذا بديهيّا، خاصه وفق مبادئ وقوانين وتشريعات تحتم مثل هذا الصمت والسريه، لكن ماذا سوف يحدث اذا','تقديم “أوراق بحثية” في موضوعات تقنيه، مثل Session Hijacking، Cross Site Scripting و SQL Injection اكتشاف ثغرات موقع “مكتوب“ اكتشاف ثغرات البورصة اكتشاف ثغرات بنك مصر ماسبق تمّ الإبلاغ عنه “رسميا“، وما أقصد','لا يوجد مختصر لأن هذه المقالة محمية بكلمة مرور.','أما تفنيدها وتفتيتها فهنا والآن. (1) “وغير معلوم محل إقامته الحالية” يالها من كذبة إفتتاحية! فناهيك عن ان ضابط امن الدولة “أ.ح.” الذي كان هو أحد أهم ضباط الاتصال المتعاملين معي في ما يسمى بـ”مكافحة غسيل ال','كيف تقرأ المدوّنة، خاصّة وأن تنسيق الأحداث بتراتبها الزّمني يجعل المتابع مشتّتا (نوعا) والموضوع متشعّب، لذا قمت بترتيبها في موضوعات مترابطة، موضّحا هنا التراتب الزّمني، أما اذا أردت أن تأخذ خلاصة الخلاصة على عجالة، فاقرأ ما يسمّى بـ&#8','ع. ص. م. ع. (والاسم الحركي ع. ص. أيضا) الرّائد صاحب ما يسمّى بمحضر التحريات الدقيقة للأمن الوطني أ.ح. العقيد الذي كان الضابط المسؤول وصاحب الاتصال الأول بي ع.ب. المقدّم (الضابط المسؤول الثاني) طارق نقيب (ومبرمج جافا)، اللواء و.ن. المدي','استوقفني كمين وعندما قدمت له بطاقتي وكشف عن حالتي الجنائيه، وجد ان هناك قضية تخصني في قسم الـ..، قدمت له الإفادات اللازمه، كانت الإفادات ملحقة في أوراق تخص مايحدث لي، بعضها معروضه امامك، كان ان استفزت ضابط المباحث تلك الورقة التي خرجت من الأ','','','تتلاعب أمن الدوله، كونها جهة التحقيق المهيمنة، بالأدلة والبراهين، المثبتة أو المنفية، كما قررتها سلفا أهوائها ومصالحها، لا وقائع الواقع، لا يصدّها عن ذلك وازع من نفسها أو رادع من غيرها، وهي لا تمانع من اشعال الحرائق (المعنويه) اذا كان ','أما الضابط الذي كان ضمن “فريق” المسامرات في قسم شرطة مدينة نصر المقابل لجهاز امن الدولة، وذلك بعد محاولتي (الثانية) لابلاغ رئاسة الجمهورية، والذي قال لي (حرفيا) “انا مش هاعرف انام على مخدتي بالليل وانا حاسس انك ممكن تمسك سل','توجّهت الى مجمّع التحرير، الدّور الخاص بمباحث الأموال العامّة وغسيل الأموال، طلبت مقابلة أحد الضبّاط لتقديم البلاغ، انتظرت حوالي الساعة قبل ان يتم اصطحابي الى أحد المكاتب، أبدى الضابط ملاحظات مهمّه: انا ضابط مكتبي، فانا مقدرش استلم البلاغ بصف','كيف بدأت امن الدوله استلواحها عليّ، ولماذا.. بعد تخرجي من الكلية، ونظرا لظروف الكلية الخاصه جدا حينها، كان عليّ ان اقوم بتطوير نفسي قبل ان أرى، من وجهه نظري، انني مبرمج.. لذا عكفت على دراسة تطوير مواقع الانترنت من الصفر، كان ايضا ان قمت بتطوي','ر. م.، آنسة في مقتبل العشرينات، تواصلت معي عبر المدوّنة السابقه، طالبة مني رقم هاتفي المحمول، إضافة الى كونها تريد معرفة بعض الأمور التي تخص موضوعا محددا في المدونة (موضوع قاعدة بيانات الرّقم القومي)، وهو الموضوع الذي تم نشره في بعض الجرائد ا','اختراق موقع مصلحة الأحوال المدنية، وهذه الواقعه تحديدا قمت بالإعداد لها فور خروجي من المعتقل، وقد كان مني العزم ان لا أفلت من غرّروا بي، وساموني سوء العذاب النفسي والبدني في المعتقل وفي امن الدولة، بل وتحرّزوا مني بأقرب الناس لي، فادخلوني مست','الإحتواء والإلهاء – أكثر من 21 يوما، بين سبعة أماكن احتجاز، دون أن أرى وكيل نيابه ودون اتهام، وذلك بعد منتصف شهر شعبان بقليل وحتى منتصف رمضان والسبب هو “الخوف” من حدوث ما لايحمد عقباه ولا يستطيعون له احتواءا ولا الهاءا.. فقد','  رابط للصّور بالحجم الكامل رابط للطباعه','تلك الجملة مكوّنة من حقيقة ورأي (الفقرة قبل الأخيرة من محضر تحريات الأمن الوطني، المرفقات) أما الحقيقة، فان بلطجة “امن الدولة” تسمح لها انها تدّعي انني مازلت احد عناصرهم، ولا أعلم اين تقف حدود “بجاحة” امن الدوله، ذلك ا'];

var links = ['https://amnaldawla.wordpress.com/?page_id=837','https://amnaldawla.wordpress.com/?p=810','https://amnaldawla.wordpress.com/?p=769','https://amnaldawla.wordpress.com/?p=720','https://amnaldawla.wordpress.com/2018/04/06/%d8%b9%d9%84%d8%a7%d8%a1-%d8%a3%d8%a8%d9%88-%d8%a7%d9%84%d9%81%d8%aa%d9%88%d8%ad-%d9%85%d8%ad%d9%85%d8%af-%d8%a7%d9%84%d8%b4%d9%8a%d8%ae/','https://amnaldawla.wordpress.com/2018/04/06/%d9%85%d8%ae%d8%b7%d9%91%d8%b7-%d8%a7%d9%84%d8%a3%d8%ad%d8%af%d8%a7%d8%ab/','https://amnaldawla.wordpress.com/%d8%a7%d9%84%d9%8a%d9%88%d9%85%d9%8a%d9%91%d8%a7%d8%aa/','https://amnaldawla.wordpress.com/?page_id=640','https://amnaldawla.wordpress.com/?page_id=617','https://amnaldawla.wordpress.com/?page_id=479','https://amnaldawla.wordpress.com/?p=463','https://amnaldawla.wordpress.com/?p=433','https://amnaldawla.wordpress.com/?page_id=373','https://amnaldawla.wordpress.com/?page_id=368','https://amnaldawla.wordpress.com/?page_id=362','https://amnaldawla.wordpress.com/?p=330','https://amnaldawla.wordpress.com/?p=328','https://amnaldawla.wordpress.com/?p=326','https://amnaldawla.wordpress.com/?page_id=219','https://amnaldawla.wordpress.com/?page_id=156','https://amnaldawla.wordpress.com/?page_id=132','https://amnaldawla.wordpress.com/?page_id=117','https://amnaldawla.wordpress.com/?p=113','https://amnaldawla.wordpress.com/?page_id=108','https://amnaldawla.wordpress.com/?page_id=107','https://amnaldawla.wordpress.com/?page_id=104','https://amnaldawla.wordpress.com/?p=101','https://amnaldawla.wordpress.com/?p=99','https://amnaldawla.wordpress.com/?p=73','https://amnaldawla.wordpress.com/?p=64','https://amnaldawla.wordpress.com/?p=52','https://amnaldawla.wordpress.com/?p=45','https://amnaldawla.wordpress.com/?page_id=26','https://amnaldawla.wordpress.com/?p=22'];
