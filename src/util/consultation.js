export const questionaireOptions = [
    '没有(根本不)',
    '很少(有一点)',
    '有时(有些)',
    '经常(相当)',
    '总是(非常)'
]

export const ageGroupOptions = [
    '<20',
    '20-30',
    '30-40',
    '40-50',
    '50-60',
    '>60'
]

export const lifeStyleOptions = [
    'Active活跃',
    'Sedentary 少活动'
]

const desc_sectionPoints = "原始分";
const desc_convertedPoints = "转化分";

// const questionaireGuideline = {
// "    <Table>
//         <thead>
//         <tr>
//             <th>体质类型</th>
//             <th>条件</th>
//             <th>判定结果</th>
//         </tr>
//         </thead>
//         <tbody>
//         <tr>
//             <td> 平和质 </td>
//         </tr>
//         </tbody>
// 转化分 >= 60 分				是
// 	其他 8 种体质转化分均 < 30 分
// 转化分 >= 60 分				基本是
// 	其他 8 种体质转化分均 < 40 分				
// 	不满足上述条件者				否
// 转化分 >= 40 分				是
// 偏颇体质	转化分 30 - 39 分				倾向是
// 转化分 < 30 分				否
//     </Table>
// "}					

const dietDiaryNumberOfDays = 3;
const dietType = ['breakfast', 'lunch', 'dinner', 'snack 1', 'snack 2', 'other'];

const _dietDiary =  
    {
        date: '',
        breakfastTime: '',
        breakfast: '',
        lunchTime: '',
        lunch: '',
        dinnerTime: '',
        dinner: '',
        snack1Time: '',
        snack1: '',
        snack2Time: '',
        snack2: '',
        drinkTime: '',
        drink: '',
        otherTime: '',
        other: '',
    }

export const questionaire = [
    { 
        sectionSeq: 'A',
        sectionDesc: '平和型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        result: '',
        questions: [{
                seq:1,
                question:	'你精力充沛吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0
            }, {
                seq:2,
                question: '你容易疲乏吗 ?',
                ptOption1: 5,
                selectedOption: 0,
                point: 0,
            }, {
                seq:3,
                question: '你说话的声音柔弱无力吗 ?',
                ptOption1: 5,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你感觉到闷闷不乐、情绪低沉吗 ?',
                ptOption1: 5,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你比一般人耐受不了寒涼(冬天的寒冷, 夏天的冷空调、电扇等) 吗 ?', 
                ptOption1: 5,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你能很快适应自然环境的变化吗 ?',
                ptOption1: 5,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你容易失眠(没有很好的失眠质量) 吗 ?', 
                ptOption1: 5,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 8,
                question: '你容易忘事(健忘) 吗 ?', 
                ptOption1: 5,
                selectedOption: 0,
                point: 0,
            },
        ]},{
        sectionSeq: 'B',
        sectionDesc: '气虛型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        questions: [{
                seq: 1,
                question: '你容易气短(呼吸短促，接不上气) 吗 ?',
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 2,
                question: '你容易疲乏吗 ?',
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 3,
                question: '你容易心慌吗 ?', 
                ptOption1: 5,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你容易头晕或站起时晕眩吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你比别人容易患感冒吗？',
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你喜欢安静、懶得说话吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你说话声音低弱无力吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 8,
                question: '你活动量稍大就容易出虚汗吗 ?',
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            },
        ]},{
        sectionSeq: 'C',
        sectionDesc: '阳虚型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        questions: [{
                seq: 1,
                question:' 你手脚发涼吗 ?',
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 2,
                question: '你胃脘部、背部或腰膝部怕冷吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 3,
                question: '你感到怕冷、衣服比别人穿得多吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你比一般人受不了寒冷(冬天的寒冷, 夏天的冷空调、电扇等) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你比别人容易患感冒吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你吃(喝) 凉的东西会感到不舒服或者怕吃(喝) 凉东西吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你受凉或吃(喝) 凉的东西后, 容易腹泻(拉肚子) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            },
    ]},{
        sectionSeq: 'D',
        sectionDesc: '阴虚型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        questions: [{
                seq: 1,
                question:'你感到手脚心发热吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 2,
                question:'你感觉身体、脸上发热吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 3,
                question: '你皮肤或口唇干吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你口唇的颜色比一般人红吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你容易便秘或大便干燥吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你面部两颧潮红或偏红吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你感到眼睛干涩吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 8,
                question: '你感到口干咽燥、总想喝水吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            },
        ]
    }, {
        sectionSeq: 'E',
        sectionDesc: '痰湿型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        questions: [{
                seq: 1,
                question: '你感到胸闷或腹部胀满吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 2,
                question: '你感到身体沉重不轻松或不爽快吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 3,
                question: '你腹部肥满松软吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你有额部油脂分泌多的现象吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你上眼睑比别人肿(上眼睑有轻微隆起的现象) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你嘴里有黏黏的感觉吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你平时痰多, 特别是咽喉部总感到有痰堵着吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 8,
                question: '你舌苔厚腻域有舌苔厚厚的感觉吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            },
        ]
    }, {
        sectionSeq: 'F',
        sectionDesc: '湿热型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        questions: [{
                seq: 1,
                question: '你面部成鼻部有油腻感或者油亮发光吗 ?' ,
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
        }, {
                seq: 2,
                question: '你容易生痤疮或疮疖吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 3,
                question: '你感到口苦或嘴里有异味吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你大便黏滞不爽、有解不尽的感觉吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你小便时尿道有发热感、尿色浓(深) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你带下色黄(白带颜色发黄) 吗 ? [限女性回答]', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你的阴囊部位潮湿吗 ? [限男性回答]', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            },
        ]
    }, {
        sectionSeq: 'G',
        sectionDesc: '血瘀型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        questions: [{
                seq: 1,
                question: '你的皮肤在不知不觉中会出现育紫瘀斑(皮下出血) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 2,
                question: '你两颧部有细微红丝吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 3,
                question: '你身体上有那里疼痛吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你面色与晦黯或容易出现褐斑吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你容易有黑眼圈吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你容易忘事(健忘) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你口唇颜色偏黯吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            },
        ]
    }, {
        sectionSeq: 'H',
        sectionDesc: '气郁型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        questions: [{
                seq: 1,
                question: '你感到闷闷不乐、情绪低沉吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 2,
                question: '你容易精神紧张、焦虑不安吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 3,
                question: '你多愁善感、感情脆弱吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你容易感到害怕或受到惊吓吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你胁肋部或乳房胀痛吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你无缘无故叹气吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你咽喉部有异物感, 且吐之不出、咽之不下吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            },
        ]
    }, {
        sectionSeq: 'I',
        sectionDesc: '特禀型体质',
        sectionQuestion: '请根据近一年的体验和感觉，回答以下问题',
        sectionPoints: 0,
        convertedPoints:0,
        questions: [{
                seq: 1,
                question: '你没有感冒时也会打喷嚏吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 2,
                question: '你没有感冒时也会鼻塞、流鼻涕吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 3,
                question: '你有因季节变化、温度变化或异味等原因而咳喘的现象吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 4,
                question: '你容易过敏(对药物、食物、气味、花粉或在季节交替、气候变化时) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 5,
                question: '你的皮肤容易起荨麻疹(风团、风疹块、风疙瘩) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 6,
                question: '你的皮肤因过敏出现过紫癜(紫红色瘀点、瘀斑) 吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            }, {
                seq: 7,
                question: '你的皮肤一抓就红, 并出现抓痕吗 ?', 
                ptOption1: 1,
                selectedOption: 0,
                point: 0,
            },
        ]
    }]

export const personalConditions = [
    {
        sectionSeq: "A",
        sectionDesc: 'Muscular/skeletal problems 肌肉骨骼问题',
        conditions: [
            {
                condition: 'Back背部',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Aches/pain疼痛',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Stiff joints僵硬',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Headaches头疼',
                answerType: 'boolean',
                answer: false,
            }
        ]
    },
    {
        sectionSeq: "B",
        sectionDesc: 'Digestive problems 消化系统问题',
        conditions: [
            {
                condition: 'Constipation 便秘',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Bloating胀气',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Liver/gall bladder 肝胆问题',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Stomach 胃的问题',
                answerType: 'boolean',
                answer: false,
            }
        ]
    },
    {
        sectionSeq: "C",
        sectionDesc: 'Circulation 身体循环',
        conditions: [
            {
                condition: 'Heart心脏',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Blood pressure (high/low) 血压（高/低)',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Fluid retention 水肿',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Tired legs 足部疲累',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Varicose veins 静脉曲张',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Cellulite 蜂窝组织',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Kidney problems 肾脏疾病',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Cold hands and feet 手脚冰冷',
                answerType: 'boolean',
                answer: false,
            }
        ]
    },
    {
        sectionSeq: "D",
        sectionDesc: 'Gynaecological 妇科问题',
        conditions: [
            {
                condition: 'Irregular periods 月经不规则',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'P.M.T. 经前症候群',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Menopause 更年期',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'H.R.T 荷尔蒙代替治疗',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Pill 避孕丸',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Coil 子宫环',
                answerType: 'boolean',
                answer: false,
            }
        ]
    },
    {
        sectionSeq: "E",
        sectionDesc: 'Nervous system 神经系统',
        conditions: [
            {
                condition: 'Migraine 偏头痛☐',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Tension 情绪紧绷',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Stress 压力大',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Depression 忧郁',
                answerType: 'boolean',
                answer: false,
            },
        ]
    },
    {
        sectionSeq: "F",
        sectionDesc: 'Immune system 免疫系统',
        conditions: [
            {
                condition: 'Prone to infections 容易感染',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Sore throat 喉咙痛',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Colds 感冒',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Chest 肺部不适',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Sinuses 鼻窦炎',
                answerType: 'boolean',
                answer: false,
            },
        ]
    },
    {
        sectionSeq: "G",
        sectionDesc: 'Ability to relax 放松的能力',
        conditions: [
            {
                condition: 'Good 良好',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Moderate中度',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Poor 不好',
                answerType: 'boolean',
                answer: false,
            },
        ]
    },
    {
        sectionSeq: "H",
        sectionDesc: 'Sleep patterns 睡眠状况',
        conditions: [
            {
                condition: 'Good 良好',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Poor 中度',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Average no.of hours平均几小时',
                answerType: 'string',
                answer: '',
            },
        ]
    },
    {
        sectionSeq: "I",
        sectionDesc: 'How many portions of each of these items does your diet contain per day ? 每日摄取多少单位（份）？',
        conditions: [
            {
                condition: 'Fresh fruit 新鲜水果',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Fresh vegetables 新鲜蔬菜',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Protein and source(type) 蛋白质来源（种类）',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Dairy produce 乳制品',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Sweet things 甜食',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Added salt 额外添加盐',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Added sugar 额外添加糖',
                answerType: 'string',
                answer: '',
            },
        ]
    },
    {
        sectionSeq: "I",
        sectionDesc: 'How many units of these drinks do you consume per day 每日摄取多少单位？',
        conditions: [
            {
                condition: 'Tea 茶',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Coffee 咖啡',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Fruit juice 果汁',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Water 白开水',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Soft drinks 汽水',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Others 其他',
                answerType: 'string',
                answer: '',
            },
        ]
    },
    {
        sectionSeq: "J",
        sectionDesc: 'Do you exercise? 是否有运动？',
        conditions: [
            {
                condition: 'None 无',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Occasional 偶尔',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Irregular 不定时',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Regular 例常',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Types 种类',
                answerType: 'string',
                answer: '',
            },
        ]
    },
    {
        sectionSeq: "K",
        sectionDesc: 'What is your skin type? 皮肤种类？',
        conditions: [
            {
                condition: 'Dry 干',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Oil 油',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Combination 混合',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Sensitive 敏感',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Dehydrated 脱水',
                answerType: 'boolean',
                answer: false,
            },
        ]
    },
    {
        sectionSeq: "L",
        sectionDesc: 'Do you suffer/have you suffered from? 是否有这些皮肤问题？',
        conditions: [
            {
                condition: 'Dermatitis 皮肤炎',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Acne 暗疮',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Eczema 湿疹',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Psoriasis 牛皮藓',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Allergies过敏',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Hay fever 花粉过敏',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Asthma 哮喘',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Skin cancer 皮肤癌',
                answerType: 'boolean',
                answer: false,
            },
        ]
    },
    {
        sectionSeq: "M",
        sectionDesc: 'Stress level: 1 - 10(10 being the highest) 压力程度(1 - 10), 10份最严重',
        conditions: [
            {
                condition: 'At work 工作',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'At home 在家',
                answerType: 'string',
                answer: '',
            },
        ]
    },
    {
        sectionSeq: "Z",
        sectionDesc: 'Misc',
        conditions: [
            {
                condition: 'Do you see natural daylight in your workplace? 工作场所能见日光？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Do you work at a computer? 是否用电脑工作？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'If yes, howmany hours 若有，多少小时',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Do you eat regular meals? 三餐定时？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Do you eat in a hurry ? 吃得太快？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Do you see natural daylight in your workplace? 工作场所能见日光？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Do you take any food vitamin supplements ? 是否服用保健品？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'If yes, What kind 若有，种类',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Do you suffer from food allergies ? 是否有食物过敏？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Allergic food: 过敏食物',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Bingeing ? 暴饮暴食？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Overeating ? 饮食过量？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'Do you smoke? 是否抽烟？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'How many per day? 每日几根?',
                answerType: 'string',
                answer: '',
            },
            {
                condition: 'Do you drink alcohol? 喝酒？',
                answerType: 'boolean',
                answer: false,
            },
            {
                condition: 'How many units per day? 每日几个单位',
                answerType: 'string',
                answer: '',
            },
        ]
    }
]


export const consultation = {
    basicInfo: {
        dateOfConsultation: Date,
        ageGroup: '',
        lifeStyle: '',
        lastVisitToDoctor: Date,
        GPAddress: '',
        numberOfChildren: 0,
        dateOfLastPeriod: Date,
        height: 0.0,
        weight: 0.0,
        waist: 0.0,
        hip: 0.0,
        bmi: 0.0,
        bmiResult: '',
        waistHipRatio: 0.0,
        waistHipRatioResult: '',
    },
    questionaireOptions: questionaireOptions,
    questionaire: questionaire,
    dietDiary: [_dietDiary, _dietDiary, _dietDiary],
    personalConditions: personalConditions
}
